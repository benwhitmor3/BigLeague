import React, {useContext, useState} from 'react';
import 'antd/dist/antd.css';
import {Table, Tag, Space} from 'antd';
import {PlayerTypeModelType, StoreContext} from "../../../models";
import {observer} from "mobx-react";
import {colour, suit_icon, insertArray, _to_fixed} from '../../Utils/tablefunctions'
import {IObservableArray, observable, toJS} from 'mobx';
import SigningModal from "../../Molecules/Modals/SigningModal";
import {tableStyles} from "./TableStyles";

export const FreeAgentTable: React.FunctionComponent = observer(() => {

        const store = useContext(StoreContext)

        const [visible, setVisible] = useState<boolean>(false)
        const [selectedPlayer, setSelectedPlayer] = useState<any>([]);

        const nonScouterColumns = [
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: 'Age',
                dataIndex: 'age',
                key: 'age',
                sorter: (a: any, b: any) => a.age - b.age,
            },
            {
                title: 'EPV',
                dataIndex: 'epv',
                key: 'epv',
                sorter: (a: any, b: any) => a.epv - b.epv,
                render: (epv: number) => <span>{epv.toFixed(1)}</span>,
            },
            {
                title: 'Suit',
                dataIndex: 'suit',
                key: 'suit',
                render: (suit: string) => (
                    <Tag icon={suit_icon(suit)} color={colour(suit)} key={suit}>
                        {suit.toUpperCase()}
                    </Tag>
                ),
                filters: [
                    {
                        text: 'Diamond',
                        value: 'diamond',
                    },
                    {
                        text: 'Spade',
                        value: 'spade',
                    },
                    {
                        text: 'Heart',
                        value: 'heart',
                    },
                    {
                        text: 'Club',
                        value: 'club',
                    },
                ],
                onFilter: (value: any, record: any) => record.suit.indexOf(value) === 0,
            },
            {
                title: 'Grade',
                dataIndex: 'grade',
                key: 'grade',
                sorter: (a: any, b: any) => a.grade - b.grade,
                render: (grade: number) => <span>{_to_fixed(grade)}</span>,
            },
            {
                title: 'Franchise',
                dataIndex: ["franchise", "franchise"],
                key: "franchise",
            },
        ];


        let sEPVColumn =
            {
                title: 'S EPV',
                dataIndex: 'sEpv',
                key: 'sEpv',
                sorter: (a: any, b: any) => a.sEpv - b.sEpv,
                render: (sEpv: number) => <span>{sEpv.toFixed(1)}</span>,
            }

        let actionColumn =
                {
                    title: 'Action',
                    key: 'action',
                    render: (record: PlayerTypeModelType) => (

                        (record.contract) ? (
                            <Space size="middle">
                                <Tag color={"#89dc0d"} style={{ color: "#000000", border: "3px solid #89dc0d"}}>
                                    Signed
                                </Tag>
                            </Space>
                        ) : (
                            <Space size="middle">
                                <Tag icon={<span style={{marginRight: '3px'}} role="img" aria-label="player"> 📝 </span>}
                                     color={"#ffe479"} style={{ color: "#000000", border: "3px solid #ffe479", cursor: "pointer"}}
                                     onClick={() => {setSelectedPlayer(record); setVisible(true)}}>
                                    Offer Contract
                                </Tag>
                            </Space>
                        )
                    ),
                }


        const columns = () => {
            if (store.User.franchise.gm !== null) {
                if (store.User.franchise.league.freeAgentClassSigned.length > 0) {
                    insertArray(nonScouterColumns, 6, actionColumn)
                }
                if (store.User.franchise.gm.trait === "SCOUTER") {
                    let scouterColumns = nonScouterColumns;
                    insertArray(nonScouterColumns, 3, sEPVColumn)
                    return scouterColumns
                } else {
                    return nonScouterColumns
                }
            }
            return nonScouterColumns
        }

        // need to make observable to update table (draftClass not being observed by ant d table)
        let freeAgentClass: IObservableArray<PlayerTypeModelType> = observable(store.User.franchise.league.freeAgentClass)

        if (!store.User || !store.User.franchise) return <div> loading</div>;
        else {
            return (
                <div>
                <SigningModal visible={visible} setVisible={setVisible} selectedplayer={selectedPlayer}/>
                <Table
                    rowKey="id"
                    columns={columns()}
                    dataSource={toJS(freeAgentClass)}
                    pagination={false}
                    bordered
                    style={tableStyles}
                />
                </div>
            );
        }
    }
)

export default FreeAgentTable;

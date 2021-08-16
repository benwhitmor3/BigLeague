import React, {useContext, useState} from 'react';
import 'antd/dist/antd.css';
import {Table, Tag, Space} from 'antd';
import {PlayerTypeModelType, StoreContext} from "../../models";
import {observer} from "mobx-react";
import {colour, suit_icon, insertArray, _to_fixed} from '../Utils/TableFunctions'
import {IObservableArray, observable, toJS} from 'mobx';
import SigningModal from "../Molecules/SigningModal";
import FreeAgencyButton from "../Molecules/FreeAgentButton";

export const FreeAgentTable: React.FunctionComponent = observer(() => {

        const store = useContext(StoreContext)

        const [visible, setVisible] = useState<boolean>(false)
        const [selectedPlayer, setSelectedPlayer] = useState<any>([]);

        const non_scouter_columns = [
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
                render: (epv: number) => <text>{epv.toFixed(1)}</text>,
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
                title: 'Contract',
                dataIndex: 'contract',
                key: 'contract',
                sorter: (a: any, b: any) => a.contract - b.contract,
            },
            {
                title: 'Team Option',
                dataIndex: 'tOption',
                key: 'tOption',
            },
            {
                title: 'Player Option',
                dataIndex: 'pOption',
                key: 'pOption',
            },
            {
                title: 'Renew',
                dataIndex: 'renew',
                key: 'renew',
            },
            {
                title: 'Salary',
                dataIndex: 'salary',
                key: 'salary',
                sorter: (a: any, b: any) => a.salary - b.salary,
                render: (salary: number) => <text>{_to_fixed(salary)}</text>,
            },
            {
                title: 'Grade',
                dataIndex: 'grade',
                key: 'grade',
                sorter: (a: any, b: any) => a.grade - b.grade,
                render: (grade: number) => <text>{_to_fixed(grade)}</text>,
            },
            {
                title: 'Franchise',
                dataIndex: ["franchise", "franchise"],
                key: "franchise",
            },
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
                                 color={"#ffe479"} style={{ color: "#000000", border: "3px solid #ffe479"}}
                                 onClick={() => {setSelectedPlayer(record); setVisible(true)}}>
                            Offer Contract
                            </Tag>
                        </Space>
                    )

                ),
            },
        ];


        let sEPV_column =
            {
                title: 'S EPV',
                dataIndex: 'sEpv',
                key: 'sEpv',
                sorter: (a: any, b: any) => a.sEpv - b.sEpv,
                render: (sEpv: number) => <text>{sEpv.toFixed(1)}</text>,
            }


        const columns = () => {
            if (store.User.franchise.gm !== null)
                if (store.User.franchise.gm.trait === "SCOUTER") {
                    let scouter_columns = non_scouter_columns
                    insertArray(non_scouter_columns, 3, sEPV_column)
                    return scouter_columns
                } else {
                    return non_scouter_columns
                }
            else return non_scouter_columns
        }

        // need to make observable to update table (draftClass not being observed by ant d table)
        let freeAgentClass: IObservableArray<PlayerTypeModelType> = observable(store.User.franchise.league.freeAgentClass)

        if (store.User == undefined || store.User.franchise == undefined) return <div> loading</div>;
        else {
            return (
                <div>
                <FreeAgencyButton/>
                <SigningModal visible={visible} setVisible={setVisible} selectedplayer={selectedPlayer}/>
                <Table
                    rowKey="id"
                    columns={columns()}
                    dataSource={toJS(freeAgentClass)}
                    pagination={false}
                    bordered
                    style={{
                        marginTop: '10px',
                        boxShadow: "0px 0px 2px 0px #D0D8F3",
                    }}
                />
                </div>
            );
        }
    }
)

export default FreeAgentTable;
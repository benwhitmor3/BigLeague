import React, {useContext} from 'react';
import 'antd/dist/antd.css';
import {Table, Tag, Space} from 'antd';
import {PlayerTypeModelType, StoreContext} from "../../../models";
import {observer} from "mobx-react";
import {colour, suit_icon, insertArray} from '../../Utils/tablefunctions'
import {IObservableArray, observable, toJS} from 'mobx';
import {mutateCreatePlayerQuery} from "../../Utils/queries";
import {tableStyles} from "./TableStyles";


export const DraftTable: React.FunctionComponent = observer(() => {

        const store = useContext(StoreContext)

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
                title: 'Franchise',
                dataIndex: ["franchise", "franchise"],
                key: "franchise",
                render: (franchise: number) => (
                    franchise
                        ?
                        <span className="ld ld-float-rtl-in" style={{animationDuration: "2s"}}>{franchise}</span>
                        :
                        null)
            },
            {
                title: 'Action',
                key: 'action',
                render: (text: string, record: any) => (
                    (record.franchise) ? (
                        <Space size="middle">
                            <Tag
                                className="ld ld-float-rtl-in"
                                color={"#B93538"} style={{color: "#ffffff", border: "2px solid #B93538", animationDuration: "2s"}}
                                 onClick={() => {
                                     store.mutateCreatePlayer({
                                             "playerInput": {
                                                 "name": record.name,
                                                 "suit": record.suit,
                                                 "age": record.age,
                                                 "pv": record.pv,
                                                 "epv": record.epv,
                                                 "sEpv": record.sEpv,
                                                 "contract": undefined,
                                                 "tOption": undefined,
                                                 "pOption": undefined,
                                                 "renew": undefined,
                                                 "salary": undefined,
                                                 "grade": undefined,
                                                 "lineup": "bench",
                                                 "franchiseId": store.User.franchise.league.draftingFranchise.id,
                                                 "trainer": false,
                                                 "year": record.year,
                                                 "leagueId": store.User.franchise.league.id
                                             }
                                         }, mutateCreatePlayerQuery,
                                         undefined
                                     );
                                 }
                                 }>
                                Drafted!
                            </Tag>
                        </Space>
                    ) : (
                        <Space size="middle">
                            <Tag color={"#FFDE70"} icon={<span role="img" aria-label="player"> 📝 </span>}
                                 style={{color: "#000000", border: "2px solid #FFDE70", cursor: "pointer"}}
                                 onClick={() => {
                                     store.mutateCreatePlayer({
                                             "playerInput": {
                                                 "name": record.name,
                                                 "suit": record.suit,
                                                 "age": record.age,
                                                 "pv": record.pv,
                                                 "epv": record.epv,
                                                 "sEpv": record.sEpv,
                                                 "contract": undefined,
                                                 "tOption": undefined,
                                                 "pOption": undefined,
                                                 "renew": undefined,
                                                 "salary": undefined,
                                                 "grade": undefined,
                                                 "lineup": "bench",
                                                 "franchiseId": store.User.franchise.league.draftingFranchise.id,
                                                 "trainer": false,
                                                 "year": record.year,
                                                 "leagueId": store.User.franchise.league.id
                                             }
                                         }, mutateCreatePlayerQuery,
                                         undefined
                                     );
                                     try {
                                         // make next franchise in draft order draftingFranchise
                                         store.User.league.setDraftingFranchise(store.User.league.draftOrder[store.User.league.draftOrder.indexOf(store.User.franchise.league.draftingFranchise) + 1])
                                     } catch (exception_var) {
                                         // if at the end of draft order reset to beginning
                                         store.User.league.setDraftingFranchise(store.User.league.draftOrder[0])
                                     }
                                 }
                                 }>
                                Draft Prospect
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
                render: (sEpv: number) => <span>{sEpv.toFixed(1)}</span>,
            }


        const columns = () => {
            if (store.User.franchise.gm != null)
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
        let draftClass: IObservableArray<PlayerTypeModelType> = observable(store.User.franchise.league.draftClass)

        if (store.User?.franchise === undefined) return <div> loading</div>;
        else {
            return (
                <Table
                    rowKey="id"
                    columns={columns()}
                    dataSource={toJS(draftClass)}
                    pagination={false}
                    bordered
                    style={tableStyles}
                />
            );
        }
    }
)

export default DraftTable;
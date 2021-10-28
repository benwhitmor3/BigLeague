import React, {useContext, useEffect, useState} from 'react';
import 'antd/dist/antd.css';
import {Table, Tag, Space} from 'antd';
import {PlayerTypeModelType, StoreContext} from "../../models";
import {observer} from "mobx-react";
import {colour, suit_icon, insertArray, draft} from '../Utils/TableFunctions'
import {IObservableArray, observable, toJS} from 'mobx';
import {mutateCreatePlayerQuery} from "../Utils/queries";


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
                title: 'Franchise',
                dataIndex: ["franchise", "franchise"],
                key: "franchise",
            },
            {
                title: 'Action',
                key: 'action',
                render: (text: string, record: any) => (
                    (record.franchise) ? (
                        <Space size="middle">
                            <Tag color={"#d4380d"} style={{color: "#ffffff", border: "2px solid #cb2022"}}
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
                            <Tag color={"#ffe479"} icon={<span role="img" aria-label="player"> 📝 </span>}
                                 style={{color: "#000000", border: "2px solid #ffe479", cursor: "pointer"}}
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
        let draftClass: IObservableArray<PlayerTypeModelType> = observable(store.User.franchise.league.draftClass)

        if (store.User == undefined || store.User.franchise == undefined) return <div> loading</div>;
        else {
            return (
                <Table
                    rowKey="id"
                    columns={columns()}
                    dataSource={toJS(draftClass)}
                    pagination={false}
                    bordered
                    style={{
                        boxShadow: "0px 0px 2px 0px #D0D8F3",
                    }}
                />
            );
        }
    }
)

export default DraftTable;
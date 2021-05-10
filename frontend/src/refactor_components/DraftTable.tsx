import React, {useContext} from 'react';
import 'antd/dist/antd.css';
import {Table, Tag, Space} from 'antd';
import {StoreContext} from "../models";
import {observer} from "mobx-react";
import {colour, suit_icon} from './TableFunctions'
import {toJS} from 'mobx';


export const DraftTable: React.FunctionComponent = observer(() => {

        const store = useContext(StoreContext)

        const non_scouter_columns = [
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                // render: (text: string) => <a href="/Home">{text}</a>,
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
                dataIndex: ["roster", "franchise", "franchise"],
                key: "franchise",
            },
            {
                title: 'Action',
                key: 'action',
                render: (text: string, record: any) => (
                    <Space size="middle">
                        <Tag icon={<span role="img" aria-label="player"> 📝 </span>} color={'#afafaf'}
                             onClick={() =>
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
                                             "franchiseId": store.User.franchise.id,
                                             "trainer": true,
                                             "leagueId": store.User.franchise.league.id
                                         }
                                     }, `
                                    player {
                                          __typename
                                          id
                                          name
                                          suit
                                          age
                                          pv
                                          epv
                                          sEpv
                                          contract
                                          tOption
                                          pOption
                                          renew
                                          salary
                                          grade
                                          trainer
                                          lineup
                                          franchise{
                                            __typename
                                            id
                                            franchise
                                          }
                                          league{
                                            __typename
                                            id
                                            leagueName
                                          }
                                        }
            `,
                                     undefined
                                 )
                             }>
                            Draft Prospect
                        </Tag>
                    </Space>
                ),
            },
        ];


        const scouter_columns = [
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                // render: (text: string) => <a href="/Home">{text}</a>,
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
                title: 'S EPV',
                dataIndex: 'sEpv',
                key: 'sEpv',
                sorter: (a: any, b: any) => a.sEpv - b.sEpv,
                render: (sEpv: number) => <text>{sEpv.toFixed(1)}</text>,
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
                    <Space size="middle">
                        <Tag icon={<span role="img" aria-label="player"> 📝 </span>} color={'#afafaf'}
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
                                             "franchiseId": store.User.franchise.id,
                                             "trainer": true,
                                             "leagueId": store.User.franchise.league.id
                                         }
                                     }, `
                                    player {
                                          __typename
                                          id
                                          name
                                          suit
                                          age
                                          pv
                                          epv
                                          sEpv
                                          contract
                                          tOption
                                          pOption
                                          renew
                                          salary
                                          grade
                                          trainer
                                          lineup
                                          franchise{
                                            __typename
                                            id
                                            franchise
                                          }
                                          league{
                                            __typename
                                            id
                                            leagueName
                                          }
                                        }
            `,
                                     undefined
                                 );
                             }
                             }>
                            Draft Prospect
                        </Tag>
                    </Space>
                ),
            },
        ];


        let columns;
        if (store.User.franchise.gm.trait === "SCOUTER") {
            columns = scouter_columns
        } else {
            columns = non_scouter_columns
        }

        if (store.User == undefined || store.User.franchise == undefined) return <div> loading</div>;
        else {
            return (
                <Table
                    rowKey="id"
                    columns={columns}
                    dataSource={toJS(store.User.franchise.league.playerSet)}
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
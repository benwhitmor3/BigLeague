import React, {useContext} from 'react';
import {StoreContext} from "../../../models";
import 'antd/dist/antd.css';
import {Table, Tag, Spin} from 'antd';
import {observer} from "mobx-react";
import {toJS} from 'mobx';
import {colour, insertArray, suit_icon} from "../../Utils/tablefunctions";
import {tableStyles} from "./TableStyles";


export const PlayerHistoryTable: React.FunctionComponent = observer(() => {

        const store = useContext(StoreContext)

    const non_scouter_columns = [
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                sorter: (a: any, b: any) => a.name.localeCompare(b.name),
                // @ts-ignore
                filters: [...new Map(store.User.league.playerhistorySet?.map(item =>
                [item['name'], {text: item.name, value: item.name}])).values()],
                onFilter: (value: any, record: any) => record.name.indexOf(value) === 0,
            },
            {
                title: 'Season',
                dataIndex: 'season',
                key: 'season',
                sorter: (a: any, b: any) => a.season - b.season,
                // @ts-ignore
                filters: [...new Map(store.User.league.playerhistorySet?.map(item =>
                [item['season'], {text: item.season, value: item.season}])).values()],
                onFilter: (value: any, record: any) => record.season.indexOf(value) === 0,
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
                    insertArray(non_scouter_columns, 4, sEPV_column)
                    return scouter_columns
                } else {
                    return non_scouter_columns
                }
            else return non_scouter_columns
        }


        if (store.User == undefined || store.User.franchise == undefined) return <div><Spin size="large"/></div>;
        else {
            return (
                <Table
                    rowKey="id"
                    columns={columns()}
                    dataSource={toJS(store.User.league.playerhistorySet)}
                    pagination={false}
                    bordered
                    style={tableStyles}
                />
            );
        }
    }
)

export default PlayerHistoryTable;
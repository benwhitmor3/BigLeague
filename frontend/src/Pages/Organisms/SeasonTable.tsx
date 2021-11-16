import React, {useContext, useState} from 'react';
import 'antd/dist/antd.css';
import {Table, Select} from 'antd';
import {observer} from "mobx-react";
import {toJS} from 'mobx';
import {StoreContext} from "../../models";
import {tableStyles} from "./Tables/TableStyles";

const {Option} = Select;

export const SeasonTable: React.FunctionComponent = observer(() => {

        const store = useContext(StoreContext)

        const columns = [
            {
                title: 'Franchise',
                dataIndex: ['franchise', 'franchise'],
                key: 'franchise',
            },
            {
                title: 'Wins',
                dataIndex: 'wins',
                key: 'wins',
                sorter: (a: any, b: any) => a.wins - b.wins,
                defaultSortOrder: 'descend',
            },
            {
                title: 'Losses',
                dataIndex: 'losses',
                key: 'losses',
                sorter: (a: any, b: any) => a.losses - b.losses,
            },
            {
                title: 'PPG',
                dataIndex: 'ppg',
                key: 'ppg',
                sorter: (a: any, b: any) => a.ppg - b.ppg,
                render: (ppg: number) => <text>{ppg.toFixed(1)}</text>,
            },
            {
                title: 'STD',
                dataIndex: 'std',
                key: 'std',
                sorter: (a: any, b: any) => a.std - b.std,
                render: (std: number) => <text>{std.toFixed(1)}</text>,
            },
            {
                title: 'Championships',
                dataIndex: 'championships',
                key: 'championships',
            },
            {
                title: 'Bonuses',
                dataIndex: 'bonuses',
                key: 'bonuses',
            },
            {
                title: 'Penalties',
                dataIndex: 'penalties',
                key: 'penalties',
            },
            {
                title: 'Fan Base',
                dataIndex: 'fanBase',
                key: 'fanBase',
                sorter: (a: any, b: any) => a.fanBase - b.fanBase,
                render: (fanBase: number) => <text>{fanBase.toFixed(1)}</text>,
            },
            {
                title: 'Fan Index',
                dataIndex: 'fanIndex',
                key: 'fanIndex',
                sorter: (a: any, b: any) => a.fanIndex - b.fanIndex,
                render: (fanIndex: number) => <text>{fanIndex.toFixed(1)}</text>,
            },
            {
                title: 'Advertising',
                dataIndex: 'advertising',
                key: 'advertising',
            },
            {
                title: 'Ticket Price',
                dataIndex: 'ticketPrice',
                key: 'ticketPrice',
                sorter: (a: any, b: any) => a.ticketPrice - b.ticketPrice,
                render: (ticketPrice: number) => <text>{(ticketPrice).toFixed(0)}</text>,
            },
            {
                title: 'Tickets Sold',
                dataIndex: 'ticketsSold',
                key: 'ticketsSold',
                sorter: (a: any, b: any) => a.boxesSold - b.boxesSold,
            },
            {
                title: 'Box Price',
                dataIndex: 'boxPrice',
                key: 'boxPrice',
                sorter: (a: any, b: any) => a.boxPrice - b.boxPrice,
                render: (boxPrice: number) => <text>{(boxPrice).toFixed(0)}</text>,
            },
            {
                title: 'Boxes Sold',
                dataIndex: 'boxesSold',
                key: 'boxesSold',
                sorter: (a: any, b: any) => a.boxesSold - b.boxesSold,
            },
            {
                title: 'Revenue (m)',
                dataIndex: 'revenue',
                key: 'revenue',
                sorter: (a: any, b: any) => a.revenue - b.revenue,
                render: (revenue: number) => <text>{(revenue / 1000000).toFixed(2)}</text>,
            },
            {
                title: 'Expenses (m)',
                dataIndex: 'expenses',
                key: 'expenses',
                sorter: (a: any, b: any) => a.expenses - b.expenses,
                render: (expenses: number) => <text>{(expenses / 1000000).toFixed(2)}</text>,
            },
        ];

        // get most recent season (franchise.seasonSet.length - 1) and map each franchise in that season
        const [season, setSeason] = useState<any>(store.User.franchise.league.franchiseSet.map((franchise: any) => franchise.seasonSet[franchise.seasonSet.length - 1]));


        return (
            <div>
                <Select
                    defaultValue={store.User.franchise.seasonSet[store.User.franchise.seasonSet.length - 1].season}
                    bordered={false}
                    style={{
                        width: "100%",
                        borderRadius: "2px",
                        fontSize: '24px',
                        padding: '0.5rem',
                        marginBottom: '4px',
                        textAlignLast: 'center',
                        boxShadow: 'rgba(9, 30, 66, 0.1) 0px 1px 1px, rgba(9, 30, 66, 0.1) 0px 0px 1px 1px'
                    }}
                    onChange={(season: string) => setSeason(store.User.franchise.league.franchiseSet.map((franchise: any) => franchise.seasonSet[parseInt(season) - 1]))}>
                    {store.User.franchise.seasonSet.map((season: any) =>
                        (
                            <Option key={season.season} value={season.season}>
                                {season.season}
                            </Option>
                        )
                    )}
                </Select>
                <Table
                    rowKey="id"
                    // @ts-ignore (need this to add defaultSorter for Wins)
                    columns={columns}
                    dataSource={toJS(season)}
                    pagination={false}
                    bordered
                    style={tableStyles}
                />
            </div>
        );
    }
)

export default SeasonTable;
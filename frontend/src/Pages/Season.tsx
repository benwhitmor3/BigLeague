import React, {useContext, useState} from 'react';
import 'antd/dist/antd.css';
import {Spin, Table, Select} from 'antd';
import {StoreContext} from "../models";
import {observer} from "mobx-react";
import {toJS} from 'mobx';
import SeasonSimButton from "./Molecules/SeasonSimButton";

const {Option} = Select;

export const Season: React.FunctionComponent = observer(() => {

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
        ];

        const [season, setSeason] = useState<any>(store.User.franchise.league.franchiseSet.map((franchise: any) => franchise.seasonSet[0]));

        if (store.User == undefined || store.User.franchise == undefined) return <div><Spin size="large"/></div>;
        return (
            <div>
                <SeasonSimButton/>
                <Select
                    defaultValue={store.User.franchise.seasonSet[0].season}
                    bordered={false}
                        style={{
                            width: "100%",
                            borderRadius: "8px",
                            fontSize: '24px',
                            padding: '0.5rem',
                            textAlignLast: 'center',
                        }}
                        onChange={(season: string) => setSeason(store.User.franchise.league.franchiseSet.map((franchise: any) => franchise.seasonSet[parseInt(season)-1]))}
                >
                    {store.User.franchise.seasonSet.map((season: any) => (
                            <Option key={season.season} value={season.season}>
                                {season.season}
                            </Option>
                        )
                    )}
                </Select>
                <Table
                    rowKey="id"
                    columns={columns}
                    dataSource={toJS(season)}
                    pagination={false}
                    bordered
                    style={{
                        boxShadow: "0px 0px 2px 0px #D0D8F3",
                    }}
                />
            </div>
        );
    }
)

export default Season;
import React, {useContext, useState} from 'react';
import 'antd/dist/antd.css';
import {Button, Spin, Table, Progress} from 'antd';
import {StoreContext} from "../models";
import {observer} from "mobx-react";
import {toJS} from 'mobx';
import axios from "axios";


export const Season: React.FunctionComponent = observer(() => {

        const store = useContext(StoreContext)

        const [loading, setLoading] = useState<boolean>(false)
        const [percent, setPercent] = useState<number>(0)

        const simSeason = () => {
            const data = new FormData();
            data.append("league_id", store.User.franchise.league.id)
            data.append("season", '1')
            setLoading(true)
            setPercent(50)
            axios.post('http://127.0.0.1:8000/season_sim', data)
                .then(res => {
                    console.log(res.data)
                    store.queryAllLeague({},
                        `__typename
                    id
                    franchiseSet{
                      __typename
                      id
                      seasonSet{
                        __typename
                        id
                         season
                    ready
                    wins
                    losses
                    ppg
                    std
                    championships
                    bonuses
                    penalties
                    fanBase
                    fanIndex
                    advertising
                    revenue
                    expenses
                      }
                    }`
                    )
                    setLoading(false)
                })
                .catch(err => {
                    console.log(err)
                })
        };

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

    if (store.User == undefined || store.User.franchise == undefined) return <div><Spin size="large"/></div>;
    // if (loading) return <div><Spin size="large"/></div>
    if (loading) return (
        <div>
        <h3>Simulating Season</h3>
        <Progress strokeColor={{'0%': '#108ee9', '100%': '#87d068',}} percent={percent} />
        </div>
    )
        else {
            return (
                <div>
                    <Button type="primary" onClick={() => simSeason()} block>
                        Simulate Season
                    </Button>
                    <Table
                        rowKey="id"
                        columns={columns}
                        dataSource={toJS(store.User.franchise.league.franchiseSet.map((franchise: any) => franchise.seasonSet[0]))}
                        pagination={false}
                        bordered
                        style={{
                            boxShadow: "0px 0px 2px 0px #D0D8F3",
                        }}
                    />
                </div>
            );
        }
    }
)

export default Season;
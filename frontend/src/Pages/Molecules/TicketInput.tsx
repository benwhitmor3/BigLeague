import React, {useContext, useState} from 'react';
import 'antd/dist/antd.css';
import {Table, Select, Row, Col} from 'antd';
import {observer} from "mobx-react";
import {toJS} from 'mobx';
import {SeasonTypeModelType, StoreContext} from "../../models";
import {useForm} from "react-hook-form";
import CSS from "csstype";

const {Option} = Select;

type priceConfig = {
    advertising: number;
    ticketPrice: number;
    boxPrice: number;
};

export const TicketInput: React.FunctionComponent = observer(() => {

        const store = useContext(StoreContext)
        const {register, handleSubmit, errors} = useForm<priceConfig>();

        // get franchise season set and filter to most current season
        const [season, setSeason] = useState<any>(store.User.franchise.seasonSet.filter(function (season: any) {
            return season.season === store.User.franchise.seasonSet[store.User.franchise.seasonSet.length - 1].season;
        }));

        const onSubmit = handleSubmit(({advertising, ticketPrice, boxPrice}: priceConfig) => {
            // season returns a single-object array. Need this to get the object
            let season_obj = season[0]
            store.mutateUpdateSeason({
                    "seasonInput": {
                        'franchiseId': season_obj.franchise.id,
                        'season': season_obj.season,
                        'ready': false,
                        'wins': season_obj.wins,
                        'losses': season_obj.losses,
                        'ppg': season_obj.ppg,
                        'std': season_obj.std,
                        'championships': season_obj.championships,
                        'bonuses': season_obj.bonuses,
                        'penalties': season_obj.penalties,
                        'fanBase': season_obj.fanBase,
                        'fanIndex': season_obj.fanIndex,
                        'advertising': advertising,
                        'ticketPrice': ticketPrice,
                        'ticketsSold': season_obj.ticketsSold,
                        'boxPrice': boxPrice,
                        'boxesSold': season_obj.boxesSold,
                        'revenue': season_obj.revenue,
                        'expenses': season_obj.expenses,
                    },
                },
                `
                        __typename
                        season{
                          __typename
                          id
                          franchise{
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
                              ticketPrice
                              ticketsSold
                              boxPrice
                              boxesSold
                              revenue
                              expenses
                            }
                          }
                        }
                `,
                undefined
            )
        });

        const formStyles: CSS.Properties = {
            backgroundColor: '#ebebeb',
            border: '0px',
            display: 'inline',
            borderRadius: '4px',
            padding: '0.5rem',
            fontSize: '14px',
            color: '#000000',
        };

        const buttonStyles: CSS.Properties = {
            backgroundColor: '#ad2102',
            margin: '5px',
            border: '0px',
            display: 'inline',
            borderRadius: '10px',
            fontSize: '12px',
            color: '#fff2e8',
            padding: '8px',
            cursor: "pointer"
        };

        const columns = [
            {
                title: 'Season',
                key: 'season',
                render: (season: SeasonTypeModelType) => (
                    <Select
                        defaultValue={season.season}
                        bordered={false}
                        style={{
                            width: "100%",

                            borderRadius: "8px",
                            fontSize: '24px',
                            padding: '0.5rem',
                            textAlignLast: 'center',
                        }}
                        onChange={(season_num: number) => setSeason(store.User.franchise.seasonSet.filter(function (season: any) {
                            return season.season === season_num;
                        }))}>
                        {store.User.franchise.seasonSet.map((season: any) =>
                            (
                                <Option key={season.season} value={season.season}>
                                    {season.season}
                                </Option>
                            )
                        )}
                    </Select>
                ),
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
                render: (advertising: number) => (
                    (season.ticketPrice > 0 && season.boxPrice > 0 || advertising > 1) ? (
                        <text>{advertising}</text>
                    ) : (
                        <div>
                            <form onSubmit={onSubmit}>
                            <input name="advertising" type="number" style={formStyles} ref={register({
                                required: {
                                    value: true,
                                    message: "Advertising is a required field",
                                },
                                min: {
                                    value: 1,
                                    message: 'Advertising need to be 1 minimum',
                                },
                                max: {
                                    value: 16,
                                    message: 'Advertising need to be 16 maximum',
                                },
                            })}/>
                            </form>
                        </div>
                    )
                )
            },
            {
                title: 'Ticket Price',
                dataIndex: 'ticketPrice',
                key: 'ticketPrice',
                render: (ticketPrice: number) => (

                    (ticketPrice > 0) ? (
                        <text>{ticketPrice}</text>
                    ) : (
                        <div>
                            <form onSubmit={onSubmit}>
                            <input name="ticketPrice" type="number" style={formStyles} ref={register({
                                required: {
                                    value: true,
                                    message: "Ticket Price is a required field",
                                },
                                min: {
                                    value: 1,
                                    message: 'Tickets need to be $1 minimum',
                                },
                            })}/>

                            </form>
                        </div>
                    )
                ),
            },
            {
                title: 'Tickets Sold',
                dataIndex: 'ticketsSold',
                key: 'ticketsSold',
            },
            {
                title: 'Box Price',
                dataIndex: 'boxPrice',
                key: 'boxPrice',
                render: (boxPrice: number) => (

                    (boxPrice > 0) ? (
                        <text>{boxPrice}</text>
                    ) : (
                        <div>
                            <form onSubmit={onSubmit}>
                            <input name="boxPrice" type="number" style={formStyles} ref={register({
                                required: {
                                    value: true,
                                    message: "Ticket Price is a required field",
                                },
                                min: {
                                    value: 1,
                                    message: 'Tickets need to be $1 minimum',
                                },
                            })}/>
                            </form>
                        </div>
                    )
                ),
            },
            {
                title: 'Boxes Sold',
                dataIndex: 'boxesSold',
                key: 'boxesSold',
            },
            {
                title: 'Confirm',
                key: 'confirm',
                render: () => (
                        <div>
                            <form onSubmit={onSubmit}>
                            <input type="submit" style={buttonStyles} value="Confirm"/>
                            </form>
                        </div>
                ),
            },
        ];

        return (
            <div>
                <Row gutter={[0, 24]}>
                    <Col span={24} offset={0}>
                        <Table
                            rowKey="id"
                            // @ts-ignore (need this to add defaultSorter for Wins)
                            columns={columns}
                            dataSource={toJS(season)}
                            pagination={false}
                            bordered
                            style={{
                                boxShadow: "0px 0px 2px 0px #D0D8F3",
                            }}
                        />
                    </Col>
                </Row>
            </div>
        );
    }
)

export default TicketInput;
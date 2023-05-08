import React, {useContext, useState} from 'react';
import 'antd/dist/antd.css';
import {Table, Select, Row, Col, Popconfirm, Button} from 'antd';
import {observer} from "mobx-react";
import {IObservableArray, observable, toJS} from 'mobx';
import {FranchiseTypeModelType, SeasonTypeModelType, StoreContext} from "../../../models";
import {useForm} from "react-hook-form";
import {inputStyles, buttonStyles, tableStyles} from "./TableStyles";

const {Option} = Select;

interface IFranchise {
    franchise: FranchiseTypeModelType;
}

type priceConfig = {
    advertising: number;
    ticketPrice: number;
    boxPrice: number;
};

export const TicketTable: React.FunctionComponent<IFranchise> = observer(({franchise}: IFranchise) => {

        const store = useContext(StoreContext)
        const {register, handleSubmit} = useForm<priceConfig>();

        // get franchise season set and filter to most current season
        const [season, setSeason] = useState<any>(franchise.seasonSet.filter(function (season: any) {
            return season.season === franchise.seasonSet[franchise.seasonSet.length - 1].season;
        }));

        // hack to get ticket table to render when switching seasons
        const [seasonNum, setSeasonNum] = useState<any>(franchise.seasonSet.length - 1)
        const changeSeason = (season_num: number) => {
            setSeason(store.User.franchise.seasonSet.filter(function (season: any) {
                            return season.season === season_num}))
            setSeasonNum(season_num-1)
        }

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
                        onChange={(season_num: number) => changeSeason(season_num)}>
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
                render: (fanBase: number) => <span>{fanBase.toFixed(1)}</span>,
            },
            {
                title: 'Fan Index',
                dataIndex: 'fanIndex',
                key: 'fanIndex',
                sorter: (a: any, b: any) => a.fanIndex - b.fanIndex,
                render: (fanIndex: number) => <span>{fanIndex.toFixed(1)}</span>,
            },
            {
                title: 'Advertising',
                dataIndex: 'advertising',
                key: 'advertising',
                render: (advertising: number) => (
                    ((season.ticketPrice > 0 && season.boxPrice > 0) || advertising > 1) ? (
                        <span>{advertising}</span>
                    ) : (
                        <div>
                            <form onSubmit={onSubmit}>
                            <input name="advertising" type="number" max={10} style={inputStyles} ref={register({
                                valueAsNumber: true,
                                required: {
                                    value: true,
                                    message: "Advertising is a required field",
                                },
                                min: {
                                    value: 1,
                                    message: 'Advertising need to be 1 minimum',
                                },
                                max: {
                                    value: 10,
                                    message: 'Advertising need to be 10 maximum',
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
                        <span>{ticketPrice.toFixed(0)}</span>
                    ) : (
                        <div>
                            <form onSubmit={onSubmit}>
                            <input name="ticketPrice" type="number" style={inputStyles} ref={register({
                                valueAsNumber: true,
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
                        <span>{boxPrice.toFixed(0)}</span>
                    ) : (
                        <div>
                            <form onSubmit={onSubmit}>
                            <input name="boxPrice" type="number" style={inputStyles} ref={register({
                                valueAsNumber: true,
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
                    <Popconfirm
                        title="Are you sure to choose these prices?"
                        onConfirm={() => onSubmit()}
                        okText="Yes"
                        cancelText="No"
                        placement="left"
                    >
                        <Button style={{...buttonStyles, ...{marginBottom: '12px', marginTop: '10px'}}}>
                            Confirm
                        </Button>
                    </Popconfirm>
                ),
            },
        ];

        // need to make observable to update table (season from useState not being observed by ant d table)
        const seasonJS: IObservableArray<SeasonTypeModelType> = observable(franchise.seasonSet.filter(function (season: any) {
            return season.season === franchise.seasonSet[seasonNum].season;
        }))

        return (
            <div>
                <Row gutter={[0, 24]}>
                    <Col span={24} offset={0}>
                        <Table
                            rowKey="id"
                            // @ts-ignore (need this to add defaultSorter for Wins)
                            columns={columns}
                            dataSource={toJS(seasonJS)}
                            pagination={false}
                            bordered
                            style={tableStyles}
                        />
                    </Col>
                </Row>
            </div>
        );
    }
)

export default TicketTable;

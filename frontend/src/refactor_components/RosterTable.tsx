import React, {useContext, useState} from 'react';
import 'antd/dist/antd.css';
import {Table, Tag, Space} from 'antd';
import {PlayerTypeModelType, StoreContext} from "../models";
import {observer} from "mobx-react";
import {Select} from "./Select";
import {colour, suit_icon, _to_fixed, _lineup} from './TableFunctions'
import {toJS} from "mobx";
import SigningModal from "./SigningModal";


export const RosterTable: React.FunctionComponent = observer(() => {

        const store = useContext(StoreContext)

        const [visible, setVisible] = useState<boolean>(false)
        const [selectedplayer, setSelectedPlayer] = useState<any>([]);

        const LineupPicker: React.FunctionComponent = (current_lineup: any, record: any) => {

            const [selected, setSelected] = useState(current_lineup);

            const submit_lineup = (updated_lineup: any) => {
                setSelected(updated_lineup);
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
                            "trainer": false,
                            "lineup": updated_lineup,
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
            }

            let other_values = ["starter", "rotation", "bench"].filter(x => ![current_lineup].includes(x));

            const options = (other_values: Array<string>) => {
                if (other_values.length === 2) {
                    return [{value: current_lineup, label: current_lineup}, {
                        value: other_values[0],
                        label: other_values[0]
                    },
                        {value: other_values[1], label: other_values[1]}];
                } else {
                    return [{value: current_lineup, label: current_lineup}, {
                        value: other_values[0],
                        label: other_values[0]
                    },
                        {value: other_values[1], label: other_values[1]}, {value: other_values[2], label: other_values[2]}];
                }
            }

            return <Select options={options(other_values)} value={selected}
                           onChange={(updated_lineup: any) => submit_lineup(updated_lineup)}/>
        }


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
                onFilter: (value: any, record: any) => record.player.suit.indexOf(value) === 0,
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
                title: 'Lineup',
                dataIndex: 'lineup',
                key: 'lineup',
                render: (lineup: any, record: any) => (
                    LineupPicker(_lineup(lineup), record)),
            },
            {
                title: 'Action',
                key: 'action',
                render: (record: PlayerTypeModelType) => (

                    (record.contract) ? (
                        <Space size="middle">
                            <Tag icon={<span style={{marginRight: '3px'}} role="img" aria-label="player"> 📝  </span>}
                                 color={'#98c30d'}>
                                Signed
                            </Tag>
                        </Space>
                    ) : (
                        <Space size="middle">
                            <Tag icon={<span style={{marginRight: '3px'}} role="img" aria-label="player"> 📝 </span>}
                                 color={'#D49E0D'}
                                 onClick={() => {
                                     setSelectedPlayer(record);
                                     setVisible(true)
                                 }}>
                                Offer Contract
                            </Tag>
                        </Space>
                    )

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
                onFilter: (value: any, record: any) => record.player.suit.indexOf(value) === 0,
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
                title: 'Lineup',
                dataIndex: 'lineup',
                key: 'lineup',
                render: (lineup: any, record: any) => (
                    LineupPicker(_lineup(lineup), record)),
            },
            {
                title: 'Action',
                key: 'action',
                render: (record: PlayerTypeModelType) => (

                    (record.contract) ? (
                        <Space size="middle">
                            <Tag icon={<span style={{marginRight: '3px'}} role="img" aria-label="player"> 📝  </span>}
                                 color={'#98c30d'}>
                                Signed
                            </Tag>
                        </Space>
                    ) : (
                        <Space size="middle">
                            <Tag icon={<span style={{marginRight: '3px'}} role="img" aria-label="player"> 📝 </span>}
                                 color={'#D49E0D'}
                                 onClick={() => {
                                     setSelectedPlayer(record);
                                     setVisible(true)
                                 }}>
                                Offer Contract
                            </Tag>
                        </Space>
                    )

                ),
            },
        ];


        let columns;
        if (store.User.franchise.gm.trait === "SCOUTER") {
            columns = scouter_columns
        } else {
            columns = non_scouter_columns
        }

        if (store.User == undefined || store.User.franchise == undefined) return <div>loading</div>;
        else {
            return (
                <div>
                    <SigningModal visible={visible} setVisible={setVisible} selectedplayer={selectedplayer}/>
                    <Table columns={columns} dataSource={toJS(store.User.franchise.playerSet)} pagination={false}
                           rowKey="id"
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

export default RosterTable;
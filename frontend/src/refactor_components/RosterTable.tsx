import React, {useContext, useState} from 'react';
import 'antd/dist/antd.css';
import {Table, Tag} from 'antd';
import {StoreContext} from "../models";
import {observer} from "mobx-react";
import {Select} from "./Select";
import {colour, suit_icon, _to_fixed, _lineup} from './TableFunctions'
import {toJS} from "mobx";


export const RosterTable: React.FunctionComponent = observer(() => {

        const store = useContext(StoreContext)

        const LineupPicker: React.FunctionComponent = (current_lineup: any, record: any) => {

            const [selected, setSelected] = useState(current_lineup);

            const submit_lineup = (updated_lineup: any) => {
                setSelected(updated_lineup);
                store.mutateRosterUpdate({
                        "rosterInput": {
                            "playerId": record.player.id,
                            "franchiseId": record.franchise.id,
                            "lineup": updated_lineup
                        }
                    },
                    `
                roster{
                    __typename
                    id
                    player{
                      __typename
                      id
                      name
                    }
                    franchise{
                      __typename
                      id
                      franchise
                    }
                    lineup
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
                dataIndex: ['player', 'name'],
                key: 'name',
                // render: (text: string) => <a href="/Home">{text}</a>,
            },
            {
                title: 'Age',
                dataIndex: ['player', 'age'],
                key: 'age',
                sorter: (a: any, b: any) => a.age - b.age,
            },
            {
                title: 'EPV',
                dataIndex: ['player', 'epv'],
                key: 'epv',
                sorter: (a: any, b: any) => a.epv - b.epv,
                render: (epv: number) => <text>{epv.toFixed(1)}</text>,
            },
            {
                title: 'Suit',
                dataIndex: ['player', 'suit'],
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
                dataIndex: ['player', 'contract'],
                key: 'contract',
                sorter: (a: any, b: any) => a.contract - b.contract,
            },
            {
                title: 'Team Option',
                dataIndex: ['player', 'tOption'],
                key: 'tOption',
            },
            {
                title: 'Player Option',
                dataIndex: ['player', 'pOption'],
                key: 'pOption',
            },
            {
                title: 'Renew',
                dataIndex: ['player', 'renew'],
                key: 'renew',
            },
            {
                title: 'Salary',
                dataIndex: ['player', 'salary'],
                key: 'salary',
                sorter: (a: any, b: any) => a.salary - b.salary,
                render: (salary: number) => <text>{_to_fixed(salary)}</text>,
            },
            {
                title: 'Grade',
                dataIndex: ['player', 'grade'],
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
        ];


        const scouter_columns = [
            {
                title: 'Name',
                dataIndex: ['player', 'name'],
                key: 'name',
                // render: (text: string) => <a href="/Home">{text}</a>,
            },
            {
                title: 'Age',
                dataIndex: ['player', 'age'],
                key: 'age',
                sorter: (a: any, b: any) => a.age - b.age,
            },
            {
                title: 'EPV',
                dataIndex: ['player', 'epv'],
                key: 'epv',
                sorter: (a: any, b: any) => a.epv - b.epv,
                render: (epv: number) => <text>{epv.toFixed(1)}</text>,
            },
            {
                title: 'S EPV',
                dataIndex: ['player', 'sEpv'],
                key: 'sEpv',
                sorter: (a: any, b: any) => a.sEpv - b.sEpv,
                render: (sEpv: number) => <text>{sEpv.toFixed(1)}</text>,
            },
            {
                title: 'Suit',
                dataIndex: ['player', 'suit'],
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
                dataIndex: ['player', 'contract'],
                key: 'contract',
                sorter: (a: any, b: any) => a.contract - b.contract,
            },
            {
                title: 'Team Option',
                dataIndex: ['player', 'tOption'],
                key: 'tOption',
            },
            {
                title: 'Player Option',
                dataIndex: ['player', 'pOption'],
                key: 'pOption',
            },
            {
                title: 'Renew',
                dataIndex: ['player', 'renew'],
                key: 'renew',
            },
            {
                title: 'Salary',
                dataIndex: ['player', 'salary'],
                key: 'salary',
                sorter: (a: any, b: any) => a.salary - b.salary,
                render: (salary: number) => <text>{_to_fixed(salary)}</text>,
            },
            {
                title: 'Grade',
                dataIndex: ['player', 'grade'],
                key: 'grade',
                sorter: (a: any, b: any) => a.grade - b.grade,
                render: (grade: number) => <text>{_to_fixed(grade)}</text>,
            },
            // {
            //     title: 'Franchise',
            //     dataIndex: ["franchise", "franchise"],
            //     key: "franchise",
            //     sorter: (a: any, b: any) => a.franchise.localeCompare(b.franchise),
            // },
            {
                title: 'Lineup',
                dataIndex: 'lineup',
                key: 'lineup',
                render: (lineup: any, record: any) => (
                    LineupPicker(_lineup(lineup), record)),
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

                <Table columns={columns} dataSource={toJS(store.User.franchise.rosterSet)} pagination={false}
                       rowKey="id"
                       bordered
                       style={{
                           boxShadow: "0px 0px 2px 0px #D0D8F3",
                       }}
                />

            );
        }
    }
)

export default RosterTable;
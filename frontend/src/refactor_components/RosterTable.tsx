import React, {useContext, useState} from 'react';
import 'antd/dist/antd.css';
import {Table, Tag, Space, Alert} from 'antd';
import {PlayerTypeModelType, StoreContext} from "../models";
import {observer} from "mobx-react";
import {colour, suit_icon, _to_fixed, _lineup} from './TableFunctions'
import {toJS} from "mobx";
import SigningModal from "./SigningModal";
import LineupSelect from "./LineupSelect";


export const RosterTable: React.FunctionComponent = observer(() => {

        const store = useContext(StoreContext)

        const [visible, setVisible] = useState<boolean>(false)
        const [selectedplayer, setSelectedPlayer] = useState<any>([]);
        const [rosteralert, setRosterAlert] = useState<boolean>(false)

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
                sorter: (a: any, b: any) => a.lineup.localeCompare(b.lineup),
                render: (lineup: any, record: any) => (
                    <LineupSelect current_lineup={_lineup(lineup)} record={record} setRosterAlert={setRosterAlert}/>
                ),
            },
            {
                title: 'Action',
                key: 'action',
                render: (record: PlayerTypeModelType) => (

                    (record.contract) ? (
                        <Space size="middle">
                            <Tag color={"#89dc0d"} style={{ color: "#000000", border: "3px solid #89dc0d"}}>
                            Signed
                            </Tag>
                        </Space>
                    ) : (
                        <Space size="middle">
                            <Tag icon={<span style={{marginRight: '3px'}} role="img" aria-label="player"> 📝 </span>}
                                 color={"#ffe479"} style={{ color: "#000000", border: "3px solid #ffe479"}}
                                 onClick={() => {setSelectedPlayer(record); setVisible(true)}}>
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
                sorter: (a: any, b: any) => a.lineup.localeCompare(b.lineup),
                render: (lineup: any, record: any) => (
                    <LineupSelect current_lineup={_lineup(lineup)} record={record} setRosterAlert={setRosterAlert}/>
                ),
            },
            {
                title: 'Action',
                key: 'action',
                render: (record: PlayerTypeModelType) => (

                    (record.contract) ? (
                        <Space size="middle">
                            <Tag color={"#89dc0d"} style={{ color: "#000000", border: "3px solid #89dc0d"}}>
                            Signed
                            </Tag>
                        </Space>
                    ) : (
                        <Space size="middle">
                            <Tag icon={<span style={{marginRight: '3px'}} role="img" aria-label="player"> 📝 </span>}
                                 color={"#ffe479"} style={{ color: "#000000", border: "3px solid #ffe479"}}
                                 onClick={() => {setSelectedPlayer(record); setVisible(true)}}>
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
                    {rosteralert ?
                        <Alert
                            message="Illegal Roster"
                            description="Maximum Starters: 5 Maximum Rotation: 3"
                            type="error"
                            showIcon
                            closable
                            onClose={() => setRosterAlert(false)}
                        />
                        : null}
                    <Table columns={columns} dataSource={toJS(store.User.league.franchiseplayers("franchise"))} pagination={false}
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
import React, {useContext, useState} from 'react';
import 'antd/dist/antd.css';
import {Table, Tag, Space, Alert, Checkbox, Row, Col} from 'antd';
import {FranchiseTypeModelType, PlayerTypeModelType, StoreContext} from "../../models";
import {observer} from "mobx-react";
import {colour, suit_icon, _to_fixed, _lineup, insertArray} from '../Utils/TableFunctions'
import {toJS} from "mobx";
import SigningModal from "../Molecules/SigningModal";
import TrainerModal from "../Molecules/TrainerModal";
import LineupSelect from "../Molecules/LineupSelect";
import {mutateCreatePlayerQuery} from "../Utils/queries";


interface IFranchise {
    franchise: FranchiseTypeModelType;
}


export const RosterTable: React.FunctionComponent<IFranchise> = observer(({franchise} : IFranchise) => {

        const store = useContext(StoreContext)

        const [visible, setVisible] = useState<boolean>(false)
        const [trainerVisible, setTrainerVisible] = useState<boolean>(false)
        const [selectedPlayer, setSelectedPlayer] = useState<any>([]);
        const [rosterAlert, setRosterAlert] = useState<boolean>(false)

        const non_scouter_columns = [
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
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
                render: (tOption: number, record: any) => (
                    (record.tOption == 0) ? (
                        <Space size="middle">
                            <Tag color={"#ff7064"} style={{color: "#ffffff", border: "2px solid #ff7064"}}
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
                                                 "lineup": undefined,
                                                 "franchiseId": undefined,
                                                 "trainer": false,
                                                 "year": record.year,
                                                 "leagueId": store.User.franchise.league.id
                                             }
                                         }, mutateCreatePlayerQuery,
                                         undefined
                                     );
                                 }
                                 }>
                                Release Player
                            </Tag>
                        </Space>
                    ) : (
                        <text>{tOption}</text>
                    )

                ),
            },
            {
                title: 'Player Option',
                dataIndex: 'pOption',
                key: 'pOption',
                render: (pOption: number, record: any) => (
                    (record.pOption == 0) ? (
                        <Space size="middle">
                            <Tag color={"#ff7064"} style={{color: "#ffffff", border: "2px solid #ff7064"}}>
                                Active
                            </Tag>
                        </Space>
                    ) : (
                        <text>{pOption}</text>
                    )

                ),
            },
            {
                title: 'Renew',
                dataIndex: 'renew',
                key: 'renew',
                render: (renew: string, record: any) => (
                    (record.renew == "repeat" && record.contract == 1) ? (
                        <Space size="middle">
                            <Tag color={"#ff7064"} style={{color: "#ffffff", border: "2px solid #ff7064"}}
                                 onClick={() => {
                                     store.mutateCreatePlayer({
                                             "playerInput": {
                                                 "name": record.name,
                                                 "suit": record.suit,
                                                 "age": record.age,
                                                 "pv": record.pv,
                                                 "epv": record.epv,
                                                 "sEpv": record.sEpv,
                                                 "contract": (record.contract + 1),
                                                 "tOption": record.tOption,
                                                 "pOption": record.pOption,
                                                 "renew": record.renew,
                                                 "salary": record.salary,
                                                 "grade": record.grade,
                                                 "lineup": record.lineup,
                                                 "franchiseId": record.franchise.id,
                                                 "trainer": record.trainer,
                                                 "year": record.year,
                                                 "leagueId": store.User.franchise.league.id
                                             }
                                         }, mutateCreatePlayerQuery,
                                         undefined
                                     );
                                 }
                                 }>
                                Extend Player
                            </Tag>
                        </Space>
                    ) : (
                    (record.renew == "non-repeat" && record.contract == 1) ? (
                        <Space size="middle">
                            <Tag color={"#ff7064"} style={{color: "#ffffff", border: "2px solid #ff7064"}}
                                 onClick={() => {
                                     store.mutateCreatePlayer({
                                             "playerInput": {
                                                 "name": record.name,
                                                 "suit": record.suit,
                                                 "age": record.age,
                                                 "pv": record.pv,
                                                 "epv": record.epv,
                                                 "sEpv": record.sEpv,
                                                 "contract": (record.contract + 1),
                                                 "tOption": record.tOption,
                                                 "pOption": record.pOption,
                                                 "renew": "No",
                                                 "salary": record.salary,
                                                 "grade": record.grade,
                                                 "lineup": record.lineup,
                                                 "franchiseId": record.franchise.id,
                                                 "trainer": record.trainer,
                                                 "year": record.year,
                                                 "leagueId": store.User.franchise.league.id
                                             }
                                         }, mutateCreatePlayerQuery,
                                         undefined
                                     );
                                 }
                                 }>
                                Extend Player
                            </Tag>
                        </Space>
                    ) : (
                        <text>
                            {renew}
                        </text>
                    )
                    )
                ),
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


        let sEPV_column =
            {
                title: 'S EPV',
                dataIndex: 'sEpv',
                key: 'sEpv',
                sorter: (a: any, b: any) => a.sEpv - b.sEpv,
                render: (sEpv: number) => <text>{sEpv.toFixed(1)}</text>,
            }

        let trainer_column =
            {
                title: 'Trainer',
                key: 'trainer',
                render: (record: PlayerTypeModelType) => (
                    (record.trainer) ? (
                        <Space size="middle">
                            <Tag icon={<span style={{marginRight: '3px'}} role="img" aria-label="player"> 🏋️‍♂️ </span>}
                                color={"#a4c34f"} style={{ color: "#000000", border: "3px solid #A4C34F"}}>
                            Training
                            </Tag>
                        </Space>
                    ) : (
                        <Space size="middle">
                            <Tag
                                 color={"#ebd2d1"} style={{ color: "#000000", border: "3px solid #EBD2D1"}}
                                 onClick={() => {setSelectedPlayer(record); setTrainerVisible(true)}}>
                            Train
                            </Tag>
                        </Space>
                    )
                ),
            }

        const columns = () => {
            if (franchise.gm !== null)
                if (franchise.gm.trait === "SCOUTER") {
                    let scouter_columns = non_scouter_columns
                    insertArray(non_scouter_columns, 3, sEPV_column)
                    return scouter_columns
                }
                else if (franchise.gm.trait === "TRAINER") {
                    let trainer_columns = non_scouter_columns
                    insertArray(non_scouter_columns, 3, trainer_column)
                    return trainer_columns
                }
                else {
                    return non_scouter_columns
                }
            else return non_scouter_columns
            }

        if (store.User == undefined || store.User.franchise == undefined) return <div>loading</div>;
        else {
            return (
                <div>
                    <SigningModal visible={visible} setVisible={setVisible} selectedplayer={selectedPlayer}/>
                    <TrainerModal trainerVisible={trainerVisible} setTrainerVisible={setTrainerVisible} selectedplayer={selectedPlayer}/>
                    {rosterAlert ?
                        <Alert
                            style={{marginBottom: '10px'}}
                            message="Illegal Roster"
                            description="Maximum Starters: 5 Maximum Rotation: 3"
                            type="error"
                            showIcon
                            closable
                            onClose={() => setRosterAlert(false)}
                        />
                        : null}
                    <Table columns={columns()} dataSource={toJS(franchise.playerSet)} pagination={false}
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
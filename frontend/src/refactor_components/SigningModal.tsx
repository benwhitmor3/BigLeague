import React, {useContext, useEffect, useState} from 'react';
import 'antd/dist/antd.css';
import {Tag, Input, Modal, Select} from 'antd';
import {observer} from "mobx-react";
import CSS from "csstype";
import {StoreContext} from "../models";

interface IVisible {
    visible: boolean;
    setVisible: (visible:boolean) => void;
    selectedplayer: any;
}


export const SigningModal: React.FunctionComponent<IVisible> = observer(({visible, setVisible, selectedplayer} : IVisible) => {

        const store = useContext(StoreContext)

        const formStyles: CSS.Properties = {
            backgroundColor: '#ffffff',
            border: '1px solid #afafaf',
            margin: '5px',
            width: '10vh',
            borderRadius: '3px',
            padding: '1px',
            fontSize: '14px',
            color: '#000000',
        };

        const selectStyles: CSS.Properties = {
            margin: '5px',
            width: '20vh',
            fontSize: '14px',
        };


        // const [visible, setVisible] = useState<boolean>(false)
        // const [selectedplayer, setselectedplayer] = useState<any>([]);
        const [salary, setSalary] = useState<number>(0);
        const [renewal, setRenewal] = useState<string>("no");
        const [contractlength, setContractLength] = useState<number>(1);
        const [playeroption, setPlayerOption] = useState<number>(0);
        const [teamoption, setTeamOption] = useState<number>(0);
        const [offergrade, setOfferGrade] = useState<number>(0);
        const [gradecolour, setGradeColour] = useState<string>('#ff4d4f');

        // const player_modal = (player: PlayerTypeModelType) => {
            // setselectedplayer(player);
            // setVisible(true);
        // }


        const sign_player = () => {
            if (gradecolour == '#73d13d') {
                console.log("PLAYER SIGNED!");
                console.log(selectedplayer)
                store.mutateCreatePlayer({
                        "playerInput": {
                            "name": selectedplayer.name,
                            "suit": selectedplayer.suit,
                            "age": selectedplayer.age,
                            "pv": selectedplayer.pv,
                            "epv": selectedplayer.epv,
                            "sEpv": selectedplayer.sEpv,
                            "contract": contractlength,
                            "tOption": teamoption,
                            "pOption": playeroption,
                            "renew": renewal,
                            "salary": salary,
                            "grade": offergrade,
                            "franchiseId": store.User.franchise.id,
                            "trainer": false,
                            "lineup": selectedplayer.lineup,
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
                setVisible(false);


            } else {
                console.log("PLAYER REJECTED!");
                console.log(selectedplayer)
            }
        }

        useEffect(() => {
            calc_grade();
        }, [salary, renewal, contractlength, playeroption, teamoption, selectedplayer]);


        const calc_grade = () => {
            let epv = selectedplayer.epv;
            let age = selectedplayer.age;

            let grade = 0;

            // is contract is greater than zero
            if (contractlength > 0) {
                // set initial base salary
                grade = (salary * (contractlength + 1)) / epv;
                // adjust for renewal
                if (renewal == "repeat") {
                    grade -= 2
                } else if (renewal == "non-repeat") {
                    grade -= 1
                }
                // adjust for t_option
                if (teamoption > 0) {
                    grade -= (contractlength - teamoption)
                }
                // adjust for p_option
                if (playeroption > 0) {
                    grade += 0.5 * (contractlength - playeroption)
                }
                // adjust for age
                if (age >= 27) {
                    grade += age - 26
                }
                // stopper for invalid contracts where option is greater than contract length
                if (contractlength <= playeroption || contractlength <= teamoption) {
                    grade = -999.99
                }

               if (store.User.franchise.gm !== null)
                   if (store.User.franchise.gm.trait == "RECRUITER") {
                   // set grade after all adjustments + 2 for recruiter bonus
                        setOfferGrade(grade + 2)
                    }
                    else {
                   // set grade after all adjustments
                        setOfferGrade(grade)
                    }
                else setOfferGrade(grade)
                }

            if (grade >= selectedplayer.grade && grade >= 5) {
                setGradeColour('#73d13d')
            } else {
                setGradeColour('#ff4d4f')
            }
        }


        return (
            <div>


                <Modal
                    title="Contract Portal"
                    centered
                    visible={visible}
                    onOk={() =>
                        sign_player()
                    }
                    onCancel={() => setVisible(false)}
                    width={'600px'}
                >
                    <h4>{selectedplayer.name}</h4>
                    <label>Salary: </label>
                    <Input min={0} type="number" onChange={event => {
                        setSalary(event.target.valueAsNumber)
                    }} name="salary" style={formStyles}/>
                    <br/>
                    <label>Contract Length: </label>
                    <Select defaultValue={contractlength} style={selectStyles} options={[
                        {label: "One Year", value: 1},
                        {label: "Two Years", value: 2},
                        {label: "Three Years", value: 3},
                        {label: "Four Years", value: 4},
                        {label: "Five Years", value: 5},]} onChange={event => {
                        setContractLength(event)
                    }}>
                    </Select>
                    <br/>
                    <label>Renewal: </label>
                    <Select defaultValue={renewal} style={selectStyles} options={[
                        {label: "No", value: "no"},
                        {label: "Non-Repeat", value: "non-repeat"},
                        {label: "Repeat", value: "repeat"},]}
                            onChange={event => {
                                setRenewal(event)
                            }}>
                    </Select>
                    <br/>
                    <label>Player Option: </label>
                    <Select defaultValue={playeroption} style={selectStyles} options={[
                        {label: "None", value: 0},
                        {label: "Year One", value: 1},
                        {label: "Year Two", value: 2},
                        {label: "Year Three", value: 3},
                        {label: "Year Four", value: 4},]}
                            onChange={event => {
                                setPlayerOption(event)
                            }}>
                    </Select>
                    <br/>
                    <label>Team Option: </label>
                    <Select defaultValue={teamoption} style={selectStyles} options={[
                        {label: "None", value: 0},
                        {label: "Year One", value: 1},
                        {label: "Year Two", value: 2},
                        {label: "Year Three", value: 3},
                        {label: "Year Four", value: 4},]}
                            onChange={event => {
                                setTeamOption(event)
                            }}>
                    </Select>
                    <br/>
                    <label>Current Grade: </label>
                    <Tag color={'#afafaf'} style={{marginTop: '10px', fontSize: '14px'}}>
                        {selectedplayer.grade ? selectedplayer.grade.toFixed(2) : selectedplayer.grade}
                    </Tag>
                    <label>Offer Grade: </label>
                    <Tag color={gradecolour} style={{marginTop: '10px', fontSize: '14px'}}>
                        {offergrade.toFixed(2)}
                    </Tag>

                </Modal>

            </div>
        );
    }
)

export default SigningModal;
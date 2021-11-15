import React, {useContext} from 'react';
import {observer} from "mobx-react";
import {StoreContext} from "../../../models";
import {useForm} from "react-hook-form";
import {Alert, Card, Space} from "antd";
import {buttonStyles, cardStyles, formStyles, inputStyles, labelStyles} from "./CreateStyles";
import { useHistory } from "react-router-dom";

type franchiseConfig = {
    franchiseName: any;
};

interface ICreate {
    setFranchise: any;
}

export const CreateFranchise: React.FunctionComponent<ICreate> = observer(({setFranchise}: ICreate) => {

        const store = useContext(StoreContext)
        const history = useHistory();
        const {register, handleSubmit, errors} = useForm<franchiseConfig>();
        const onSubmit = handleSubmit(({franchiseName}: franchiseConfig) => {
            console.log(franchiseName);
            store.mutateCreateFranchise({
                    "email": store.User.email,
                    "franchiseInput": {
                        "franchise": franchiseName
                    }
                },
                `
            franchise {
                __typename
                id
                franchise
                gm {
                    __typename
                    id
                    trait
                }
                coach {
                    __typename
                    id
                    name
                    attributeOne
                    attributeTwo
                }
            }
            user {
                __typename
                id
                email
                username
                league {
                    __typename
                    id
                    leagueName
                }
                franchise {
                    __typename
                    id
                    league {
                        __typename
                        id
                        leagueName
                        franchiseSet {
                            __typename
                            id
                            franchise
                            gm {
                                __typename
                                id
                                trait
                            }
                            coach {
                                __typename
                                id
                                name
                                attributeOne
                                attributeTwo
                            }
                            playerSet {
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
                                franchise {
                                    __typename
                                    id
                                }
                                lineup
                            }
                            seasonSet {
                                __typename
                                id
                                franchise {
                                    __typename
                                    id
                                }
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
                            stadium {
                                __typename
                                id
                                stadiumName
                                seats
                                boxes
                                grade
                                maxGrade
                                homeFieldAdvantage
                                city {
                                    __typename
                                    id
                                    city
                                    cityValue
                                }
                            }
                        }
                        citySet {
                            __typename
                            id
                            city
                            cityValue
                            league {
                                __typename
                                id
                            }
                            stadiumSet {
                                __typename
                                id
                                city {
                                    __typename
                                    id
                                }
                                franchise {
                                    __typename
                                    id
                                }
                                stadiumName
                                seats
                                boxes
                                grade
                                maxGrade
                                homeFieldAdvantage
                            }
                        }
                        playerSet {
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
                            franchise {
                                __typename
                                id
                                franchise
                            }
                            lineup
                        }
                        gmSet {
                            __typename
                            id
                            trait
                        }
                        coachSet {
                            __typename
                            id
                            name
                            attributeOne
                            attributeTwo
                        }
                    }
                }
            }
            `,
                undefined
            ).then(data =>
                // this is needed so the franchise page can switch between franchises selected
                setFranchise(data.createFranchise.user.franchise))
        });

        return (
            <form style={formStyles} onSubmit={onSubmit}>
                <Card style={cardStyles} title="Start Franchise">
                    <Space direction="vertical">
                        <label style={labelStyles}>Franchise Name</label>
                        <input name="franchiseName" style={inputStyles} ref={register({
                            required: {
                                value: true,
                                message: "Franchise name is a required field",
                            },
                            maxLength: {
                                value: 25,
                                message: 'Max Franchise name length is 25',
                            },
                        })}/>
                        <input type="submit" style={buttonStyles} value="Create Franchise"/>
                        <br/> {errors.franchiseName &&
                    <Alert message={errors.franchiseName.message} type="error" closable/>}
                        <br/>
                    </Space>
                </Card>
            </form>
        );
    }
)

export default CreateFranchise;

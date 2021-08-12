import React, {useContext} from 'react';
import {observer} from "mobx-react";
import {StoreContext} from "../../models";
import {useForm} from "react-hook-form";
import {Alert} from "antd";
import CSS from "csstype";

type franchiseConfig = {
    franchiseName: any;
};

interface ICreate {
    setFranchise: any;
}

export const CreateFranchise: React.FunctionComponent<ICreate> = observer(({setFranchise} : ICreate) => {

        const store = useContext(StoreContext)
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


    const labelStyles: CSS.Properties = {
        marginRight: '5px',
    };

    const formStyles: CSS.Properties = {
        backgroundColor: '#d4380d',
        border: '0px',
        borderRadius: '4px',
        padding: '0.5rem',
        fontSize: '14px',
        color: '#fff2e8',
    };

    const buttonStyles: CSS.Properties = {
        backgroundColor: '#ad2102',
        margin: '5px',
        border: '0px',
        borderRadius: '12px',
        fontSize: '14px',
        color: '#fff2e8',
        padding: '8px',
    };

        if (store.User == undefined) return <div>Missing User</div>;
        else {
            return (
                <form onSubmit={onSubmit}>
                    <label style={labelStyles}>Franchise Name</label>
                    <input name="franchiseName" style={formStyles} ref={register({
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

                <br/> {errors.franchiseName && <Alert message={errors.franchiseName.message} type="error" closable/>}
                    <br/>

                </form>
            );
        }
    }
)

export default CreateFranchise;

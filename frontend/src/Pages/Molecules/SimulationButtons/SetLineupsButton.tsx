import React, {useContext, useState} from 'react';
import 'antd/dist/antd.css';
import {Button, Progress} from 'antd';
import {observer} from "mobx-react";
import axios from "axios";
import {StoreContext} from "../../../models";
import {simButtonStyles} from "./SimButtonStyles";
import SmallLoading from "../../Atoms/SmallLoading";

export const SetLineupsButton: React.FunctionComponent = observer(() => {

        const store = useContext(StoreContext)

        const [loading, setLoading] = useState<boolean>(false)
        const email: any = localStorage.getItem('email') ? localStorage.getItem('email') : '';

        const setLineups = () => {
            const data = new FormData();
            data.append("franchise_id", store.User.franchise.id)
            setLoading(true)
            axios.post('http://127.0.0.1:8000/set_lineup', data)
                .then(res => {
                    console.log(res.data)
                    store.queryUser(
                    {email: email},
                        `__typename
                                      id
                                      franchise{
                                        __typename
                                        id
                                        league{
                                          __typename
                                          id
                                          franchiseSet{
                                            __typename
                                            id
                                            playerSet{
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
                                              year
                                              trainer
                                              lineup
                                            }
                                            gm{
                                                __typename
                                                id
                                                trait
                                            }
                                            coach{
                                                __typename
                                                id
                                                name
                                                attributeOne
                                                attributeTwo
                                            }
                                          }
                                        }
                                      }`
                    )
                    setTimeout(() => {setLoading(false)}, 1500);
                })
                .catch(err => {
                    console.log(err)
                    setTimeout(() => {setLoading(false)}, 1500);
                })
        };


        if (loading) return (
            <div>
                <SmallLoading animation={"ld ld-bounce"}/>
            </div>
        )
        else {
            return (
                <div>
                    <Button style={simButtonStyles} onClick={() => setLineups()} block>
                        Set Bots Lineups
                    </Button>
                </div>
            );
        }
    }
)

export default SetLineupsButton;
import React, {useContext, useState} from 'react';
import 'antd/dist/antd.css';
import {Button} from 'antd';
import {observer} from "mobx-react";
import axios from "axios";
import {StoreContext} from "../../../models";
import {simButtonStyles} from "./SimButtonStyles";
import SmallLoading from "../../Atoms/Loading/SmallLoading";


export const SignPlayersButton: React.FunctionComponent = observer(() => {

        const store = useContext(StoreContext)

        const [loading, setLoading] = useState<boolean>(false)
        const email: any = localStorage.getItem('email') ? localStorage.getItem('email') : '';

        const signPlayers = () => {
            let link = '';
            if (window.location.port === '3000') {
                link = window.location.hostname + ':8000'
            } else {
                link = window.location.host
            }
            const data = new FormData();
            data.append("franchise_id", store.User.franchise.id)
            setLoading(true)
            axios.post(window.location.protocol + "//" + link + '/sign_players', data)
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
                                              trainer
                                              lineup
                                            }
                                          }
                                        }
                                      }`
                    )
                    setTimeout(() => {
                        setLoading(false)
                    }, 1000);
                })
                .catch(err => {
                    console.log(err)
                    setTimeout(() => {
                        setLoading(false)
                    }, 1000);
                })
        };


        if (loading) return (
            <div>
                <SmallLoading animation="ld ld-bounce"/>
            </div>
        )
        else {
            return (
                <div>
                    <Button style={simButtonStyles} onClick={() => signPlayers()} block>
                        Sign Bots Players
                    </Button>
                </div>
            );
        }
    }
)

export default SignPlayersButton;
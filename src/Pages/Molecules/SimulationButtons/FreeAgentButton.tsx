import React, {useContext, useState} from 'react';
import 'antd/dist/antd.css';
import {Button} from 'antd';
import {observer} from "mobx-react";
import axios from "axios";
import {StoreContext} from "../../../models";
import SmallLoading from "../../Atoms/Loading/SmallLoading";
import {simButtonStyles} from "./SimButtonStyles";

export const FreeAgencyButton: React.FunctionComponent = observer(() => {

        const store = useContext(StoreContext)

        const [loading, setLoading] = useState<boolean>(false)
        const email: any = localStorage.getItem('email') ? localStorage.getItem('email') : '';

        const signFreeAgents = () => {
            let link = '';
            if (window.location.port === '3000') {
                link = window.location.hostname + ':8000'
            } else {
                link = window.location.host
            }
            const data = new FormData();
            data.append("franchise_id", store.User.franchise.id)
            data.append("season", store.User.franchise.seasonSet.length)
            setLoading(true)
            axios.post(window.location.protocol + "//" + link + '/free_agency', data)
                .then(res => {
                    console.log(res.data)
                    store.queryUser(
                    {email: email},
                    `        
                    __typename
                    id
                    franchise{
                        __typename
                        id
                        stadium{
                          __typename
                          id
                          grade
                          maxGrade
                        }
                      league{
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
                            year
                            franchise{
                                __typename
                                id
                                franchise
                            }
                        }
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
                            year
                            franchise {
                                __typename
                                id
                                franchise
                            }
                          }
                        }
                      }
                    }`,
                    {}
                    )
                    setTimeout(() => {setLoading(false)}, 2000);
                })
                .catch(err => {
                    console.log(err)
                    setTimeout(() => {setLoading(false)}, 2000);
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
                    <Button style={simButtonStyles} onClick={() => signFreeAgents()} block>
                        Sim Free Agents
                    </Button>
                </div>
            );
        }
    }
)

export default FreeAgencyButton;
import React, {useContext, useState} from 'react';
import 'antd/dist/antd.css';
import {Button, Progress} from 'antd';
import {observer} from "mobx-react";
import axios from "axios";
import {StoreContext} from "../../models";

export const FreeAgencyButton: React.FunctionComponent = observer(() => {

        const store = useContext(StoreContext)

        const [loading, setLoading] = useState<boolean>(false)
        const [percent, setPercent] = useState<number>(0)

        const signFreeAgents = () => {
            const data = new FormData();
            data.append("franchise_id", store.User.franchise.id)
            data.append("season", store.User.franchise.seasonSet.length)
            setLoading(true)
            setPercent(50)
            axios.post('http://127.0.0.1:8000/free_agency', data)
                .then(res => {
                    console.log(res.data)
                    store.queryAllUser(
                    {},
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
                    setLoading(false)
                })
                .catch(err => {
                    console.log(err)
                    setLoading(false)
                })
        };


        if (loading) return (
            <div>
                <h3>Signing Free Agents</h3>
                <Progress strokeColor={{'0%': '#108ee9', '100%': '#87d068',}} percent={percent}/>
            </div>
        )
        else {
            return (
                <div>
                    <Button type="primary" onClick={() => signFreeAgents()} block>
                        Sign Free Agents
                    </Button>
                </div>
            );
        }
    }
)

export default FreeAgencyButton;
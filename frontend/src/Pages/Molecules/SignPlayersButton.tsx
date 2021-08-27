import React, {useContext, useState} from 'react';
import 'antd/dist/antd.css';
import {Button, Progress, notification} from 'antd';
import {observer} from "mobx-react";
import axios from "axios";
import {StoreContext} from "../../models";


export const rosterError = (franchise: string) => {
    notification.error({
        message: 'Roster Error',
        description: franchise + ' does not have enough players',
        duration: 3,
    });
};


export const SignPlayersButton: React.FunctionComponent = observer(() => {

        const store = useContext(StoreContext)

        const [loading, setLoading] = useState<boolean>(false)
        const [percent, setPercent] = useState<number>(0)

        const signPlayers = () => {
            for (let franchise in store.User.franchise.league.franchiseSet) {
                if (store.User.franchise.league.franchiseplayers(store.User.franchise.league.franchiseSet[franchise].franchise).length < 5)
                    return rosterError(store.User.franchise.league.franchiseSet[franchise].franchise);
            }
            const data = new FormData();
            data.append("franchise_id", store.User.franchise.id)
            setLoading(true)
            setPercent(50)
            axios.post('http://127.0.0.1:8000/sign_players', data)
                .then(res => {
                    console.log(res.data)
                    store.queryAllUser({},
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
                    setLoading(false)
                })
                .catch(err => {
                    console.log(err)
                    setLoading(false)
                })
        };


        if (loading) return (
            <div>
                <h3>Signing Players</h3>
                <Progress strokeColor={{'0%': '#108ee9', '100%': '#87d068',}} percent={percent}/>
            </div>
        )
        else {
            return (
                <div>
                    <Button type="primary" onClick={() => signPlayers()} block>
                        Sign Players
                    </Button>
                </div>
            );
        }
    }
)

export default SignPlayersButton;
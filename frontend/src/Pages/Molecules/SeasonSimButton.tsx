import React, {useContext, useState} from 'react';
import 'antd/dist/antd.css';
import {Button, Progress, notification} from 'antd';
import {observer} from "mobx-react";
import axios from "axios";
import {StoreContext} from "../../models";
import {userQuery} from "../Utils/queries";


export const rosterError = (franchise: string) => {
    notification.error({
        message: 'Roster Error',
        description: franchise + ' does not have enough players',
        duration: 3,
    });
};


export const SeasonSimButton: React.FunctionComponent = observer(() => {

        const store = useContext(StoreContext)

        const [loading, setLoading] = useState<boolean>(false)
        const [percent, setPercent] = useState<number>(0)

        const simSeason = () => {
            for (let franchise in store.User.franchise.league.franchiseSet) {
                if (store.User.franchise.league.franchiseplayers(store.User.franchise.league.franchiseSet[franchise].franchise).length < 5)
                    return rosterError(store.User.franchise.league.franchiseSet[franchise].franchise);
            }
            const data = new FormData();
            data.append("league_id", store.User.franchise.league.id)
            data.append("season", store.User.franchise.seasonSet.length)
            setLoading(true)
            setPercent(50)
            axios.post('http://127.0.0.1:8000/season_sim', data)
                .then(res => {
                    console.log(res.data)
                    store.queryAllLeague({},
                        `__typename
                    id
                    franchiseSet{
                      __typename
                      id
                      seasonSet{
                        __typename
                        id
                        franchise{
                            __typename
                            id
                            franchise
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
                    }`
                    )
                    store.queryUser(
                    {email: "email@email.com"},
                    userQuery
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
                <h3>Simulating Season</h3>
                <Progress strokeColor={{'0%': '#108ee9', '100%': '#87d068',}} percent={percent}/>
            </div>
        )
        else {
            return (
                <div>
                    <Button type="primary" onClick={() => simSeason()} block>
                        Simulate Season
                    </Button>
                </div>
            );
        }
    }
)

export default SeasonSimButton;
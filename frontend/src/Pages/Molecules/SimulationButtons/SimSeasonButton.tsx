import React, {useContext, useState} from 'react';
import 'antd/dist/antd.css';
import {Button} from 'antd';
import {observer} from "mobx-react";
import axios from "axios";
import {FranchiseTypeModelType, StoreContext} from "../../../models";
import {userQuery} from "../../Utils/queries";
import {simSeasonChecker} from "./SimSeasonChecker";
import {simButtonStyles} from "./SimButtonStyles";
import BigLoading from "../../Atoms/Loading/BigLoading";
import {ticketError, unusedActionError} from "../../Atoms/notificationerrors";


export const SimSeasonButton: React.FunctionComponent = observer(() => {

        const store = useContext(StoreContext)

        const [loading, setLoading] = useState<boolean>(false)
        const email: any = localStorage.getItem('email') ? localStorage.getItem('email') : '';

        const simSeason = () => {

            // sets seasonSimCheck as true
            store.User.league.setSeasonSimCheck(true)
            // loops through each franchise, if check fails, sets seasonSim to false
            store.User.franchise.league.franchiseSet.forEach((franchise: FranchiseTypeModelType) =>
                simSeasonChecker(franchise, store.User.league))
            //checks if user team has ticket pricing, if check fails, sets seasonSim to false
            if (store.User.franchise.seasonSet[store.User.franchise.seasonSet.length - 1].ticketPrice == 0
                || store.User.franchise.seasonSet[store.User.franchise.seasonSet.length - 1].boxPrice == 0) {
                store.User.league.setSeasonSimCheck(false)
                return ticketError(store.User.franchise.franchise);
            }
            //checks if user team has actions available, if check fails, sets seasonSim to false
            if (store.User.franchise.action.numberOfActions > 0) {
                store.User.league.setSeasonSimCheck(false)
                return unusedActionError(store.User.franchise.franchise);
            }
            // if seasonSimCheck is false do not run season simulation
            if (store.User.league.seasonSimCheck === false) {
                return
            }

            // season sim request
            const data = new FormData();
            data.append("league_id", store.User.franchise.league.id)
            data.append("season", store.User.franchise.seasonSet.length)
            setLoading(true)
            axios.post('http://127.0.0.1:8000/season_sim', data)
                .then(res => {
                    console.log(res.data)
                    store.queryUser(
                    {email: email},
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
                <BigLoading animation="ld ld-bounce"/>
            </div>
        )
        else {
            return (
                <div>
                    <Button style={simButtonStyles} onClick={() => simSeason()} block>
                        Simulate Season
                    </Button>
                </div>
            );
        }
    }
)

export default SimSeasonButton;
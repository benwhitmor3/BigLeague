import React, {useContext, useEffect} from 'react';
import 'antd/dist/antd.css';
import {StoreContext} from "../models";
import {observer} from "mobx-react";
import PlayerHistoryTable from "./Organisms/Tables/PlayerHistoryTable";
import SmallLoading from "./Atoms/Loading/SmallLoading";
import introJs from "intro.js";


export const PlayerHistory: React.FunctionComponent = observer(() => {

        const store = useContext(StoreContext)

        useEffect(() => {
            if (store.User.franchise.seasonSet.length === 2) {
                introJs().start()
            }
        }, [store.User.franchise])

        if (store.User?.franchise == null)
            return <SmallLoading animation="ld ld-bounce"/>
        else {
            return (
                <div data-intro="Player history table shows player stats from previous seasons." data-step={1} className="card-demo">
                <PlayerHistoryTable/>
                </div>
            );
        }
    }
)

export default PlayerHistory;
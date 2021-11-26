import React, {useContext} from 'react';
import 'antd/dist/antd.css';
import {StoreContext} from "../models";
import {observer} from "mobx-react";
import SmallLoading from "./Atoms/Loading/SmallLoading";
import LeaderboardTable from "./Organisms/Tables/LeaderboardTable";


export const Leaderboard: React.FunctionComponent = observer(() => {

        const store = useContext(StoreContext)

        if (store.User?.franchise == null)
            return <SmallLoading animation="ld ld-bounce"/>
        else
            return (
            <div>
                <LeaderboardTable/>
            </div>
        );
    }
)

export default Leaderboard;
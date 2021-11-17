import React, {useContext} from 'react';
import 'antd/dist/antd.css';
import {StoreContext} from "../models";
import {observer} from "mobx-react";
import PlayerHistoryTable from "./Organisms/Tables/PlayerHistoryTable";
import SmallLoading from "./Atoms/Loading/SmallLoading";


export const PlayerHistory: React.FunctionComponent = observer(() => {

        const store = useContext(StoreContext)

        if (store.User?.franchise == null)
            return <SmallLoading animation="ld ld-bounce"/>
        else {
            return (
                <PlayerHistoryTable/>
            );
        }
    }
)

export default PlayerHistory;
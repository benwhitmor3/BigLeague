import React, {useContext} from 'react';
import 'antd/dist/antd.css';
import {StoreContext} from "../models";
import {observer} from "mobx-react";
import LeagueTable from "./Organisms/LeagueTable";
import Loading from "./Molecules/Loading";


export const League: React.FunctionComponent = observer(() => {

        const store = useContext(StoreContext)

        if (store.User?.franchise == null)
            return <Loading/>
        else {
            return (
                <LeagueTable/>
            );
        }
    }
)

export default League;
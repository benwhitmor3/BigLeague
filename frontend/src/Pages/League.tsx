import React, {useContext} from 'react';
import 'antd/dist/antd.css';
import {Col, Spin} from 'antd';
import {StoreContext} from "../models";
import {observer} from "mobx-react";
import LeagueTable from "./Organisms/LeagueTable";


export const League: React.FunctionComponent = observer(() => {

        const store = useContext(StoreContext)

        if (store.User == undefined || store.User.franchise == undefined) return <div><Spin size="large"/></div>;
        else {
            return (
                <LeagueTable/>
            );
        }
    }
)

export default League;
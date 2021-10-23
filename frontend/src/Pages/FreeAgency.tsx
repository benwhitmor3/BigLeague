import React, {useContext} from 'react';
import {observer} from 'mobx-react'
import {StoreContext} from "../models";
import {Spin} from 'antd';
import FreeAgentTable from "./Organisms/FreeAgentTable";


export const FreeAgency: React.FunctionComponent = observer(() => {

    const store = useContext(StoreContext)

    if (store.User == undefined || store.User.franchise == undefined)
        return <Spin/>
    else {
        return (
                <FreeAgentTable/>
        );
    }
})

export default FreeAgency;


import React, {useContext} from 'react';
import {observer} from 'mobx-react'
import {StoreContext} from "../models";
import FreeAgentTable from "./Organisms/FreeAgentTable";
import Loading from "./Molecules/Loading";


export const FreeAgency: React.FunctionComponent = observer(() => {

    const store = useContext(StoreContext)

    if (store.User?.franchise == null)
        return <Loading/>
    else {
        return (
                <FreeAgentTable/>
        );
    }
})

export default FreeAgency;


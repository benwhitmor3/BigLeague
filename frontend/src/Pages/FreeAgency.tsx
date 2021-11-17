import React, {useContext} from 'react';
import {observer} from 'mobx-react'
import {FranchiseTypeModelType, StoreContext} from "../models";
import FreeAgentTable from "./Organisms/Tables/FreeAgentTable";
import SmallLoading from "./Atoms/Loading/SmallLoading";
import MissingStaffError from "./Atoms/MissingStaffError";


export const FreeAgency: React.FunctionComponent = observer(() => {

    const store = useContext(StoreContext)

    if (store.User?.league == null)
        return <SmallLoading animation="ld ld-bounce"/>
    else if (store.User?.league?.franchisesWithoutGm.length > 0 || store.User?.league?.franchisesWithoutCoach.length > 0)
        return (
            <MissingStaffError/>
        )
    else {
        return (
            <FreeAgentTable/>
        );
    }
})

export default FreeAgency;


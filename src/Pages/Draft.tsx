import React, {useContext} from 'react';
import {observer} from 'mobx-react'
import {StoreContext} from "../models";
import SmallLoading from "./Atoms/Loading/SmallLoading";
import DraftTemplate from "./Templates/DraftTemplate";
import MissingStaffError from "./Atoms/MissingStaffError";


export const Draft: React.FunctionComponent = observer(() => {

    const store = useContext(StoreContext)

    if (store.User?.league == null)
        return <SmallLoading animation="ld ld-bounce"/>
    else if (store.User?.league?.franchisesWithoutGm.length > 0 || store.User?.league?.franchisesWithoutCoach.length > 0)
        return (
                <MissingStaffError/>
        )
    else {
        return (
            <div>
                <DraftTemplate/>
            </div>
        );
    }
})

export default Draft;


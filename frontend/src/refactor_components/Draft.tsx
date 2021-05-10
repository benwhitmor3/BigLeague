import React, {useContext} from 'react';
import {observer} from 'mobx-react'
import {StoreContext} from "../models";
import DraftTable from "./DraftTable";


export const Draft: React.FunctionComponent = observer(() => {

    const store = useContext(StoreContext)

    if (store.User == undefined) return <div>loading</div>;
    else {
        return (
                <DraftTable/>
        );
    }
})

export default Draft;


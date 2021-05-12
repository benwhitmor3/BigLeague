import React, {useContext} from 'react';
import {observer} from 'mobx-react'
import {StoreContext} from "../models";
import DraftTable from "./DraftTable";
import DraftOrder from "./DraftOrder";


export const Draft: React.FunctionComponent = observer(() => {

    const store = useContext(StoreContext)

    if (store.User == undefined) return <div>loading</div>;
    else {
        return (
            <div>
                <DraftOrder/>
                <DraftTable/>
            </div>
        );
    }
})

export default Draft;


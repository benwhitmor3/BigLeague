import React, {useContext} from 'react';
import {observer} from 'mobx-react'
import {StoreContext} from "../models";
import DraftTable from "./Organisms/DraftTable";
import DraftOrder from "./Organisms/DraftOrder";


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


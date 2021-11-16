import React, {useContext} from 'react';
import {observer} from "mobx-react";
import {StoreContext} from "../models";
import StadiumCard from "./Organisms/StadiumCard";
import CreateStadium from "./Molecules/Create/CreateStadium";
import TicketTable from "./Organisms/Tables/TicketTable";

export const Stadium: React.FunctionComponent = observer(() => {

        const store = useContext(StoreContext)

        if (store.User === undefined) return <div>loading</div>;
        if (store.User.franchise?.stadium != null && store.User.league.franchiseSet.length > 1)
            return (
                <div>
                <StadiumCard/>
                <TicketTable franchise={store.User.franchise}/>
                </div>
            )
        else
            return (
                <CreateStadium/>
            )
    }
)

export default Stadium;

import React, {useContext} from 'react';
import {observer} from "mobx-react";
import {StoreContext} from "../models";
import StadiumCard from "./Organisms/StadiumCard";
import CreateStadium from "./Molecules/CreateStadium";
import StadiumImage from "./Molecules/StadiumImage";
import TicketInput from "./Molecules/TicketInput";

export const Stadium: React.FunctionComponent = observer(() => {

        const store = useContext(StoreContext)

        if (store.User === undefined) return <div>loading</div>;
        if (store.User.franchise?.stadium != null)
            return (
                <div>
                <StadiumCard/>
                <TicketInput/>
                <StadiumImage/>
                </div>
            )
        else
            return (
                <CreateStadium/>
            )
    }
)

export default Stadium;

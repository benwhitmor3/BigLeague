import React, {useContext, useEffect} from 'react';
import {observer} from 'mobx-react'
import {StoreContext} from "../models";
import FreeAgentTable from "./Organisms/Tables/FreeAgentTable";
import SmallLoading from "./Atoms/Loading/SmallLoading";
import MissingStaffError from "./Atoms/MissingStaffError";
import FreeAgencyButton from "./Molecules/SimulationButtons/FreeAgentButton";
import introJs from "intro.js";


export const FreeAgency: React.FunctionComponent = observer(() => {

    const store = useContext(StoreContext)

        useEffect(() => {
        if (store.User.franchise.seasonSet.length === 2) {
            introJs().start()
        }
    }, [store.User.franchise])

    if (store.User?.league == null)
        return <SmallLoading animation="ld ld-bounce"/>
    else if (store.User?.league?.franchisesWithoutGm.length > 0 || store.User?.league?.franchisesWithoutCoach.length > 0)
        return (
            <MissingStaffError/>
        )
    else {
        return (
            <div>
            <div data-intro="Click here to simulate free agency." data-step={1} className="card-demo">
            <FreeAgencyButton/>
            </div>
            <div data-intro="After you have simulated free agency outbid other franchises to sign players." data-step={2} className="card-demo">
            <FreeAgentTable/>
            </div>
            </div>
        );
    }
})

export default FreeAgency;


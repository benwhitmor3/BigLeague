import React, {useContext, useEffect} from 'react';
import {observer} from 'mobx-react'
import DraftTable from "../Organisms/Tables/DraftTable";
import DraftOrder from "../Molecules/DraftOrder";
import DraftButton from "../Molecules/SimulationButtons/DraftButton";
import BestDraftPlayer from "../Molecules/BestDraftPlayer";
import introJs from "intro.js";
import {StoreContext} from "../../models";


export const DraftTemplate: React.FunctionComponent = observer(() => {

    const store = useContext(StoreContext)

    useEffect(() => {
        if (store.User.franchise.seasonSet.length === 1) {
            introJs().start()
        }
    }, [store.User.franchise])

    return (
        <div>
            <div data-intro="Welcome to the draft! This represents the order of picks." data-step={1} className="card-demo">
                <div data-intro="This simulates an opponent's pick in the draft." data-step={2} className="card-demo">
                    <DraftButton/>
                </div>
                <BestDraftPlayer/>
                <DraftOrder/>
            </div>
            <div data-intro="Here are the players available to draft. Click the draft prospect button to select a
            player for your team."
                data-step={3} className="card-demo">
                <DraftTable/>
            </div>
        </div>
    );
})

export default DraftTemplate;


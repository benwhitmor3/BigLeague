import React, {useContext, useEffect} from 'react';
import 'antd/dist/antd.css';
import {StoreContext} from "../models";
import {observer} from "mobx-react";
import SimSeasonButton from "./Molecules/SimulationButtons/SimSeasonButton";
import SeasonTable from "./Organisms/Tables/SeasonTable";
import SmallLoading from "./Atoms/Loading/SmallLoading";
import introJs from "intro.js";


export const Season: React.FunctionComponent = observer(() => {

        const store = useContext(StoreContext)

        useEffect(() => {
            if (store.User.franchise.seasonSet.length === 1) {
                introJs().start()
            }
        }, [store.User])

        if (store.User?.franchise == null)
            return <SmallLoading animation="ld ld-bounce"/>
        else
            return (
                <div>
                    <div data-intro="Click here to simulate the season."
                         data-step={1} className="card-demo">
                        <SimSeasonButton/>
                    </div>
                        <SeasonTable/>
                </div>
            );
    }
)

export default Season;
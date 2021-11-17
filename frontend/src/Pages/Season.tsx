import React, {useContext} from 'react';
import 'antd/dist/antd.css';
import {StoreContext} from "../models";
import {observer} from "mobx-react";
import SimSeasonButton from "./Molecules/SimulationButtons/SimSeasonButton";
import SeasonTable from "./Organisms/Tables/SeasonTable";
import SmallLoading from "./Atoms/Loading/SmallLoading";


export const Season: React.FunctionComponent = observer(() => {

        const store = useContext(StoreContext)

        if (store.User?.franchise == null)
            return <SmallLoading animation="ld ld-bounce"/>
        else
            return (
            <div>
                <SimSeasonButton/>
                <SeasonTable/>
            </div>
        );
    }
)

export default Season;
import React from 'react';
import {observer} from 'mobx-react'
import DraftTable from "../Organisms/Tables/DraftTable";
import DraftOrder from "../Molecules/DraftOrder";
import DraftButton from "../Molecules/SimulationButtons/DraftButton";
import BestDraftPlayer from "../Molecules/BestDraftPlayer";


export const DraftTemplate: React.FunctionComponent = observer(() => {

        return (
            <div>
                <DraftButton/>
                <BestDraftPlayer/>
                <DraftOrder/>
                <DraftTable/>
            </div>
        );
})

export default DraftTemplate;


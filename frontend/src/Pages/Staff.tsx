import React, {useContext} from 'react';
import {observer} from 'mobx-react'
import {StoreContext} from "../models";
import {GmCoachCard} from "./Molecules/GmCoachCard";
import {Spin} from 'antd';
import GmCoachInfo from "./Molecules/GmCoachInfo";
import GmCoachSelect from "./Molecules/GmCoachSelect";
import SetStaffButton from "./Molecules/SetStaffButton";

export const Staff: React.FunctionComponent = observer(() => {

    const store = useContext(StoreContext)

    if (store.User.franchise == null)
        return <Spin/>
    else {
        return (
            <div>
                <GmCoachInfo/>
                <SetStaffButton/>
                <GmCoachCard/>
                <GmCoachSelect/>
            </div>
        );
    }
})

export default Staff;


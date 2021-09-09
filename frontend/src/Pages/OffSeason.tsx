import React, {useContext, useEffect, useState} from 'react';
import {observer} from 'mobx-react'
import {StoreContext} from "../models";
import {Spin} from 'antd';
import SignPlayersButton from "./Molecules/SignPlayersButton";
import SetLineupsButton from "./Molecules/SetLineupsButton";
import LeagueStatus from "./Molecules/LeagueStatus";

export const OffSeason: React.FunctionComponent = observer(() => {

    const store = useContext(StoreContext)

    const [franchise, setFranchise] = useState<any>(store.User ? store.User.franchise : null);


    useEffect(() => {
        if (store.User) {
            setFranchise(store.User.franchise)
        }
    }, [store.User])

    if (franchise == null)
        return <Spin/>
    else {
        return (
            <div>
                <SignPlayersButton/>
                <SetLineupsButton/>
                <LeagueStatus/>
            </div>
        );
    }
})

export default OffSeason;


import React, {useContext, useEffect, useState} from 'react';
import {observer} from 'mobx-react'
import {FranchiseTypeModelType, StoreContext} from "../models";
import {Spin} from 'antd';
import SignPlayersButton from "./Molecules/SignPlayersButton";
import SetLineupsButton from "./Molecules/SetLineupsButton";
import LeagueStatus from "./Molecules/LeagueStatus";

export const OffSeason: React.FunctionComponent = observer(() => {

    const store = useContext(StoreContext)

    const [franchise, setFranchise] = useState<any>(store.User ? store.User.franchise : null);

    let unsignedGms = store.User.league.franchiseSet.map((franchise: FranchiseTypeModelType) => franchise.gm?.trait).filter((trait: any) => trait===undefined).length
    console.log(unsignedGms)

    useEffect(() => {
        if (store.User) {
            setFranchise(store.User.franchise)
        }
    }, [store.User])

    if (franchise == null)
        return <Spin/>
    else if (unsignedGms > 0)
        return (
        <div>
            <h3>Bot Teams Are Missing General Managers</h3>
            <LeagueStatus/>
        </div>
        )
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


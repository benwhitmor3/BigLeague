import React, {useContext, useEffect, useState} from 'react';
import {observer} from 'mobx-react'
import {FranchiseTypeModelType, StoreContext} from "../models";
import {Spin} from 'antd';
import SignPlayersButton from "./Molecules/SignPlayersButton";
import SetLineupsButton from "./Molecules/SetLineupsButton";
import LeagueStatus from "./Molecules/LeagueStatus";
import Loading from "./Molecules/Loading";

export const OffSeason: React.FunctionComponent = observer(() => {

    const store = useContext(StoreContext)

    const [franchise, setFranchise] = useState<any>(store.User ? store.User.franchise : null);

    let unsignedGms = store.User?.league?.franchiseSet.map((franchise: FranchiseTypeModelType) => franchise.gm?.trait).filter((trait: any) => trait===undefined).length
    let unsignedCoaches = store.User?.league?.franchiseSet.map((franchise: FranchiseTypeModelType) => franchise.coach?.attributeOne).filter((attributeOne: any) => attributeOne===undefined).length


    useEffect(() => {
        if (store.User) {
            setFranchise(store.User.franchise)
        }
    }, [store.User])

    if (store.User?.league == null)
        return <Loading/>
    else if (unsignedGms > 0 || unsignedCoaches > 0)
        return (
        <div>
            <h3>Franchise are Missing Staff</h3>
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


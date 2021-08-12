import React, {useContext, useEffect, useState} from 'react';
import {observer} from 'mobx-react'
import {FranchiseTypeModelType, StoreContext} from "../models";
import CreateFranchise from "./Molecules/CreateFranchise";
import GenerateLeagueOpponents from "./Organisms/GenerateLeagueOpponents";
import FranchiseCards from "./Organisms/FranchiseCards";

export const Franchise: React.FunctionComponent = observer(() => {

    const store = useContext(StoreContext)

    const [franchise, setFranchise] = useState<FranchiseTypeModelType>(store.User?.franchise ? store.User.franchise : null);

    useEffect(() => {
        if (store.User) {
            setFranchise(store.User.franchise)
        }
    }, [store.User])

    if (franchise == null)
        return <CreateFranchise setFranchise={setFranchise}/>;
    if (store.User.franchise.league.franchiseSet.length <= 1)
        return <GenerateLeagueOpponents/>;
    else {
        return <FranchiseCards franchise={franchise} setFranchise={setFranchise}/>;
    }
})

export default Franchise;


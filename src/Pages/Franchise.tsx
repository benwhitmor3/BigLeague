import React, {useContext, useEffect, useState} from 'react';
import {observer} from 'mobx-react'
import {FranchiseTypeModelType, StoreContext} from "../models";
import CreateFranchise from "./Molecules/Create/CreateFranchise";
import FranchiseCards from "./Templates/FranchiseCards";
import CreateBots from "./Molecules/Create/CreateBots";
import CreateLeague from "./Molecules/Create/CreateLeague";
import introJs from "intro.js";

export const Franchise: React.FunctionComponent = observer(() => {

    const store = useContext(StoreContext)

    const [franchise, setFranchise] = useState<FranchiseTypeModelType>(store.User?.franchise ? store.User.franchise : null);
    useEffect(() => {
        if (store.User) {
            setFranchise(store.User.franchise)
        }
        if (!store.User.league) {
            introJs().start();
        }
    }, [store.User])

    if (store.User?.league === undefined)
        return (
            <h1 className="ld ld-jump-alt-in" style={{textAlign: 'center', marginTop: '40px', fontSize: '32px'}}>
                Missing League
            </h1>
        )
    else if (store.User?.league === null)
        return (
            <div
                data-intro="Please read the instructions on the home page before starting. Once ready, create your league to begin your journey."
                data-step={1} className="card-demo">
                <CreateLeague/>
            </div>
        )
    else if (store.User?.franchise === null)
        return (
            <div
                data-step={1} className="card-demo">
                <CreateFranchise setFranchise={setFranchise}/>;
            </div>
        )
    else if (store.User.franchise.league.franchiseSet.length <= 1)
        return (
            <div
                data-step={1} className="card-demo">
                <CreateBots/>;
            </div>
        )
    else
        return <FranchiseCards franchise={franchise} setFranchise={setFranchise}/>
})

export default Franchise;


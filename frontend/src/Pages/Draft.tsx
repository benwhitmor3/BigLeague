import React, {useContext} from 'react';
import {observer} from 'mobx-react'
import {FranchiseTypeModelType, StoreContext} from "../models";
import DraftTable from "./Organisms/DraftTable";
import DraftOrder from "./Organisms/DraftOrder";


export const Draft: React.FunctionComponent = observer(() => {

    const store = useContext(StoreContext)

    let unsignedGms = store.User.league.franchiseSet.map((franchise: FranchiseTypeModelType) => franchise.gm?.trait).filter((trait: any) => trait===undefined).length;

    let unsignedCoaches = store.User.league.franchiseSet.map((franchise: FranchiseTypeModelType) => franchise.coach?.attributeOne).filter((attributeOne: any) => attributeOne===undefined).length

    if (store.User == undefined) return <div>loading</div>;
    else if (unsignedGms > 0 || unsignedCoaches > 0)
        return (
        <div>
            <h3>Franchise Are Missing Staff</h3>
        </div>
        )
    else {
        return (
            <div>
                <DraftOrder/>
                <DraftTable/>
            </div>
        );
    }
})

export default Draft;


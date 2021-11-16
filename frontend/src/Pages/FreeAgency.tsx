import React, {useContext} from 'react';
import {observer} from 'mobx-react'
import {FranchiseTypeModelType, StoreContext} from "../models";
import FreeAgentTable from "./Organisms/FreeAgentTable";
import SmallLoading from "./Atoms/SmallLoading";


export const FreeAgency: React.FunctionComponent = observer(() => {

    const store = useContext(StoreContext)

    let unsignedGms = store.User?.league?.franchiseSet.map((franchise: FranchiseTypeModelType) => franchise.gm?.trait).filter((trait: any) => trait===undefined).length;
    let unsignedCoaches = store.User?.league?.franchiseSet.map((franchise: FranchiseTypeModelType) => franchise.coach?.attributeOne).filter((attributeOne: any) => attributeOne===undefined).length

    if (store.User?.league == null)
        return <SmallLoading animation="ld ld-bounce"/>
    else if (unsignedGms > 0 || unsignedCoaches > 0)
        return (
        <div>
            <h3>Franchise Are Missing Staff</h3>
        </div>
        )
    else {
        return (
                <FreeAgentTable/>
        );
    }
})

export default FreeAgency;


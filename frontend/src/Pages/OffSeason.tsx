import React, {useContext, useEffect, useState} from 'react';
import {observer} from 'mobx-react'
import {FranchiseTypeModelType, StoreContext} from "../models";
import {Row, Col} from 'antd';
import SignPlayersButton from "./Molecules/SimulationButtons/SignPlayersButton";
import SetLineupsButton from "./Molecules/SimulationButtons/SetLineupsButton";
import LeagueStatus from "./Molecules/LeagueStatus";
import SmallLoading from "./Atoms/SmallLoading";
import SetStaffButton from "./Molecules/SimulationButtons/SetStaffButton";

export const OffSeason: React.FunctionComponent = observer(() => {

    const store = useContext(StoreContext)

    const [franchise, setFranchise] = useState<any>(store.User ? store.User.franchise : null);

    let unsignedGms = store.User?.league?.franchiseSet.map((franchise: FranchiseTypeModelType) => franchise.gm?.trait).filter((trait: any) => trait === undefined).length
    let unsignedCoaches = store.User?.league?.franchiseSet.map((franchise: FranchiseTypeModelType) => franchise.coach?.attributeOne).filter((attributeOne: any) => attributeOne === undefined).length


    useEffect(() => {
        if (store.User) {
            setFranchise(store.User.franchise)
        }
    }, [store.User])

    if (store.User?.league == null)
        return <SmallLoading animation="ld ld-bounce"/>
    else {
        return (
            <div>
                <Row>
                    <Col span={7} offset={0}>
                        <SetStaffButton/>
                    </Col>
                    <Col span={7} offset={1}>
                        <div>
                            {(unsignedGms > 0 || unsignedCoaches > 0) ?
                                <h1 className="ld ld-jump-alt-in" style={{textAlign: 'center'}}>
                                    Missing Staff
                                </h1>
                                :
                                <SignPlayersButton/>
                            }
                        </div>
                    </Col>
                    <Col span={7} offset={1}>
                        {(unsignedGms > 0 || unsignedCoaches > 0) ?
                            <h1 className="ld ld-jump-alt-in" style={{textAlign: 'center'}}>
                                Missing Staff
                            </h1>
                            :
                            <SetLineupsButton/>
                        }
                    </Col>
                </Row>
                <LeagueStatus/>
            </div>
        );
    }
})

export default OffSeason;


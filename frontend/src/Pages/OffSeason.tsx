import React, {useContext, useEffect, useState} from 'react';
import {observer} from 'mobx-react'
import {FranchiseTypeModelType, StoreContext} from "../models";
import {Row, Col} from 'antd';
import SignPlayersButton from "./Molecules/SimulationButtons/SignPlayersButton";
import SetLineupsButton from "./Molecules/SimulationButtons/SetLineupsButton";
import LeagueStatus from "./Molecules/LeagueStatus";
import SmallLoading from "./Atoms/Loading/SmallLoading";
import SetStaffButton from "./Molecules/SimulationButtons/SetStaffButton";
import MissingStaffError from "./Atoms/MissingStaffError";

export const OffSeason: React.FunctionComponent = observer(() => {

    const store = useContext(StoreContext)

    const [franchise, setFranchise] = useState<any>(store.User ? store.User.franchise : null);

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
                            {(store.User?.league?.franchisesWithoutGm.length > 0 || store.User?.league?.franchisesWithoutCoach.length > 0) ?
                                <MissingStaffError/>
                                :
                                <SignPlayersButton/>
                            }
                        </div>
                    </Col>
                    <Col span={7} offset={1}>
                        {(store.User?.league?.franchisesWithoutGm.length > 0 || store.User?.league?.franchisesWithoutCoach.length > 0) ?
                            <MissingStaffError/>
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


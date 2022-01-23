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
import introJs from "intro.js";

export const OffSeason: React.FunctionComponent = observer(() => {

    const store = useContext(StoreContext)

    const [franchise, setFranchise] = useState<any>(store.User ? store.User.franchise : null);

    useEffect(() => {
        if (store.User) {
            setFranchise(store.User.franchise)
        }
        if (store.User.franchise.seasonSet.length === 1) {
            introJs().start()
        }
    }, [store.User])



    if (store.User?.league == null)
        return <SmallLoading animation="ld ld-bounce"/>
    else {
        return (
            <div>
                <Row>
                    <Col span={7} offset={0}>
                        <div data-intro="Click to simulate bot staff signings"
                             data-step={1} className="card-demo">
                        <SetStaffButton/>
                        </div>
                    </Col>
                    <Col span={7} offset={1}>
                        <div>
                            {(store.User?.league?.franchisesWithoutGm.length > 0 || store.User?.league?.franchisesWithoutCoach.length > 0) ?
                                <MissingStaffError/>
                                :
                            <div data-intro="Click to simulate bot player signings"
                             data-step={2} className="card-demo">
                                <SignPlayersButton/>
                            </div>
                            }
                        </div>
                    </Col>
                    <Col span={7} offset={1}>
                        {(store.User?.league?.franchisesWithoutGm.length > 0 || store.User?.league?.franchisesWithoutCoach.length > 0) ?
                            <MissingStaffError/>
                            :
                            <div data-intro="Click to simulate bot roster lineups"
                             data-step={3} className="card-demo">
                            <SetLineupsButton/>
                            </div>
                        }
                    </Col>
                </Row>
                <div data-intro="This gives a status for each franchise. User edits can be made on the franchise page."
                             data-step={4} className="card-demo">
                <LeagueStatus/>
                </div>
            </div>
        );
    }
})

export default OffSeason;


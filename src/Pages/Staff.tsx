import React, {useContext, useEffect} from 'react';
import {observer} from 'mobx-react'
import {StoreContext} from "../models";
import StaffInfo from "./Molecules/StaffInfo";
import StaffSelect from "./Molecules/StaffSelect";
import SmallLoading from "./Atoms/Loading/SmallLoading";
import {Col, Row} from "antd";
import SetStaffButton from "./Molecules/SimulationButtons/SetStaffButton";
import introJs from "intro.js";

export const Staff: React.FunctionComponent = observer(() => {

    const store = useContext(StoreContext)

    useEffect(() => {
        if (store.User.franchise.seasonSet.length === 1) {
            introJs().start()
        }
    }, [])

    if (store.User.franchise == null)
        return <SmallLoading animation="ld ld-bounce"/>
    else {
        return (
            <div>
                <Row gutter={[0,24]}>
                    <Col span={24}>
                        <div data-intro="Each season you will sign a General Manager and Coach to help your team.
                        They have unique traits and attributes."
                             data-step={1} className="card-demo">
                        <StaffInfo/>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <div data-intro="Click here to simulate opponent staff signings." data-step={2} className="card-demo">
                        <SetStaffButton/>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <div data-intro="Please sign your staff. Then go to draft!" data-step={3} className="card-demo">
                        <StaffSelect/>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
})

export default Staff;


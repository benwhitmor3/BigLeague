import React, {useContext} from 'react';
import {observer} from 'mobx-react'
import {StoreContext} from "../models";
import StaffInfo from "./Molecules/StaffInfo";
import StaffSelect from "./Molecules/StaffSelect";
import SmallLoading from "./Atoms/Loading/SmallLoading";
import {Col, Row} from "antd";

export const Staff: React.FunctionComponent = observer(() => {

    const store = useContext(StoreContext)

    if (store.User.franchise == null)
        return <SmallLoading animation="ld ld-bounce"/>
    else {
        return (
            <div>
                <Row>
                    <Col span={24}>
                        <StaffInfo/>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <StaffSelect/>
                    </Col>
                </Row>
            </div>
        );
    }
})

export default Staff;


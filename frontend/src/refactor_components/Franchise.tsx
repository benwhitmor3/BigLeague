import React, {useContext} from 'react';
import {observer} from "mobx-react";
import {StoreContext} from "../models";
import {Statistic, Row, Col, Card} from 'antd';


export const Franchise: React.FunctionComponent = observer(() => {

        const store = useContext(StoreContext)

        if (store.User == undefined) return <div>loading</div>;
        else {
            return (
                <div>
                    <Row gutter={[0, 24]}>
                        <Col span={2} offset={0}>
                            <Statistic title="Franchise" value={store.User.franchise.franchise}/>
                        </Col>
                    </Row>
                    <Row gutter={[0, 24]}>
                        <Col span={2} offset={0}>
                            <Statistic title="Coach" value={store.User.franchise.coach.name}/>
                        </Col>
                        <Col span={4} offset={0}>
                            <Statistic title="Attributes"
                                       value={store.User.franchise.coach.attributeOne.toLowerCase() + ", " + store.User.franchise.coach.attributeTwo.toLowerCase()}/>
                        </Col>
                    </Row>
                    <Row gutter={[0, 24]}>
                        <Col span={2} offset={0}>
                            <Statistic title="General Manager" value={store.User.franchise.gm.trait.toLowerCase()}/>
                        </Col>
                    </Row>
                </div>
            );
        }
    }
)

export default Franchise;


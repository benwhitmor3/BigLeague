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
                    <Card title="Stadium" bordered={false} style={{width: "50%", height: "100%", float: "right"}}>
                        <Statistic title="Name" value={store.User.franchise.stadium.stadiumName}/>
                        <Statistic title="Seats" value={store.User.franchise.stadium.seats}/>
                        <Statistic title="Boxes" value={store.User.franchise.stadium.boxes}/>
                        <Statistic title="Grade" value={store.User.franchise.stadium.grade}/>
                        <Statistic title="Max Grade" value={store.User.franchise.stadium.maxGrade}/>
                    </Card>
                    <Row gutter={[0, 24]}>
                        <Statistic title="Franchise" value={store.User.franchise.franchise}/>
                    </Row>
                    <Row gutter={[0, 24]}>
                        <Col span={4} offset={0}>
                            <Statistic title="Coach" value={store.User.franchise.coach.name}/>
                        </Col>
                        <Col span={4} offset={0}>
                            <Statistic title="Attributes"
                                       value={store.User.franchise.coach.attributeOne.toLowerCase() + ", " + store.User.franchise.coach.attributeTwo.toLowerCase()}/>
                        </Col>
                    </Row>
                    <Row gutter={[0, 24]}>
                        <Statistic title="General Manager" value={store.User.franchise.gm.trait.toLowerCase()}/>
                    </Row>
                </div>
            );
        }
    }
)

export default Franchise;


import React, {useContext} from 'react';
import {observer} from 'mobx-react'
import {StoreContext} from "../models";
import {Statistic, Row, Col, Card} from 'antd';
import RosterTable from "./RosterTable";


export const Franchise: React.FunctionComponent = observer(() => {

    const store = useContext(StoreContext)

    if (store.User == undefined) return <div>loading</div>;
    else {
        return (
                <div className="site-card-wrapper">
                    <Row gutter={[24, 0]}>
                        <Col span={12}>
                            <Card bordered={false}
                                  key={store.User.franchise.id}
                                  style={{
                                      borderRadius: "8px",
                                      width: "100%",
                                      marginBottom: "20px",
                                      boxShadow: "0px 0px 4px 0px #D0D8F3",
                                  }}
                            >
                                <Row gutter={[0, 24]}>
                                    <Col span={8} offset={0}>
                                        <Statistic title="Franchise" value={store.User.franchise.franchise}/>
                                    </Col>
                                    <Col span={8} offset={0}>
                                        <Statistic title="City" value={store.User.franchise.stadium.city.city}/>
                                    </Col>
                                </Row>
                                <Row gutter={[0, 24]}>
                                    <Col span={24} offset={0}>
                                        <Statistic title="General Manager"
                                                   value={store.User.franchise.gm.trait.toLowerCase()}/>
                                    </Col>
                                </Row>
                                <Row gutter={[0, 0]}>
                                    <Col span={8} offset={0}>
                                        <Statistic title="Coach" value={store.User.franchise.coach.name}/>
                                    </Col>
                                    <Col span={8} offset={0}>
                                        <Statistic title="Attribute One"
                                                   value={store.User.franchise.coach.attributeOne.toLowerCase()}/>
                                    </Col>
                                    <Col span={8} offset={0}>
                                        <Statistic title="Attribute Two"
                                                   value={store.User.franchise.coach.attributeTwo.toLowerCase()}/>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                        <Col span={12}>
                            <Card bordered={false}
                                  key={store.User.franchise.id}
                                  style={{
                                      borderRadius: "8px",
                                      width: "100%",
                                      marginBottom: "20px",
                                      boxShadow: "0px 0px 4px 0px #D0D8F3",
                                  }}
                            >
                                <Row gutter={[0, 24]}>
                                    <Col span={8} offset={0}>
                                        <Statistic title="Stadium" value={store.User.franchise.stadium.stadiumName}/>
                                    </Col>
                                    <Col span={8} offset={0}>
                                        <Statistic title="Seats" value={store.User.franchise.stadium.seats}/>
                                    </Col>
                                    <Col span={8} offset={0}>
                                        <Statistic title="Boxes" value={store.User.franchise.stadium.boxes}/>
                                    </Col>
                                </Row>
                                <Row gutter={[0, 86]}>
                                    <Col span={8} offset={0}>
                                        <Statistic title="Grade" value={store.User.franchise.stadium.grade}/>
                                    </Col>
                                    <Col span={8} offset={0}>
                                        <Statistic title="Max Grade" value={store.User.franchise.stadium.maxGrade}/>
                                    </Col>
                                    <Col span={8} offset={0}>
                                        <Statistic title="Home Field Advantage"
                                                   value={store.User.franchise.stadium.homeFieldAdvantage}/>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                    </Row>
                <RosterTable/>
            </div>
        );
    }
})

export default Franchise;


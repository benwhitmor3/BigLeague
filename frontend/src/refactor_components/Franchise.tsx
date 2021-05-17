import React, {useContext, useEffect, useState} from 'react';
import {observer} from 'mobx-react'
import {StoreContext} from "../models";
import {Statistic, Row, Col, Card, Select, Spin} from 'antd';
import RosterTable from "./RosterTable";

const {Option} = Select;

export const Franchise: React.FunctionComponent = observer(() => {

    const store = useContext(StoreContext)

    const [franchise, setFranchise] = useState<any>(store.User ? store.User.franchise : null);

    useEffect(() => {
        if (store.User) {
            setFranchise(store.User.franchise)
        }
    }, [store.User])

    if (store.User == undefined)
        return <div><Spin size="large" /></div>;
    if (franchise == null)
        return <div><Spin size="large" /></div>;
    if (franchise.gm == null)
        return <span>Missing GM</span>
    if (franchise.stadium == null)
        return <span>Missing Stadium</span>
    if (franchise.coach == null)
        return <span>Missing Coach</span>
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
                                    <Select defaultValue={franchise.franchise} bordered={false}
                                            style={{
                                                width: "50%",
                                                borderRadius: "8px",
                                                fontSize: '24px',
                                                padding: '0.5rem',
                                            }}
                                            onChange={(franchise: string) => setFranchise(store.User.league.franchise(franchise))}
                                    >
                                        {store.User.franchise.league.franchiseSet.map((franchise: any) => (
                                                <Option key={franchise.franchise} value={franchise.franchise}>
                                                    {franchise.franchise}
                                                </Option>
                                            )
                                        )}
                                    </Select>
                                </Col>
                                <Col span={8} offset={0}>
                                    <Statistic title="City" value={franchise.stadium.city.city}/>
                                </Col>
                            </Row>
                            <Row gutter={[0, 24]}>
                                <Col span={24} offset={0}>
                                    <Statistic title="General Manager"
                                               value={franchise.gm.trait.toLowerCase()}/>
                                </Col>
                            </Row>
                            <Row gutter={[0, 0]}>
                                <Col span={8} offset={0}>
                                    <Statistic title="Coach" value={franchise.coach.name}/>
                                </Col>
                                <Col span={8} offset={0}>
                                    <Statistic title="Attribute One"
                                               value={franchise.coach.attributeOne.toLowerCase()}/>
                                </Col>
                                <Col span={8} offset={0}>
                                    <Statistic title="Attribute Two"
                                               value={franchise.coach.attributeTwo.toLowerCase()}/>
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
                                    <Statistic title="Stadium" value={franchise.stadium.stadiumName}/>
                                </Col>
                                <Col span={8} offset={0}>
                                    <Statistic title="Seats" value={franchise.stadium.seats}/>
                                </Col>
                                <Col span={8} offset={0}>
                                    <Statistic title="Boxes" value={franchise.stadium.boxes}/>
                                </Col>
                            </Row>
                            <Row gutter={[0, 86]}>
                                <Col span={8} offset={0}>
                                    <Statistic title="Grade" value={franchise.stadium.grade}/>
                                </Col>
                                <Col span={8} offset={0}>
                                    <Statistic title="Max Grade" value={franchise.stadium.maxGrade}/>
                                </Col>
                                <Col span={8} offset={0}>
                                    <Statistic title="Home Field Advantage"
                                               value={franchise.stadium.homeFieldAdvantage}/>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
                <Row gutter={[24, 0]}>
                    <Col span={24}>
                        <Card bordered={false}
                              key={franchise.id}
                              style={{
                                  borderRadius: "8px",
                                  width: "100%",
                                  marginBottom: "20px",
                                  boxShadow: "0px 0px 4px 0px #D0D8F3",
                              }}>
                            <Row gutter={[0, 0]}>
                                <Col span={4} offset={0}>
                                    <Statistic title="Suit bonus" value={franchise.suitBonus}/>
                                </Col>
                                <Col span={4} offset={0}>
                                    <Statistic title="Starting EPV" precision={2} value={franchise.epv}/>
                                </Col>
                                <Col span={4} offset={0}>
                                    <Statistic title="Mean Age" precision={2} value={franchise.meanAge}/>
                                </Col>
                                <Col span={4} offset={0}>
                                    <Statistic title="Salaries" prefix={'$'} precision={2}
                                               value={franchise.salaries}/>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>


                <RosterTable franchise={franchise}/>
            </div>
        );
    }
})

export default Franchise;


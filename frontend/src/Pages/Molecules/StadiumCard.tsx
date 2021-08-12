import React, {useContext} from 'react';
import {observer} from 'mobx-react'
import {StoreContext} from "../../models";
import {Statistic, Row, Col, Card} from 'antd';

interface IFranchise {
    franchise: any;
}

export const StadiumCard: React.FunctionComponent<IFranchise> = observer(({franchise}: IFranchise) => {

    const store = useContext(StoreContext)

        return (
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
                            <Statistic title="Stadium"
                                       value={franchise.stadium ? franchise.stadium.stadiumName : "None"}/>
                        </Col>
                        <Col span={8} offset={0}>
                            <Statistic title="Seats"
                                       value={franchise.stadium ? franchise.stadium.seats : "None"}/>
                        </Col>
                        <Col span={8} offset={0}>
                            <Statistic title="Boxes"
                                       value={franchise.stadium ? franchise.stadium.boxes : "None"}/>
                        </Col>
                    </Row>
                    <Row gutter={[0, 86]}>
                        <Col span={8} offset={0}>
                            <Statistic title="Grade"
                                       value={franchise.stadium ? franchise.stadium.grade : "None"}/>
                        </Col>
                        <Col span={8} offset={0}>
                            <Statistic title="Max Grade"
                                       value={franchise.stadium ? franchise.stadium.maxGrade : "None"}/>
                        </Col>
                        <Col span={8} offset={0}>
                            <Statistic title="Home Field Advantage"
                                       value={franchise.stadium ? franchise.stadium.homeFieldAdvantage : "None"}/>
                        </Col>
                    </Row>
                </Card>
        );
})

export default StadiumCard;


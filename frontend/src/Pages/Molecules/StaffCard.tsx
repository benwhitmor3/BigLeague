import React, {useContext} from 'react';
import {observer} from 'mobx-react'
import {StoreContext} from "../../models";
import {Statistic, Row, Col, Card, Select} from 'antd';

const {Option} = Select;

interface IFranchise {
    franchise: any;
    setFranchise: any;
}

export const StaffCard: React.FunctionComponent<IFranchise> = observer(({franchise, setFranchise}: IFranchise) => {

    const store = useContext(StoreContext)

    return (
            <Card bordered={false}
                  key={franchise.id}
                  style={{
                      borderRadius: "8px",
                      width: "100%",
                      marginBottom: "20px",
                      boxShadow: "0px 0px 4px 0px #D0D8F3",
                  }}
            >
                <Row gutter={[0, 24]}>
                    <Col span={12} offset={0}>
                        <Select defaultValue={franchise.franchise} bordered={false}
                                style={{
                                    width: "80%",
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
                    <Col span={8} offset={4}>
                        <Statistic title="City"
                                   value={franchise.stadium ? franchise.stadium.city.city : "None"}/>
                    </Col>
                </Row>
                <Row gutter={[0, 24]}>
                    <Col span={24} offset={0}>
                        <Statistic title="General Manager"
                                   value={franchise.gm ? franchise.gm.trait.toLowerCase() : "None"}/>
                    </Col>
                </Row>
                <Row gutter={[0, 0]}>
                    <Col span={8} offset={0}>
                        <Statistic title="Coach" value={franchise.coach ? franchise.coach.name : "None"}/>
                    </Col>
                    <Col span={8} offset={0}>
                        <Statistic title="Attribute One"
                                   value={franchise.coach ? franchise.coach.attributeOne.toLowerCase() : "None"}/>
                    </Col>
                    <Col span={8} offset={0}>
                        <Statistic title="Attribute Two"
                                   value={franchise.coach ? franchise.coach.attributeTwo.toLowerCase() : "None"}/>
                    </Col>
                </Row>
            </Card>
    );
})

export default StaffCard;


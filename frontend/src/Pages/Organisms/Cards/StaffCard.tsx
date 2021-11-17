import React, {useContext} from 'react';
import {observer} from 'mobx-react'
import {StoreContext} from "../../../models";
import {Statistic, Row, Col, Card, Select} from 'antd';
import {cardStyles} from "./CardStyles";

const {Option} = Select;

interface IFranchise {
    franchise: any;
    setFranchise: any;
}

export const StaffCard: React.FunctionComponent<IFranchise> = observer(({franchise, setFranchise}: IFranchise) => {

    const store = useContext(StoreContext)

    return (
        <div>
            <Card bordered={false}
                  key={franchise.id}
                  style={cardStyles}
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
                    <Col span={6} offset={6}>
                        <Statistic title="City"
                                   value={franchise.stadium ? franchise.stadium.city.city : "None"}/>
                    </Col>
                </Row>
                <Row gutter={[0, 0]}>
                    <Col span={6} offset={0}>
                        <Statistic title="General Manager"
                                   value={franchise.gm ? franchise.gm.trait.toLowerCase() : "None"}/>
                    </Col>
                    <Col span={6} offset={0}>
                        <Statistic title="Coach" value={franchise.coach ? franchise.coach.name : "None"}/>
                    </Col>
                    <Col span={6} offset={0}>
                        <Statistic title="Attribute One"
                                   value={franchise.coach ? franchise.coach.attributeOne.toLowerCase() : "None"}/>
                    </Col>
                    <Col span={6} offset={0}>
                        <Statistic title="Attribute Two"
                                   value={franchise.coach ? franchise.coach.attributeTwo.toLowerCase() : "None"}/>
                    </Col>
                </Row>
            </Card>
        </div>
    );
})

export default StaffCard;


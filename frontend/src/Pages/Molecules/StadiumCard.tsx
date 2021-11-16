import React, {useContext, useState} from 'react';
import {observer} from 'mobx-react'
import {FranchiseTypeModelType, StoreContext} from "../../models";
import {Statistic, Row, Col, Card, Tag, Space} from 'antd';
import {EditOutlined} from "@ant-design/icons";
import EditStadiumModal from "./Modals/EditStadiumModal";
import StadiumIcon from "../Atoms/StadiumIcon";

interface IFranchise {
    franchise: FranchiseTypeModelType;
}

export const StadiumCard: React.FunctionComponent<IFranchise> = observer(({franchise}: IFranchise) => {

    const store = useContext(StoreContext)
    const [editStadiumVisible, setEditStadiumVisible] = useState<boolean>(false)

    return (
        <div>
            <EditStadiumModal editStadiumVisible={editStadiumVisible}
                                  setEditStadiumVisible={setEditStadiumVisible}/>
                <Row gutter={[0, 24]}>
                    <Col span={24}>
                        <Card bordered={false}
                              key={franchise.id}
                              style={{boxShadow: 'rgba(9, 30, 66, 0.2) 0px 1px 1px, rgba(9, 30, 66, 0.1) 0px 0px 1px 1px'}}
                        >
                            <Row gutter={[0, 24]}>
                                <Col span={8} offset={0}>
                                    <Statistic title="Stadium" value={franchise.stadium.stadiumName}/>
                                </Col>
                                <Col span={8} offset={0}>
                                    <Statistic title="Seats" value={franchise.stadium.seats}/>
                                </Col>
                                <Col span={6} offset={0}>
                                    <Statistic title="Boxes" value={franchise.stadium.boxes}/>
                                </Col>
                                <Col span={2} offset={0}>
                                    <Space size="middle">
                                        <Tag icon={<EditOutlined/>}
                                             color={"#eeeeee"}
                                             style={{color: "#000000", border: "3px solid #eeeeee", cursor: "pointer"}}
                                             onClick={() => {
                                                 setEditStadiumVisible(true)
                                             }}>
                                            Edit
                                        </Tag>
                                    </Space>
                                </Col>
                            </Row>
                            <Row gutter={[0, 0]}>
                                <Col span={8} offset={0}>
                                    <Statistic title="Grade" value={franchise.stadium.grade}/>
                                </Col>
                                <Col span={8} offset={0}>
                                    <Statistic title="Max Grade" value={franchise.stadium.maxGrade}/>
                                </Col>
                                <Col span={6} offset={0}>
                                    <Statistic title="Home Field Advantage"
                                               value={franchise.stadium.homeFieldAdvantage}/>
                                </Col>
                                <Col span={2} offset={0}>
                                        <StadiumIcon/>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
        </div>
    );
})

export default StadiumCard;


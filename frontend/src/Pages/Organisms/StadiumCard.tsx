import React, {useContext, useState} from 'react';
import {observer} from 'mobx-react'
import {StoreContext} from "../../models";
import {Statistic, Row, Col, Card, Spin, Tag, Space} from 'antd';
import {EditOutlined} from "@ant-design/icons";
import EditStadiumModal from "../Molecules/EditStadiumModal";

export const StadiumCard: React.FunctionComponent = observer(() => {

    const store = useContext(StoreContext)

    const [editStadiumVisible, setEditStadiumVisible] = useState<boolean>(false)

    if (store.User == undefined)
        return <div><Spin size="large" /></div>;
    else {
        return (
            <div>
                <EditStadiumModal editStadiumVisible={editStadiumVisible} setEditStadiumVisible={setEditStadiumVisible}/>
                <Row gutter={[0, 24]}>
                    <Col span={24}>
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
                                <Col span={6} offset={0}>
                                    <Statistic title="Boxes" value={store.User.franchise.stadium.boxes}/>
                                </Col>
                                <Col span={2} offset={0}>
                                    <Space size="middle">
                                        <Tag icon={<EditOutlined/>}
                                             color={"#eeeeee"} style={{color: "#000000", border: "3px solid #eeeeee", cursor: "pointer"}}
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
            </div>
        );
    }
})

export default StadiumCard;


import React, {useContext, useState} from 'react';
import {observer} from 'mobx-react'
import {StoreContext} from "../../models";
import {Statistic, Row, Col, Card, Spin, Tag, Space} from 'antd';
import {EditOutlined} from "@ant-design/icons";
import EditStadiumModal from "../Molecules/Modals/EditStadiumModal";
import StadiumIcon from "../Atoms/StadiumIcon";
import {cardStyles} from "../Molecules/Create/CreateStyles";


// NOT USED AT THE MOMENT

export const StadiumCard: React.FunctionComponent = observer(() => {

    const store = useContext(StoreContext)

    const [editStadiumVisible, setEditStadiumVisible] = useState<boolean>(false)

    if (store.User == undefined)
        return <div><Spin size="large"/></div>;
    else {
        return (
            <div>
                <EditStadiumModal editStadiumVisible={editStadiumVisible}
                                  setEditStadiumVisible={setEditStadiumVisible}/>
                <Row gutter={[0, 24]}>
                    <Col span={24}>
                        <Card bordered={false}
                              key={store.User.franchise.id}
                              style={{...{boxShadow: 'rgba(9, 30, 66, 0.2) 0px 1px 1px, rgba(9, 30, 66, 0.1) 0px 0px 1px 1px'}, ...{cardStyles}}}
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
                                    <Statistic title="Grade" value={store.User.franchise.stadium.grade}/>
                                </Col>
                                <Col span={8} offset={0}>
                                    <Statistic title="Max Grade" value={store.User.franchise.stadium.maxGrade}/>
                                </Col>
                                <Col span={6} offset={0}>
                                    <Statistic title="Home Field Advantage"
                                               value={store.User.franchise.stadium.homeFieldAdvantage}/>
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
    }
})

export default StadiumCard;


import React, {useContext} from 'react';
import 'antd/dist/antd.css';
import {Card, Col, Row, Statistic, Badge, Divider} from 'antd';
import {observer} from "mobx-react";
import {FranchiseTypeModelType, StoreContext} from "../../models";


export const unsignedPlayer = (franchise: FranchiseTypeModelType) => {
    if (franchise.unsignedPlayers.length > 0)
        return "Unsigned Players " + franchise.unsignedPlayers.length
    else {
        return "All Signed"
    }
};

export const unsignedPlayerColor = (franchise: FranchiseTypeModelType) => {
    if (franchise.unsignedPlayers.length > 0)
        return "red"
    else {
        return "green"
    }
};

export const unsetPlayers = (franchise: FranchiseTypeModelType) => {
    if (franchise.unsetPlayers.length > 0)
        return "Unset Players " + franchise.unsetPlayers.length
    else {
        return "All Set"
    }
};

export const unsetPlayerColor = (franchise: FranchiseTypeModelType) => {
    if (franchise.unsetPlayers.length > 0)
        return "red"
    else {
        return "green"
    }
};

export const LeagueStatus: React.FunctionComponent = observer(() => {

        const store = useContext(StoreContext)


        return (
            <div>
                {store.User.league.franchiseSet.map((franchise: FranchiseTypeModelType) => {
                        return (
                            <div>
                                <Divider/>
                                <Row gutter={[0, 24]}>
                                    <Col span={7} offset={0}>
                                        <Card bordered={false}
                                              key={franchise.id}
                                              style={{
                                                  borderRadius: "8px",
                                                  width: "100%",
                                                  marginBottom: "20px",
                                                  boxShadow: "0px 0px 4px 0px #D0D8F3",
                                              }}
                                        >
                                            <Statistic title="Franchise"
                                                       value={franchise ? franchise?.franchise : "None"}/>
                                        </Card>
                                    </Col>
                                    <Col span={7} offset={1}>
                                        <Badge.Ribbon color={unsignedPlayerColor(franchise)} text={unsignedPlayer(franchise)}>
                                                                                    <Card bordered={false}
                                              key={franchise.id}
                                              style={{
                                                  borderRadius: "8px",
                                                  width: "100%",
                                                  marginBottom: "20px",
                                                  boxShadow: "0px 0px 4px 0px #D0D8F3",
                                              }}
                                        >
                                            <Statistic title="General Manager"
                                                       value={franchise.gm ? franchise?.gm?.trait?.toLowerCase() : "None"}/>
                                                                                    </Card>
                                        </Badge.Ribbon>
                                    </Col>
                                    <Col span={7} offset={1}>
                                        <Badge.Ribbon color={unsetPlayerColor(franchise)} text={unsetPlayers(franchise)}>
                                                                                    <Card bordered={false}
                                              key={franchise.id}
                                              style={{
                                                  borderRadius: "8px",
                                                  width: "100%",
                                                  marginBottom: "20px",
                                                  boxShadow: "0px 0px 4px 0px #D0D8F3",
                                              }}
                                        >
                                            <Statistic title="Coach"
                                                       value={franchise.coach ? franchise.coach?.name?.toLowerCase() : "None"}/>
                                                                                    </Card>
                                        </Badge.Ribbon>
                                    </Col>
                                </Row>
                            </div>
                        )
                    }
                )
                }
            </div>
        )
    }
)

export default LeagueStatus;
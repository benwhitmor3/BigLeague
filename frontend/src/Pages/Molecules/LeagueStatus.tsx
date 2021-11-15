import React, {useContext, useEffect, useState} from 'react';
import 'antd/dist/antd.css';
import {Card, Col, Row, Statistic, Badge, Divider} from 'antd';
import {observer} from "mobx-react";
import {FranchiseTypeModelType, StoreContext} from "../../models";
import {useTrail, animated} from 'react-spring'


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
    else if (franchise.starters.length !== 5) {
        return "Missing " + (5 - franchise.starters.length) + " Starters"
    } else {
        return "All Set"
    }
};

export const unsetPlayerColor = (franchise: FranchiseTypeModelType) => {
    if (franchise.unsetPlayers.length > 0)
        return "red"
    else if (franchise.starters.length !== 5) {
        return "red"
    } else {
        return "green"
    }
};

export const LeagueStatus: React.FunctionComponent = observer(() => {

        const store = useContext(StoreContext)

         useEffect(() => {
            // used for animation of draft order
            const timer = setTimeout(() => {
                toggle(true)
            }, 100);
            return () => clearTimeout(timer);
        }, []);

        // used for animation of franchises
        const [on, toggle] = useState(false);
        const springs = useTrail(store.User.league.franchiseSet.length, {
            to: {opacity: on ? 1 : 0.5},
            config: {tension: 300}
        });

        return (
            <Col span={24}>
                {springs.map((animation, index) => (
                        <animated.div style={{
                            ...animation
                        }}
                                      key={index}>
                            <Divider/>
                                <Row>
                                    <Col span={7} offset={0}>
                                        <Card bordered={false}
                                              key={store.User.league.franchiseSet[index].id}
                                              style={{
                                                  borderRadius: "8px",
                                                  width: "100%",
                                                  marginBottom: "10px",
                                                  boxShadow: "0px 0px 4px 0px #D0D8F3",
                                              }}
                                        >
                                            <Statistic title="Franchise"
                                                       value={store.User.league.franchiseSet[index] ? store.User.league.franchiseSet[index].franchise : "None"}/>
                                        </Card>
                                    </Col>
                                    <Col span={7} offset={1}>
                                        <Badge.Ribbon color={unsignedPlayerColor(store.User.league.franchiseSet[index])} text={unsignedPlayer(store.User.league.franchiseSet[index])}>
                                            <Card bordered={false}
                                                  key={store.User.league.franchiseSet[index].id}
                                                  style={{
                                                      borderRadius: "8px",
                                                      width: "100%",
                                                      marginBottom: "10px",
                                                      boxShadow: "0px 0px 4px 0px #D0D8F3",
                                                  }}
                                            >
                                                <Statistic title="General Manager"
                                                           value={store.User.league.franchiseSet[index].gm ? store.User.league.franchiseSet[index]?.gm?.trait?.toLowerCase() : "None"}/>
                                            </Card>
                                        </Badge.Ribbon>
                                    </Col>
                                    <Col span={7} offset={1}>
                                        <Badge.Ribbon color={unsetPlayerColor(store.User.league.franchiseSet[index])} text={unsetPlayers(store.User.league.franchiseSet[index])}>
                                            <Card bordered={false}
                                                  key={store.User.league.franchiseSet[index].id}
                                                  style={{
                                                      borderRadius: "8px",
                                                      width: "100%",
                                                      marginBottom: "10px",
                                                      boxShadow: "0px 0px 4px 0px #D0D8F3",
                                                  }}
                                            >
                                                <Statistic title="Coach"
                                                           value={store.User.league.franchiseSet[index].coach ? store.User.league.franchiseSet[index].coach?.name?.toLowerCase() : "None"}/>
                                            </Card>
                                        </Badge.Ribbon>
                                    </Col>
                                </Row>
                        </animated.div>
                    ))}
                    )
            </Col>
        )
    }
)

export default LeagueStatus;
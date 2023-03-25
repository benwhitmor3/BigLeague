import React, {useContext, useEffect, useState} from 'react';
import 'antd/dist/antd.css';
import {Card, Col, Row, Statistic, Badge, Divider} from 'antd';
import {observer} from "mobx-react";
import {FranchiseTypeModelType, StoreContext} from "../../models";
import MissingStartersIcon from "../Atoms/Icons/MissingStartersIcon";
import StartersIcon from "../Atoms/Icons/StartersIcon";
import UnsetPlayerIcon from "../Atoms/Icons/UnsetPlayerIcon";
import UnsignedPlayerIcon from "../Atoms/Icons/UnsignedPlayerIcon";
import SignedPlayerIcon from "../Atoms/Icons/SignedPlayerIcon";


export const missingStaff = (franchise: FranchiseTypeModelType) => {
    if (!franchise.gm?.trait || !franchise.coach?.attributeOne)
        return "Missing Staff"
    else {
        return "Staff Signed"
    }
};

export const missingStaffColor = (franchise: FranchiseTypeModelType) => {
    if (!franchise.gm?.trait || !franchise.coach?.attributeOne)
        return "#EB5E55"
    else {
        return "#71C544"
    }
};

export const unsignedPlayer = (franchise: FranchiseTypeModelType) => {
    if (franchise.unsignedPlayers.length > 0)
        return "Unsigned Players " + franchise.unsignedPlayers.length
    else {
        return "All Signed"
    }
};

export const unsignedPlayerColor = (franchise: FranchiseTypeModelType) => {
    if (franchise.unsignedPlayers.length > 0)
        return "#EB5E55"
    else {
        return "#71C544"
    }
};

export const unsignedPlayerLogic = (franchise: FranchiseTypeModelType) => {
    if (franchise.unsignedPlayers.length > 0)
        return (
            <UnsignedPlayerIcon/>
        )
    else {
        return <SignedPlayerIcon/>
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
        return "#EB5E55"
    else if (franchise.starters.length !== 5) {
        return "#EB5E55"
    } else {
        return "#71C544"
    }
};

export const unsetPlayerLogic = (franchise: FranchiseTypeModelType) => {
    if (franchise.unsetPlayers.length > 0)
        return <UnsetPlayerIcon/>
    else if (franchise.starters.length !== 5) {
        return <MissingStartersIcon/>
    } else {
        return <StartersIcon/>
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
        // const springs = useTrail(store.User.league.franchiseSet.length, {
        //     to: {opacity: on ? 1 : 0.5},
        //     config: {tension: 300}
        // });

        return (
            <Col span={24}>
                {store.User.league.franchiseSet.map((franchise: any) => (
                        <Row>
                            <Col span={7} offset={0}>
                                 <Badge.Ribbon color={missingStaffColor(franchise)}
                                              text={missingStaff(franchise)}>
                                <Card bordered={false}
                                      key={franchise.id}
                                      style={{boxShadow: 'rgba(9, 30, 66, 0.2) 0px 1px 1px, rgba(9, 30, 66, 0.1) 0px 0px 1px 1px'}}
                                >
                                    <Statistic title="Franchise"
                                               value={franchise ? franchise.franchise : "None"}/>
                                </Card>
                                 </Badge.Ribbon>
                            </Col>
                            <Col span={7} offset={1}>
                                <Badge.Ribbon color={unsignedPlayerColor(franchise)}
                                              text={unsignedPlayer(franchise)}>
                                    <Card bordered={false}
                                          key={franchise.id}
                                          style={{boxShadow: 'rgba(9, 30, 66, 0.2) 0px 1px 1px, rgba(9, 30, 66, 0.1) 0px 0px 1px 1px'}}
                                    >
                                        <Row>
                                            <Col span={12}>
                                                <Statistic title="General Manager"
                                                           value={franchise.gm ? franchise?.gm?.trait?.toLowerCase() : "None"}/>
                                            </Col>
                                            <Col span={12}>
                                                {unsignedPlayerLogic(franchise)}
                                            </Col>
                                        </Row>
                                    </Card>
                                </Badge.Ribbon>
                            </Col>
                            <Col span={7} offset={1}>
                                <Badge.Ribbon color={unsetPlayerColor(franchise)}
                                              text={unsetPlayers(franchise)}>
                                    <Card bordered={false}
                                          key={franchise.id}
                                          style={{boxShadow: 'rgba(9, 30, 66, 0.2) 0px 1px 1px, rgba(9, 30, 66, 0.1) 0px 0px 1px 1px'}}>
                                        <Row>
                                            <Col span={12}>
                                                <Statistic title="Coach"
                                                           value={franchise.coach ? franchise.coach?.name?.toLowerCase() : "None"}/>
                                            </Col>
                                            <Col span={12}>
                                                {unsetPlayerLogic(franchise)}
                                            </Col>
                                        </Row>
                                    </Card>
                                </Badge.Ribbon>
                            </Col>
                        </Row>
                ))}
            </Col>
        )
    }
)

export default LeagueStatus;

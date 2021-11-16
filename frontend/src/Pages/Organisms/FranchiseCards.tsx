import React from 'react';
import {observer} from 'mobx-react'
import {Row, Col} from 'antd';
import RosterTable from "./RosterTable";
import StaffCard from "../Molecules/StaffCard";
import StadiumCard from "../Molecules/StadiumCard";
import LineupStatsCard from "../Molecules/LineupStatsCard";
import ActionTable from "./ActionTable";
import TicketTable from "./Tables/TicketTable";
import {FranchiseTypeModelType} from "../../models";
import CreateStadium from "../Molecules/Create/CreateStadium";

interface IFranchise {
    franchise: FranchiseTypeModelType;
    setFranchise: any;
}

export const FranchiseCards: React.FunctionComponent<IFranchise> = observer(({franchise, setFranchise}: IFranchise) => {

    return (
        <div>
            {franchise.stadium ?
                <div>
                <Row gutter={[24, 0]}>
                    <Col span={12}>
                        <StaffCard franchise={franchise} setFranchise={setFranchise}/>
                    </Col>
                    <Col span={12}>
                        <StadiumCard franchise={franchise}/>
                    </Col>
                </Row>
                <Row gutter={[24, 0]}>
                    <Col span={12}>
                        <ActionTable franchise={franchise}/>
                    </Col>
                    <Col span={12}>
                        <TicketTable franchise={franchise}/>
                    </Col>
                </Row>
                </div>
                :
                <CreateStadium/>
            }
            <Row gutter={[24, 0]}>
                <Col span={24}>
                    <LineupStatsCard franchise={franchise}/>
                </Col>
            </Row>
            <Row gutter={[0, 24]}>
                <Col span={24}>
                    <RosterTable franchise={franchise}/>
                </Col>
            </Row>
            {/*<Row gutter={[24, 0]}>*/}
            {/*    <Col span={24}>*/}
            {/*        <ActionTable franchise={franchise}/>*/}
            {/*    </Col>*/}
            {/*</Row>*/}
        </div>
    );
})

export default FranchiseCards;


import React from 'react';
import {observer} from 'mobx-react'
import {Row, Col} from 'antd';
import RosterTable from "./RosterTable";
import StaffCard from "../Molecules/StaffCard";
import StadiumCard from "../Molecules/StadiumCard";
import LineupStatsCard from "../Molecules/LineupStatsCard";
import ActionTable from "./ActionTable";

interface IFranchise {
    franchise: any;
    setFranchise: any;
}

export const FranchiseCards: React.FunctionComponent<IFranchise> = observer(({franchise, setFranchise} : IFranchise) => {

    return (
        <div className="site-card-wrapper">
            <Row gutter={[24, 0]}>
                <Col span={12}>
                <StaffCard franchise={franchise} setFranchise={setFranchise}/>
                </Col>
                <Col span={12}>
                <StadiumCard franchise={franchise}/>
                </Col>
            </Row>
            <Row gutter={[24, 0]}>
                <Col span={24}>
                    <LineupStatsCard franchise={franchise}/>
                </Col>
            </Row>
            <RosterTable franchise={franchise}/>
            <ActionTable franchise={franchise}/>
        </div>
    );
})

export default FranchiseCards;


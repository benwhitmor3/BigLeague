import React from 'react';
import {observer} from 'mobx-react'
import {Row, Col} from 'antd';
import RosterTable from "../Organisms/Tables/RosterTable";
import StaffCard from "../Organisms/Cards/StaffCard";
import StadiumCard from "../Organisms/Cards/StadiumCard";
import LineupStatsCard from "../Organisms/Cards/LineupStatsCard";
import ActionTable from "../Organisms/Tables/ActionTable";
import TicketTable from "../Organisms/Tables/TicketTable";
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
                    <Row>
                        <Col span={24}>
                            <TicketTable franchise={franchise}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <ActionTable franchise={franchise}/>
                        </Col>
                    </Row>
                </div>
                :
                <CreateStadium/>
            }
            <Row >
                <Col span={24} style={{marginTop: '20px', marginBottom: '20px'}}>
                    <LineupStatsCard franchise={franchise}/>
                </Col>
            </Row>
            <Row gutter={[0, 24]}>
                <Col span={24}>
                    <RosterTable franchise={franchise}/>
                </Col>
            </Row>
        </div>
    );
})

export default FranchiseCards;


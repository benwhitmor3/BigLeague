import React, {useEffect} from 'react';
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
import introJs from "intro.js";
import 'intro.js/introjs.css';

interface IFranchise {
    franchise: FranchiseTypeModelType;
    setFranchise: any;
}

export const FranchiseCards: React.FunctionComponent<IFranchise> = observer(({franchise, setFranchise}: IFranchise) => {

    useEffect(() => {
        // if first season show tutorial
        if (franchise.seasonSet.length === 1) {
            introJs().start()
        }
    }, [franchise.stadium, franchise.seasonSet])

    return (
        <div>
            {franchise.stadium ?
                <div>
                    <Row gutter={[24, 0]}>
                        <Col span={12}>
                            <div data-intro="Here is a snapshot of your franchise. Click on the arrow
                            to select a different franchise to view." data-step={2} className="card-demo">
                            <div data-intro="You currently have no staff. Please go to the Staff page to sign them."
                                 data-step={7} className="card-demo">
                                <StaffCard franchise={franchise} setFranchise={setFranchise}/>
                            </div>
                            </div>
                        </Col>
                        <Col span={12}>
                            <div
                                data-intro="Congratulations! Your stadium has been built. To renovate the stadium or
                                reconfigure seating click the edit button."
                                data-step={1} className="card-demo">
                                <StadiumCard franchise={franchise}/>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <div data-intro="Franchise statistics are displayed here. Each season you will need to set
                            advertising and prices. Choose wisely!"
                            data-step={3} className="card-demo">
                                <TicketTable franchise={franchise}/>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <div data-intro="Each season you will have actions available. Your GM will determine how
                            many are available to you. They can help you win games, improve your stadium,
                            and make money." data-step={4} className="card-demo">
                                <ActionTable franchise={franchise}/>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                <Col span={24} style={{marginTop: '20px', marginBottom: '20px'}}>
                    <div data-intro="Team stats will be calculated here." data-step={6} className="card-demo">
                        <LineupStatsCard franchise={franchise}/>
                    </div>
                </Col>
            </Row>
            <Row gutter={[0, 24]}>
                <Col span={24}>
                    <div data-intro="Your team roster. Contracts and lineups will be set here." data-step={5} className="card-demo"
                         >
                        <RosterTable franchise={franchise}/>
                    </div>
                </Col>
            </Row>
                </div>
                :
                        <CreateStadium/>
            }
        </div>
    );
})

export default FranchiseCards;


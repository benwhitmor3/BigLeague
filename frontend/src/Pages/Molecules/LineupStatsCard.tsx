import React from 'react';
import {observer} from 'mobx-react'
import {Statistic, Row, Col, Card} from 'antd';

interface IFranchise {
    franchise: any;
}

export const LineupStatsCard: React.FunctionComponent<IFranchise> = observer(({franchise}: IFranchise) => {

    return (
        <div>
        <Card bordered={false}
              key={franchise.id}
              style={{boxShadow: 'rgba(9, 30, 66, 0.2) 0px 1px 1px, rgba(9, 30, 66, 0.1) 0px 0px 1px 1px', marginBottom: '20px'}}>
            <Row gutter={[0, 0]}>
                <Col span={4} offset={0}>
                    {(franchise.gm?.trait === 'SUITOR')
                            ?
                            <Statistic title="Suit bonus" value={franchise.suitBonus + ' (zero)'}/>
                            :
                            <Statistic title="Suit bonus" value={franchise.suitBonus}/>
                    }
                </Col>
                <Col span={4} offset={0}>
                    {(franchise.gm?.trait === 'SCOUTER')
                            ?
                            <Statistic title="Starting S EPV" precision={2} value={franchise.sEpv}/>
                            :
                            <Statistic title="Starting EPV" precision={2} value={franchise.epv}/>
                    }
                </Col>
                <Col span={4} offset={0}>
                    <Statistic title="Mean Age" precision={2} value={franchise.meanAge}/>
                </Col>
                <Col span={4} offset={0}>
                    <Statistic title="Salaries" prefix={'$'} precision={2}
                               value={franchise.salaries}/>
                </Col>
            </Row>
        </Card>
        </div>
    );
})

export default LineupStatsCard;


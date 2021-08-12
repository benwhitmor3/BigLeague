import React, {useContext, useEffect, useState} from 'react';
import {observer} from 'mobx-react'
import {StoreContext} from "../models";
import {Statistic, Row, Col, Card, Select, Spin, Button} from 'antd';
import CSS from "csstype";


const buttonStyles: CSS.Properties = {
    backgroundColor: '#ad2102',
    border: '0px',
    borderRadius: '12px',
    fontSize: '14px',
    color: '#fff2e8',
    width: '20vh',
};

export const OffSeason: React.FunctionComponent = observer(() => {

    const store = useContext(StoreContext)

    const [franchise, setFranchise] = useState<any>(store.User ? store.User.franchise : null);
    const [gmId, setGmId] = useState<string>('');
    const [coachId, setCoachId] = useState<string>('');

    const onSubmit = (franchise: any, gmId: string, coachId: string) => {
            store.mutateUpdateFranchise({
                    "franchiseInput": {
                        "franchise": franchise.id,
                        "gmId": gmId,
                        "coachId": coachId,
                    },
                },
                `
                franchise{
                    __typename
                  id
                  franchise
                  gm{
                    __typename
                    id
                    trait
                  }
                  coach{
                    __typename
                    id
                    name
                  }
                }
                `,
                undefined
            )
        };

    useEffect(() => {
        if (store.User) {
            setFranchise(store.User.franchise)
        }
    }, [store.User])

    if (franchise == null)
        return <Spin/>
    else {
        return (
            <div className="site-card-wrapper">
                <Row gutter={[24, 0]}>
                    <Col span={12}>
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
                                <Col span={24} offset={0}>
                                    <Statistic title="General Manager"
                                               value={franchise.gm ? franchise.gm.trait.toLowerCase() : "None"}/>
                                </Col>
                            </Row>
                            <Row gutter={[0, 0]}>
                                <Col span={8} offset={0}>
                                    <Statistic title="Coach" value={franchise.coach ? franchise.coach.name : "None"}/>
                                </Col>
                                <Col span={8} offset={0}>
                                    <Statistic title="Attribute One"
                                               value={franchise.coach ? franchise.coach.attributeOne.toLowerCase() : "None"}/>
                                </Col>
                                <Col span={8} offset={0}>
                                    <Statistic title="Attribute Two"
                                               value={franchise.coach ? franchise.coach.attributeTwo.toLowerCase() : "None"}/>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>

                {/*TODO: MAKE THESE A TABLE WITH SIGNING MAYBE, SAME AS DRAFT OR ROSTER?*/}
                <Select style={{width: '30%'}} options={store.User.league.gmSet.map((gm: any) => {
                            return {value: gm.id, label: gm.trait}})}
                            value={gmId} onChange={(gm: any) => setGmId(gm)}/>
                <Select style={{width: '30%'}} options={store.User.league.coachSet.map((coach: any) => {
                            return {value: coach.id, label: [coach.name + " " + coach.attributeOne + " " + coach.attributeTwo]}})}
                            value={coachId} onChange={(coach: any) => setCoachId(coach)}/>

                <Button type="primary" style={buttonStyles} onClick={() => onSubmit(franchise, gmId, coachId)}>Sign</Button>

            </div>
        );
    }
})

export default OffSeason;


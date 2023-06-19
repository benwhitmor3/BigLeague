import React, {useContext, useState} from 'react';
import {observer} from 'mobx-react'
import {CoachTypeModelType, StoreContext} from "../../models";
import {Select, Button, Card, Space} from 'antd';
import {buttonStyles} from "./Create/CreateStyles";
import {cardStyles} from "../Organisms/Cards/CardStyles";


export const StaffSelect: React.FunctionComponent = observer(() => {

    const store = useContext(StoreContext)

    const [franchise] = useState<any>(store.User ? store.User.franchise : null);
    const [gmId, setGmId] = useState<string>(store.User.franchise.gm ? store.User.franchise.gm.id : '');
    const [coachId, setCoachId] = useState<string>(store.User.franchise.coach ? store.User.franchise.coach.id : '');

    const coachLabel = (coach: CoachTypeModelType) => {
        if (coach.franchise)
            return {
                value: coach.id,
                label: [coach.name + " " + coach.attributeOne + " " + coach.attributeTwo + " ——— " + coach.franchise?.franchise]
            }
        else
            return {value: coach.id, label: [coach.name + " " + coach.attributeOne + " " + coach.attributeTwo]}
    }

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

    return (
        <div>
            <Card style={cardStyles}
                  title="Select Staff">
                <Space direction="vertical">
                    <label>GMs </label>
                    <Select style={{minWidth: '500px'}} options={store.User.league.gmSet.map((gm: any) => {
                        return {value: gm.id, label: gm.trait}
                    })}
                            value={gmId} onChange={(gm: any) => setGmId(gm)}/>
                    <label>Coaches </label>
                    <Select style={{minWidth: '500px'}} options={store.User.league.coachSet.map((coach: any) => {
                        return coachLabel(coach)
                    })}
                            value={coachId} onChange={(coach: any) => setCoachId(coach)}/>
                    {store.User.franchise.gm && store.User.franchise.coach ? null :
                        <Button style={{...buttonStyles, ...{width: '25%'}}}
                                onClick={() => onSubmit(franchise, gmId, coachId)}>Sign</Button>}
                </Space>
            </Card>
        </div>
    );
})

export default StaffSelect;


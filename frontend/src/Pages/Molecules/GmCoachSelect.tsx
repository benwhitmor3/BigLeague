import React, {useContext, useState} from 'react';
import {observer} from 'mobx-react'
import {CoachTypeModelType, StoreContext} from "../../models";
import {Spin, Select, Button} from 'antd';
import CSS from "csstype";


const buttonStyles: CSS.Properties = {
    backgroundColor: '#ad2102',
    border: '0px',
    borderRadius: '12px',
    fontSize: '14px',
    color: '#fff2e8',
    width: '20vh',
};

export const GmCoachSelect: React.FunctionComponent = observer(() => {

    const store = useContext(StoreContext)

    const [franchise, setFranchise] = useState<any>(store.User ? store.User.franchise : null);
    const [gmId, setGmId] = useState<string>(store.User.franchise.gm ? store.User.franchise.gm.id : '');
    const [coachId, setCoachId] = useState<string>(store.User.franchise.coach ? store.User.franchise.coach.id : '');

    const coachLabel = (coach: CoachTypeModelType) => {
        if (coach.franchise)
        return {value: coach.id, label: [coach.name + " " + coach.attributeOne + " " + coach.attributeTwo + " ——— " + coach.franchise?.franchise]}
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

    if (franchise == null)
        return <Spin/>
    else {
        return (
            <div>
                <Select style={{width: '30%'}} options={store.User.league.gmSet.map((gm: any) => {
                            return {value: gm.id, label: gm.trait}})}
                            value={gmId} onChange={(gm: any) => setGmId(gm)}/>
                <Select style={{width: '30%'}} options={store.User.league.coachSet.map((coach: any) => {
                            return coachLabel(coach)})}
                            value={coachId} onChange={(coach: any) => setCoachId(coach)}/>

                {store.User.franchise.gm && store.User.franchise.coach ? null : <Button type="primary" style={buttonStyles} onClick={() => onSubmit(franchise, gmId, coachId)}>Sign</Button>}

            </div>
        );
    }
})

export default GmCoachSelect;


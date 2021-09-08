import React, {useContext, useEffect, useState} from 'react';
import {observer} from 'mobx-react'
import {StoreContext} from "../models";
import {Statistic, Row, Col, Card, Select, Spin, Button} from 'antd';
import CSS from "csstype";
import FreeAgentTable from "./Organisms/FreeAgentTable";
import OffSeasonButton from "./Molecules/OffSeasonButton";
import SignPlayersButton from "./Molecules/SignPlayersButton";
import SetLineupsButton from "./Molecules/SetLineupsButton";


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
            <div>
                {/*<OffSeasonButton/>*/}
                <SignPlayersButton/>
                <SetLineupsButton/>
            </div>
        );
    }
})

export default OffSeason;


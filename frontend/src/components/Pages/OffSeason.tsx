import React, {useState, useEffect} from 'react';
import 'antd/dist/antd.css';
import { Row, Col } from 'antd';
import FreeAgentTable from "../Table/FreeAgentTable";
import {useQuery} from "../../models";
import {observer} from "mobx-react";

export const OffSeason: React.FunctionComponent = observer((props) => {

    const {store, error, loading, data} = useQuery(store =>
        store.queryAllPlayer(
            {},
            `
    name
    suit
    age
    pv
    epv
    sEpv
    contract
    tOption
    pOption
    renew
    salary
    grade
    trainer
    roster{
      lineup
      franchise{
        franchise
      }
      }
    league{
      leagueName
      }
    `,
            {fetchPolicy: 'cache-first'}
        ),
    );

    if (error) return <div>{error.message}</div>;
    if (loading) return <div>loading</div>;
    else {
            return (
                <div>
                    <Row>
                        <Col span={24}>
                            <FreeAgentTable/>
                        </Col>
                    </Row>
                </div>
            );
        }
    }
)

export default OffSeason;
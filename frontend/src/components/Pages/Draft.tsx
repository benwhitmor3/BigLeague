import React from 'react';
import {DraftTable} from "../Table/DraftTable";
import {Row, Col} from 'antd';
import {observer} from "mobx-react";
import {useQuery} from "../../models";


export const Draft: React.FunctionComponent = observer((props) => {

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
                            <DraftTable/>
                        </Col>
                    </Row>
                </div>
            );
        }
    }
)

export default Draft;
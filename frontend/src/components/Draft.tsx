import React from 'react';
import PlayersTable from "./Table/PlayersTable";
import DraftTable from "./Table/DraftTable";
import { Row, Col } from 'antd';
import SigningFreeAgents from "./Signing/SigningFreeAgents";


export default function Draft() {


    return (
      <div>
    <Row>
      <Col span={8}>
                  <DraftTable/>
      </Col>
    </Row>
      {/*<PlayersTable/>*/}

      </div>

  );
}
import React from 'react';
import SigningPlayers from "./Signing/SigningPlayers";
import {Col, Row} from "antd";
import {RosterTable} from "./Table/RosterTable";

export default function Season () {

    return (
      <div>
        {/*<SigningPlayers/>*/}
    <Row>
      <Col span={6}>
      <RosterTable/>
      </Col>
    </Row>

      </div>

  );
}
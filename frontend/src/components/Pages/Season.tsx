import React from 'react';
import {Col, Row} from "antd";
import {RosterTable} from "../Table/RosterTable";

export default function Season () {

    return (
      <div>
    <Row>
      <Col span={6}>
      <RosterTable/>
      </Col>
    </Row>

      </div>

  );
}
import React, {useState, useEffect} from 'react';
import 'antd/dist/antd.css';
import { Row, Col } from 'antd';
import FreeAgentTable from "../Table/FreeAgentTable";

export default function OffSeason() {

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
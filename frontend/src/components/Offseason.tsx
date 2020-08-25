import React, {useState, useEffect} from 'react';
import SigningFreeAgents from "./Signing/SigningFreeAgents";
import 'antd/dist/antd.css';
import { Row, Col } from 'antd';

export default function OffSeason() {

  return (
    <div>
    <Row>
      <Col span={8}>
          <SigningFreeAgents/>
      </Col>
      <Col span={8}>
          <SigningFreeAgents/>
      </Col>
      <Col span={8}>
          <SigningFreeAgents/>
      </Col>
    </Row>
            <Row>
      <Col span={24}>
          <SigningFreeAgents/>
      </Col>
    </Row>
    </div>
  );
}
import React from 'react';
import {DraftTable} from "../Table/DraftTable";
import { Row, Col } from 'antd';


export default function Draft() {


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
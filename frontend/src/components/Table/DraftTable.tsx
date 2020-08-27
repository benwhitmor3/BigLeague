import React from 'react';
import 'antd/dist/antd.css';
import { Table, Tag, Space } from 'antd';

export default function DraftTable() {


  const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text: string) => <a href="/Home">{text}</a>,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'PV',
    dataIndex: 'pv',
    key: 'pv',
  },
  {
    title: 'Suit',
    key: 'suit',
    dataIndex: 'suit',
    render: (suit: Array<string>) => (
      <>
        {suit.map(suit => {
          let colour;
          if (suit === 'diamond') {
            colour = '#40a9ff';
          }
          else if (suit === 'spade') {
            colour = '#ffc53d';
          }
          else if (suit === 'heart') {
            colour = '#ff4d4f';
          }
          else if (suit === 'club') {
            colour = '#73d13d';
          }
          return (
            <Tag color={colour} key={suit}>
              {suit.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (text: string, record: any) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

const data = [
  {
    key: '1',
    name: 'Lebron James',
    age: 35,
    pv: 20,
    suit: ['diamond'],
  },
  {
    key: '2',
    name: 'Lebron James',
    age: 35,
    pv: 20,
    suit: ['spade'],
  },
  {
    key: '3',
    name: 'Lebron James',
    age: 35,
    pv: 20,
    suit: ['heart'],
  },
  {
    key: '4',
    name: 'Lebron James',
    age: 35,
    pv: 20,
    suit: ['club'],
  },
];

  return(

<Table columns={columns} dataSource={data} />

  );
}
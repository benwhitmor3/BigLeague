import React from 'react';
import 'antd/dist/antd.css';
import { Table, Tag, Space } from 'antd';

export default function DraftTable() {

  type playerConfig = {
    name: string;
    age: number;
    epv: number;
    suit: string[] | string;
};

  const draft = (player: playerConfig) => {
    console.log(player)
  }

  const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    // render: (text: string) => <a href="/Home">{text}</a>,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
    sorter: (a: any, b: any) => a.age - b.age,
  },
  {
    title: 'EPV',
    dataIndex: 'epv',
    key: 'epv',
    sorter: (a: any, b: any) => a.epv - b.epv,
  },
  {
    title: 'Suit',
    key: 'suit',
    dataIndex: 'suit',
    render: (suit: Array<string>) => (
      <>
        {suit.map(suit => {
          let colour;
          let suit_icon;
          if (suit === 'diamond') {
            colour = '#40a9ff';
            suit_icon = <span role="img" aria-label="diamond"> ♦ </span>;
          }
          else if (suit === 'spade') {
            colour = '#ffc53d';
            suit_icon = <span role="img" aria-label="spade"> ♠ </span>;
          }
          else if (suit === 'heart') {
            colour = '#ff4d4f';
            suit_icon = <span role="img" aria-label="heart"> ♥ </span>;
          }
          else if (suit === 'club') {
            colour = '#73d13d';
            suit_icon = <span role="img" aria-label="club"> ♣ </span>;
          }
          return (
            <Tag icon={suit_icon} color={colour} key={suit}>
             {suit.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
    filters: [
      {
        text: 'Diamond',
        value: 'diamond',
      },
      {
        text: 'Spade',
        value: 'spade',
      },
      {
        text: 'Heart',
        value: 'heart',
      },
      {
        text: 'Club',
        value: 'club',
      },
    ],
    onFilter: (value: string | number | boolean, record: any) => record.suit.indexOf(value) === 0,
  },
  {
    title: 'Action',
    key: 'action',
    render: (text: string, record: playerConfig) => (
      <Space size="middle">
        <Tag icon={<span role="img" aria-label="player"> 📝 </span>} color={'#a7a7a7'}
             onClick={() => draft({name: record.name, age: record.age, epv: record.epv, suit: record.suit[0]})}>
          Draft Prospect
        </Tag>
      </Space>
    ),
  },
];

const data = [
  {
    name: 'Lebron James',
    age: 25,
    epv: 25,
    suit: ['diamond'],
  },
  {
    name: 'Lebron James',
    age: 25,
    epv: 17,
    suit: ['spade'],
  },
  {
    name: 'Lebron James',
    age: 21,
    epv: 28,
    suit: ['heart'],
  },
  {
    name: 'Lebron James',
    age: 30,
    epv: 20,
    suit: ['club'],
  },
  {
    name: 'Lebron James',
    age: 25,
    epv: 25,
    suit: ['diamond'],
  },
  {
    name: 'Lebron James',
    age: 25,
    epv: 17,
    suit: ['spade'],
  },
  {
    name: 'Lebron James',
    age: 21,
    epv: 28,
    suit: ['heart'],
  },
  {
    name: 'Lebron James',
    age: 30,
    epv: 20,
    suit: ['club'],
  },
  {
    name: 'Lebron James',
    age: 25,
    epv: 25,
    suit: ['diamond'],
  },
  {
    name: 'Lebron James',
    age: 25,
    epv: 17,
    suit: ['spade'],
  },
  {
    name: 'Lebron James',
    age: 25,
    epv: 25,
    suit: ['diamond'],
  },
  {
    name: 'Lebron James',
    age: 25,
    epv: 17,
    suit: ['spade'],
  },
  {
    name: 'Lebron James',
    age: 21,
    epv: 28,
    suit: ['heart'],
  },
  {
    name: 'Lebron James',
    age: 30,
    epv: 20,
    suit: ['club'],
  },
  {
    name: 'Lebron James',
    age: 25,
    epv: 25,
    suit: ['diamond'],
  },
  {
    name: 'Lebron James',
    age: 25,
    epv: 17,
    suit: ['spade'],
  },
  {
    name: 'Lebron James',
    age: 21,
    epv: 28,
    suit: ['heart'],
  },
  {
    name: 'Lebron James',
    age: 30,
    epv: 20,
    suit: ['club'],
  },
  {
    name: 'Lebron James',
    age: 25,
    epv: 25,
    suit: ['diamond'],
  },
  {
    name: 'Lebron James',
    age: 25,
    epv: 17,
    suit: ['spade'],
  },
];

  return(

<Table columns={columns} dataSource={data} pagination={false}/>

  );
}
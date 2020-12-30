import React, {useContext, useEffect, useState} from 'react';
import 'antd/dist/antd.css';
import { Table, Tag, Space } from 'antd';
import {PlayerTypeModelType, useQuery, StoreContext} from "../../models";
import {observer} from "mobx-react";
import { Switch } from 'antd';
import {colour, suit_icon, draft} from './TableFunctions'

export const DraftTable: React.FunctionComponent = observer(() => {

  const storee = useContext(StoreContext)
  // @ts-ignore
  window.store = storee

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
    ),
    );
  // @ts-ignore
  const players = data.allPlayer;
  // console.log(players);


  const columns1 = [
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
    render: (epv: number) => <text>{epv.toFixed(1)}</text>,
  },
  {
    title: 'Suit',
    key: 'suit',
    dataIndex: 'suit',
    render: (suit: string) => (
            <Tag icon={suit_icon(suit)} color={colour(suit)} key={suit}>
             {suit.toUpperCase()}
            </Tag>
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
    render: (text: string, record: PlayerTypeModelType) => (
      <Space size="middle">
        <Tag icon={<span role="img" aria-label="player"> 📝 </span>} color={'#afafaf'}
             onClick={() =>
             store.mutateRosterUpdate({
                "rosterInput": {
                "playerName": record.name,
                "franchiseFranchise": "test franchise",
                "lineup": 'bench'
                }
              })
             }>
          Draft Prospect
        </Tag>
      </Space>
    ),
  },
];

  const columns2 = [
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
    render: (epv: number) => <text>{epv.toFixed(1)}</text>,
  },
  {
    title: 'S_EPV',
    dataIndex: 'sEpv',
    key: 'sEpv',
    sorter: (a: any, b: any) => a.sEpv - b.sEpv,
    render: (sEpv: number) => <text>{sEpv.toFixed(1)}</text>,
  },
  {
    title: 'Suit',
    key: 'suit',
    dataIndex: 'suit',
    render: (suit: string) => (
            <Tag icon={suit_icon(suit)} color={colour(suit)} key={suit}>
             {suit.toUpperCase()}
            </Tag>
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
    render: (text: string, record: PlayerTypeModelType) => (
      <Space size="middle">
        <Tag icon={<span role="img" aria-label="player"> 📝 </span>} color={'#afafaf'}
             onClick={() =>
                store.mutateRosterUpdate({
                "rosterInput": {
                "playerName": record.name,
                "franchiseFranchise": "test franchise",
                "lineup": 'bench'
                }
              })
             }>
          Draft Prospect
        </Tag>
      </Space>
    ),
  },
];

  const [scouter, setScouter] = useState<boolean>(false);
  let columns;
      if (scouter) {
      columns = columns2
    } else {
      columns = columns1
    }

  return(
      <div>
  <Switch checkedChildren="Scouter Activated" unCheckedChildren="Scouter Deactivated"
      onChange={ () => setScouter(prevState => (!prevState))}
          style={{marginBottom: '10px'}}/>
  <Table columns={columns} dataSource={players} pagination={false}/>
      </div>
  );
}
)

export default DraftTable;
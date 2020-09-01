import React, {useContext, useEffect, useState} from 'react';
import 'antd/dist/antd.css';
import { Table, Tag, Space } from 'antd';
import {PlayerTypeModelType, StoreContext, useQuery} from "../../models";
import {observer} from "mobx-react";
import { Switch } from 'antd';
import {Select} from "../Select";
import LineupPicker from "./LineupPicker";

export const RosterTable: React.FunctionComponent = observer(() => {
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
    `,
    ),
    );
  // @ts-ignore
  const players = data.allPlayer;
  console.log(players);

  const[selected, setSelected] = useState("bench");
  // let options = [{ value: "", label: "" }, { value: "starter", label: "starter" }, { value: "rotation", label: "rotation" },
  //                     { value: "bench", label: "bench" }];

  const LineupPicker: React.FunctionComponent = (lineup: any) => {
    // console.log(roster.lineup)
    const [selected, setSelected] = useState(lineup);
    console.log(lineup)
    let options = [{value: lineup, label: lineup}, {value: "starter", label: "starter"}, {value: "rotation", label: "rotation"},
      {value: "bench", label: "bench"}];

    // @ts-ignore
    return <Select options={options} value={selected} onChange={setSelected}/>
  }


  const draft = (player: PlayerTypeModelType) => {
    console.log(player)
  }


  const colour = (suit: string) => {
      if (suit === 'diamond') {
        return '#40a9ff';
      }
      else if (suit === 'spade') {
        return '#ffc53d';
      }
      else if (suit === 'heart') {
        return '#ff4d4f';
      }
      else if (suit === 'club') {
        return '#73d13d';
      }
}

  const suit_icon = (suit: string) => {
    if (suit === 'diamond') {
      return <span role="img" aria-label="diamond"> ♦ </span>;
    }
    else if (suit === 'spade') {
      return <span role="img" aria-label="spade"> ♠ </span>;
    }
    else if (suit === 'heart') {
      return <span role="img" aria-label="spade"> ♥ </span>;
    }
    else if (suit === 'club') {
      return <span role="img" aria-label="spade"> ♣ </span>;
    }
}

  const _lineup = (roster: any) => {
    if (roster != null) {
      return roster.lineup ;
    }
    else {
      return "";
    }
}

  const _franchise = (roster: any) => {
    if (roster != null) {
      return roster.franchise.franchise ;
    }
    else {
      return "";
    }
}

  const _to_fixed = (value: any) => {
  if (value != null) {
    return value.toFixed(2) ;
  }
  else {
    return "";
  }
}



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
    title: 'Lineup',
    dataIndex: "roster",
    key: "roster",
    filters: [
      {
        text: 'Starter',
        value: 'starter',
      },
      {
        text: 'Rotation',
        value: 'rotation',
      },
      {
        text: 'Bench',
        value: 'bench',
      },
    ],
    onFilter: (value: string | number | boolean, record: any) => _lineup(record.roster).indexOf(value) === 0,
    render: (roster: any) => (<text>{_lineup(roster)}</text>),
  },
  {
    title: 'Contract',
    dataIndex: 'contract',
    key: 'contract',
    sorter: (a: any, b: any) => a.contract - b.contract,
  },
  {
    title: 'Team Option',
    dataIndex: 'tOption',
    key: 'tOption',
  },
  {
    title: 'Player Option',
    dataIndex: 'pOption',
    key: 'pOption',
  },
  {
    title: 'Renewal',
    dataIndex: 'renewal',
    key: 'renewal',
  },
  {
    title: 'Salary',
    dataIndex: 'salary',
    key: 'salary',
    sorter: (a: any, b: any) => a.salary - b.salary,
    render: (salary: number) => <text>{_to_fixed(salary)}</text>,
  },
  {
    title: 'Grade',
    dataIndex: 'grade',
    key: 'grade',
    sorter: (a: any, b: any) => a.grade - b.grade,
    render: (grade: number) => <text>{_to_fixed(grade)}</text>,
  },
  {
    title: 'Franchise',
    dataIndex: "roster",
    key: "roster",
    onFilter: (value: string | number | boolean, record: any) => _franchise(record.roster).indexOf(value) === 0,
    render: (roster: any) => (<text>{_franchise(roster)}</text>),
  },
  {
    title: 'Action',
    key: 'action',
    dataIndex: "roster",
    filters: [
      {
        text: 'Starter',
        value: 'starter',
      },
      {
        text: 'Rotation',
        value: 'rotation',
      },
      {
        text: 'Bench',
        value: 'bench',
      },
    ],
    onFilter: (value: string | number | boolean, record: any) => _lineup(record.roster).indexOf(value) === 0,
    render: (roster: any) => (
        LineupPicker(_lineup(roster))),
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
    title: 'Lineup',
    dataIndex: "roster",
    key: "roster",
    filters: [
      {
        text: 'Starter',
        value: 'starter',
      },
      {
        text: 'Rotation',
        value: 'rotation',
      },
      {
        text: 'Bench',
        value: 'bench',
      },
    ],
    onFilter: (value: string | number | boolean, record: any) => _lineup(record.roster).indexOf(value) === 0,
    render: (roster: any) => (<text>{_lineup(roster)}</text>),
  },
  {
    title: 'Contract',
    dataIndex: 'contract',
    key: 'contract',
    sorter: (a: any, b: any) => a.contract - b.contract,
  },
  {
    title: 'Team Option',
    dataIndex: 'tOption',
    key: 'tOption',
  },
  {
    title: 'Player Option',
    dataIndex: 'pOption',
    key: 'pOption',
  },
  {
    title: 'Renewal',
    dataIndex: 'renewal',
    key: 'renewal',
  },
  {
    title: 'Salary',
    dataIndex: 'salary',
    key: 'salary',
    sorter: (a: any, b: any) => a.salary - b.salary,
    render: (salary: number) => <text>{_to_fixed(salary)}</text>,
  },
  {
    title: 'Grade',
    dataIndex: 'grade',
    key: 'grade',
    sorter: (a: any, b: any) => a.grade - b.grade,
    render: (grade: number) => <text>{_to_fixed(grade)}</text>,
  },
  {
    title: 'Franchise',
    dataIndex: "roster",
    key: "roster",
    onFilter: (value: string | number | boolean, record: any) => _franchise(record.roster).indexOf(value) === 0,
    render: (roster: any) => (<text>{_franchise(roster)}</text>),
  },
  {
    title: 'Action',
    key: 'action',
    render: (text: string, record: PlayerTypeModelType) => (
      <Space size="middle">
        <Tag icon={<span role="img" aria-label="player"> 📝 </span>} color={'#afafaf'}
             onClick={() => draft(record)}>
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

export default RosterTable;
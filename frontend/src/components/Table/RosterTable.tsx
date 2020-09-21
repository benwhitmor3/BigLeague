import React, {useContext, useEffect, useState} from 'react';
import 'antd/dist/antd.css';
import { Table, Tag, Space } from 'antd';
import {PlayerTypeModelType, StoreContext, useQuery} from "../../models";
import {observer} from "mobx-react";
import { Switch } from 'antd';
import {Select} from "../Select";

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
    league{
      leagueName
      }
    `,
    ),
    );
  // @ts-ignore
  const players = data.allPlayer;
  console.log(players);


  const LineupPicker: React.FunctionComponent = (current_lineup: any, record: any) => {

    const [selected, setSelected] = useState(current_lineup);

    const submit_lineup = (updated_lineup: any) => {
    setSelected(updated_lineup);
    console.log(record)
    console.log(updated_lineup)
    }

    let other_values = ["starter", "rotation", "bench"].filter(x => ![current_lineup].includes(x));

    const options = (other_values: Array<string>) => {
      if (other_values.length === 2) {
        return [{value: current_lineup, label: current_lineup}, {value: other_values[0], label: other_values[0]},
          {value: other_values[1], label: other_values[1]}];
      } else {
        return [{value: current_lineup, label: current_lineup}, {value: other_values[0], label: other_values[0]},
          {value: other_values[1], label: other_values[1]}, {value: other_values[2], label: other_values[2]}];
      }
    }

    return <Select options={options(other_values)} value={selected} onChange={(updated_lineup: any) => submit_lineup(updated_lineup)}/>
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
    title: 'Renew',
    dataIndex: 'renew',
    key: 'renew',
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
    render: (roster: any, record: any) => (
        LineupPicker(_lineup(roster), record)),
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
    title: 'Renew',
    dataIndex: 'renew',
    key: 'renew',
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
    render: (roster: any, record: any) => (
        LineupPicker(_lineup(roster), record)),
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
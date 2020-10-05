import React, {useContext, useEffect, useState} from 'react';
import 'antd/dist/antd.css';
import {Table, Tag, Space, Input, Modal, Select, Alert} from 'antd';
import {PlayerTypeModelType, StoreContext, useQuery} from "../../models";
import {observer} from "mobx-react";
import { Switch } from 'antd';
import CSS from "csstype";
import {colour, suit_icon, _to_fixed} from './TableFunctions'

export const FreeAgentTable: React.FunctionComponent = observer(() => {
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


  const formStyles: CSS.Properties = {
    backgroundColor: '#ffffff',
    border: '1px solid #afafaf',
    margin: '5px',
    width: '10vh',
    borderRadius: '3px',
    padding: '1px',
    fontSize: '14px',
    color: '#000000',
    };

    const selectStyles: CSS.Properties = {
    margin: '5px',
    width: '20vh',
    fontSize: '14px',
    };


  const [visible, setVisible] = useState<boolean>(false)
  const [selectedplayer, setSelectedPlayer] = useState<any>([]);
  const [salary, setSalary] = useState<number>(0);
  const [renewal, setRenewal] = useState<string>("no");
  const [contractlength, setContractLength] = useState<number>(1);
  const [playeroption, setPlayerOption] = useState<number>(0);
  const [teamoption, setTeamOption] = useState<number>(0);
  const [offergrade, setOfferGrade] = useState<number>(0);
  const [gradecolour, setGradeColour] = useState<string>('#ff4d4f');

  const player_modal = (player: PlayerTypeModelType) => {
    setSelectedPlayer(player);
    setVisible(true);
  }

  const sign_player = () => {
    if (gradecolour == '#73d13d') {
      console.log("PLAYER SIGNED!");
      console.log(selectedplayer)
      setVisible(false);
    }
    else {
    console.log("PLAYER REJECTED!");
    console.log(selectedplayer)
    }
  }

    useEffect(() => {
        calc_grade();
    }, [salary, renewal, contractlength, playeroption, teamoption, selectedplayer]);


  const calc_grade = () => {
    let epv = selectedplayer.epv;
    let age = selectedplayer.age;

    let grade = 0;

    // is contract is greater than zero
    if (contractlength > 0) {
        // set initial base salary
        grade = (salary * (contractlength + 1)) / epv;
            // adjust for renewal
            if (renewal == "repeat") {
                grade -= 2
            }
            else if (renewal == "non-repeat") {
                grade -= 1
            }
            // adjust for t_option
            if (teamoption > 0) {
                grade -= (contractlength - teamoption)
            }
            // adjust for p_option
            if (playeroption > 0) {
                grade += 0.5*(contractlength - playeroption)
            }
            // adjust for age
            if (age >= 27) {
                grade += age - 26
            }
            // stopper for invalid contracts where option is greater than contract length
            if (contractlength <= playeroption || contractlength <= teamoption) {
              grade = -999.99
            }
        // set salary after all adjustments
        setOfferGrade(grade);
    }

    if (grade >= selectedplayer.grade && grade >= 5) {
      setGradeColour('#73d13d')
    }
    else {
      setGradeColour('#ff4d4f') }
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
    title: 'Salary',
    key: 'salary',
    dataIndex: 'salary',
    sorter: (a: any, b: any) => a.salary - b.salary,
    render: (salary: number, record: PlayerTypeModelType) => (<text>{_to_fixed(salary)}</text>),
  },

  {
    title: 'Grade',
    dataIndex: 'grade',
    key: 'grade',
    sorter: (a: any, b: any) => a.grade - b.grade,
    render: (grade: number) => (<text>{_to_fixed(grade)}</text>),
  },
  {
    title: 'Action',
    key: 'action',
    render: (record: PlayerTypeModelType) => (
      <Space size="middle">
        <Tag icon={<span role="img" aria-label="player"> 📝 </span>} color={'#afafaf'}
             onClick={() => player_modal(record)}>
          Offer Contract
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
    render: (record: PlayerTypeModelType) => (
      <Space size="middle">
        <Tag icon={<span role="img" aria-label="player"> 📝 </span>} color={'#afafaf'}
             // onClick={() =>
             //     draft(record, salary)}
        >
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

  <Modal
        title="Contract Portal"
        centered
        visible={visible}
        onOk={() =>
            sign_player()
        }
        onCancel={() => setVisible(false)}
        width={'600px'}
      >
        <h4>{selectedplayer.name}</h4>
            <label>Salary: </label>
              <Input min={0} type="number" onChange={event =>
              {setSalary(event.target.valueAsNumber)}} name="salary" style={formStyles}/>
          <br/>
            <label>Contract Length: </label>
              <Select defaultValue={contractlength} style={selectStyles} options={[
                    {label: "One Year", value: 1},
                    {label: "Two Years", value: 2},
                    {label: "Three Years", value: 3},
                    {label: "Four Years", value: 4},
                    {label: "Five Years", value: 5},]} onChange={event => {setContractLength(event)}}>
              </Select>
          <br/>
            <label>Renewal: </label>
              <Select defaultValue={renewal} style={selectStyles} options={[
                {label: "No", value: "no"},
                {label: "Non-Repeat", value: "non-repeat"},
                {label: "Repeat", value: "repeat"},]}
                onChange={event => {setRenewal(event)}}>
              </Select>
          <br/>
            <label>Player Option: </label>
              <Select defaultValue={playeroption} style={selectStyles} options={[
                  {label: "None", value: 0},
                  {label: "Year One", value: 1},
                  {label: "Year Two", value: 2},
                  {label: "Year Three", value: 3},
                  {label: "Year Four", value: 4},]}
                onChange={event => {setPlayerOption(event)}}>
              </Select>
          <br/>
            <label>Team Option: </label>
              <Select defaultValue={teamoption} style={selectStyles} options={[
                  {label: "None", value: 0},
                  {label: "Year One", value: 1},
                  {label: "Year Two", value: 2},
                  {label: "Year Three", value: 3},
                  {label: "Year Four", value: 4},]}
                onChange={event => {setTeamOption(event)}}>
              </Select>
            <br/>
            <label>Current Grade: </label>
              <Tag color={'#afafaf'} style={{marginTop: '10px', fontSize: '14px'}}>
                {selectedplayer.grade}
              </Tag>
            <label>Offer Grade: </label>
              <Tag color={gradecolour} style={{marginTop: '10px', fontSize: '14px'}}>
                {offergrade.toFixed(2)}
              </Tag>

      </Modal>

  <Table columns={columns} dataSource={players} pagination={false}/>

      </div>
  );
}
)

export default FreeAgentTable;
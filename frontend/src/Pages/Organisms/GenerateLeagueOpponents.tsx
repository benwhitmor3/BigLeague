import React, {useContext, useState} from 'react';
import {observer} from 'mobx-react'
import {StoreContext} from "../../models";
import {Card, Button, Select, Progress} from 'antd';
import axios from "axios";
import {userQuery} from "../Utils/queries";

const {Option} = Select;

export const GenerateLeagueOpponents: React.FunctionComponent = observer(() => {

        const store = useContext(StoreContext)

        const [numberOfFranchises, setNumberOfFranchises] = useState<string>("8")
        const [loading, setLoading] = useState<boolean>(false)
        const [percent, setPercent] = useState<number>(0)

        const generateLeagueBots = () => {
            const data = new FormData();
            data.append("franchise_id", store.User.franchise.id)
            data.append("num_of_franchises", numberOfFranchises)
            setLoading(true)
            setPercent(50)
            axios.post('http://127.0.0.1:8000/league_generation', data)
                .then(res => {
                    console.log(res.data)
                    setPercent(75)
                    store.queryUser(
                        {email: "email@email.com"},
                        userQuery,
                        {}
                    )
                    setPercent(100)
                    setLoading(false)
                })
                .catch(err => {
                    console.log(err)
                    setLoading(false)
                })
        };

        if (loading) return (
            <div>
                <h3>Creating Bots</h3>
                <Progress strokeColor={{'0%': '#108ee9', '100%': '#87d068',}} percent={percent}/>
            </div>
        )
        else {
            return (
                <div>
                    <h1>{store.User?.franchise.franchise}, welcome to the {store.User.league.leagueName}!</h1>
                    <div>
                        <label style={{fontSize: '16px'}}>Number of Franchises: </label>
                        <Select defaultValue="8" style={{width: '20%', marginBottom: '10px'}}
                                onChange={(value: any) => setNumberOfFranchises(value)}>
                            <Option value="8">8</Option>
                            <Option value="16">16</Option>
                            <Option value="32">32</Option>
                        </Select>
                    </div>
                    <Card bordered={false}
                          key={store.User.franchise.id}
                          style={{
                              borderRadius: "24px",
                              backgroundColor: '#d4380d',
                              boxShadow: "0px 0px 4px 0px #D0D8F3",
                          }}
                    >
                        <Button style={{backgroundColor: '#d4380d', fontSize: '16px', color: '#fff2e8', border: '0px'}}
                                onClick={() => generateLeagueBots()} block>
                            Generate League Opponents
                        </Button>
                    </Card>
                </div>
            )
        }
    }
)

export default GenerateLeagueOpponents;


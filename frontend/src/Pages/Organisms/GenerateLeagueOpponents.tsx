import React, {useContext} from 'react';
import {observer} from 'mobx-react'
import {StoreContext} from "../../models";
import {Card, Button} from 'antd';
import axios from "axios";
import {userQuery} from "../Utils/queries";


export const GenerateLeagueOpponents: React.FunctionComponent = observer(() => {

    const store = useContext(StoreContext)

    const generateLeagueBots = () => {
        const data = new FormData();
        data.append("franchise_id", store.User.franchise.id)
        data.append("num_of_franchises", "8")
        axios.post('http://127.0.0.1:8000/league_generation', data)
            .then(res => {
                console.log(res.data)
                store.queryUser(
                    {email: "email@email.com"},
                    userQuery,
                    {}
                )
            })
            .catch(err => {
                console.log(err)
            })
    };

    return (
        <div>
            <h1>{store.User?.franchise.franchise}, welcome to the {store.User.league.leagueName}!</h1>
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
})

export default GenerateLeagueOpponents;


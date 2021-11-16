import React, {useContext, useState} from 'react';
import {observer} from 'mobx-react'
import {StoreContext} from "../../../models";
import {Card, Button, Select, Space} from 'antd';
import axios from "axios";
import {userQuery} from "../../Utils/queries";
import SmallLoading from "../../Atoms/SmallLoading";
import {buttonStyles, cardStyles, formStyles, inputStyles, labelStyles} from "./CreateStyles";

const {Option} = Select;

export const CreateBots: React.FunctionComponent = observer(() => {

        const store = useContext(StoreContext)

        const [numberOfFranchises, setNumberOfFranchises] = useState<string>("8")
        const [loading, setLoading] = useState<boolean>(false)
        const email: any = localStorage.getItem('email') ? localStorage.getItem('email') : '';

        const createBots = () => {
            const data = new FormData();
            data.append("franchise_id", store.User.franchise.id)
            data.append("num_of_franchises", numberOfFranchises)
            setLoading(true)
            axios.post('http://127.0.0.1:8000/league_generation', data)
                .then(res => {
                    console.log(res.data);
                    store.queryUser(
                        {email: email},
                        userQuery,
                        {}
                    )
                    setLoading(false)
                })
                .catch(err => {
                    console.log(err)
                    setLoading(false)
                })
        };

        if (loading) return (
            <div>
                <SmallLoading animation="ld ld-bounce"/>
            </div>
        )
        else {
            return (
                <div style={formStyles}>
                <Card style={cardStyles}>
                        <h1>{store.User?.franchise.franchise}, welcome to the {store.User.league.leagueName}!</h1>
                    <div>
                        <label style={labelStyles}>Number of Franchises: </label>
                        <Select defaultValue="8" style={{width: '20%', marginBottom: '10px'}}
                                onChange={(value: any) => setNumberOfFranchises(value)}>
                            <Option value="8">8</Option>
                            <Option value="16">16</Option>
                        </Select>
                    </div>
                        <Button style={buttonStyles}
                                onClick={() => createBots()}>
                            Create Bots
                        </Button>
                </Card>
                </div>
            )
        }
    }
)

export default CreateBots;


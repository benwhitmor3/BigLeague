import React, {useContext, useState} from 'react';
import {observer} from 'mobx-react'
import {StoreContext} from "../../../models";
import {Card, Button, Select, Space} from 'antd';
import axios from "axios";
import {userQuery} from "../../Utils/queries";
import SmallLoading from "../../Atoms/Loading/SmallLoading";
import {buttonStyles, cardStyles, formStyles, inputStyles, labelStyles} from "./CreateStyles";

const {Option} = Select;

export const CreateBots: React.FunctionComponent = observer(() => {

        const store = useContext(StoreContext)

        const [numberOfFranchises, setNumberOfFranchises] = useState<string>("8")
        const [loading, setLoading] = useState<boolean>(false)
        const email: any = localStorage.getItem('email') ? localStorage.getItem('email') : '';

        const createBots = () => {
            let link = '';
            if (window.location.port === '3000') {
                link = window.location.hostname + ':8000'
            } else {
                link = window.location.host
            }
            const data = new FormData();
            data.append("franchise_id", store.User.franchise.id)
            data.append("num_of_franchises", numberOfFranchises)
            setLoading(true)
            axios.post(window.location.protocol + "//" + link + '/league_generation', data)
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
                            {/*<Option value="10">10</Option>*/}
                        </Select>
                    </div>
                        <Button style={buttonStyles}
                                onClick={() => createBots()}>
                            Create Opponents
                        </Button>
                </Card>
                </div>
            )
        }
    }
)

export default CreateBots;


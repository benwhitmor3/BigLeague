import React, {useContext} from 'react';
import {observer} from "mobx-react";
import {StoreContext} from "../../../models";
import {useForm} from "react-hook-form";
import {Alert, Card, Space} from "antd";
import {labelStyles, formStyles, buttonStyles, inputStyles, cardStyles} from "./CreateStyles";
import { useNavigate } from "react-router-dom";


type leagueConfig = {
    leagueName: string;
    email: string;
};

export const CreateLeague: React.FunctionComponent = observer(() => {

    const store = useContext(StoreContext)
    const navigate = useNavigate();
    const {register, handleSubmit, errors} = useForm<leagueConfig>();
    const onSubmit = handleSubmit(({leagueName, email}: leagueConfig) => {
        console.log(leagueName, email);
        store.mutateCreateLeague({
                "leagueName": leagueName,
                "email": email
            },
            `
                __typename
                leagueName
                user{
                  __typename
                  id
                  email
                  league{
                      __typename
                      id
                      leagueName
                    }
                }   
                `,
            undefined
        ).then(() => navigate('/Franchise'))
    });

    return (
        <form style={formStyles} onSubmit={onSubmit}>
            <Card style={cardStyles} title="Start League">
            <Space direction="vertical">
            <label style={labelStyles}>League Name:</label>
            <input name="leagueName" style={inputStyles} ref={register({
                required: {
                    value: true,
                    message: "League name is a required field",
                },
                maxLength: {
                    value: 25,
                    message: 'Max League name length is 25',
                },
            })}/>

            <input name="email" style={{display: "none"}} value={store.User.email} ref={register({})}/>
            <input type="submit" style={buttonStyles} value="Create League"/>
            <br/> {errors.leagueName && <Alert message={errors.leagueName.message} type="error" closable/>}
            <br/>
                </Space>
            </Card>
        </form>
    );
}
)

export default CreateLeague;
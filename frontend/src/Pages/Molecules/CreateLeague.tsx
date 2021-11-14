import React, {useContext} from 'react';
import {observer} from "mobx-react";
import {StoreContext} from "../../models";
import {useForm} from "react-hook-form";
import {Alert, Button, Card, Input, Space} from "antd";
import CSS from "csstype";

type leagueConfig = {
    leagueName: string;
    email: string;
};

export const CreateLeague: React.FunctionComponent = observer(() => {

    const store = useContext(StoreContext)
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
        )
    });

    const labelStyles: CSS.Properties = {
        marginRight: '5px',
    };

    const formStyles: CSS.Properties = {
        backgroundColor: '#d4380d',
        border: '0px',
        borderRadius: '4px',
        padding: '0.5rem',
        fontSize: '14px',
        color: '#fff2e8',
    };

    const buttonStyles: CSS.Properties = {
        backgroundColor: '#ad2102',
        margin: '5px',
        border: '0px',
        borderRadius: '12px',
        fontSize: '14px',
        color: '#fff2e8',
        padding: '8px',
    };

    return (
        <form style={{textAlign: 'center', marginTop: '20px'}} noValidate autoComplete="off" onSubmit={onSubmit}>
            <Card style={{display: 'inline-block', width: '30%'}} title="Start League">
                <Space direction="vertical">
            <label style={labelStyles}>League Name:</label>
            <input name="leagueName" style={formStyles} ref={register({
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

import React, {useContext} from 'react';
import {observer} from "mobx-react";
import {StoreContext} from "../models";
import {useForm} from "react-hook-form";
import {Alert} from "antd";
import CSS from "csstype";

type leagueConfig = {
    leagueName: string;
    email: string;
};


export const Home: React.FunctionComponent = observer(() => {

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
    }
            `,
                undefined
            )
        });


        const formStyles: CSS.Properties = {
            backgroundColor: '#d4380d',
            display: "block",
            border: '0px',
            margin: '10px',
            borderRadius: '4px',
            padding: '0.5rem',
            fontSize: '14px',
            color: '#fff2e8',
        };

        const buttonStyles: CSS.Properties = {
            backgroundColor: '#ad2102',
            margin: '5px',
            marginLeft: '10px',
            border: '0px',
            borderRadius: '12px',
            fontSize: '14px',
            color: '#fff2e8',
            width: '20vh',
            padding: '8px',
        };

        if (store.User == undefined) return <div>loading</div>;
        if (store.User.league) return <h1>Welcome to, {store.User.league.leagueName}!</h1>
        else {
            return (
                <form onSubmit={onSubmit}>
                    <label>League Name</label>
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

                </form>
            );
        }
    }
)

export default Home;

import React, {useReducer, useEffect, useContext} from 'react';
import {Alert, Button, Card, Input, Space} from 'antd';
import CSS from "csstype";
import { useHistory } from "react-router-dom";
import {StoreContext} from "../models";
import {observer} from "mobx-react";


const buttonStyles: CSS.Properties = {
    backgroundColor: '#ad2102',
    border: '0px',
    borderRadius: '12px',
    marginBottom: '8px',
    fontSize: '14px',
    color: '#fff2e8',
    width: '100%'
};

//state type

type State = {
    email: string
    password: string
    isError: boolean
};

const initialState: State = {
    email: '',
    password: '',
    isError: false
};

type Action =
    | { type: 'setEmail', payload: string }
    | { type: 'setPassword', payload: string }
    | { type: 'setIsError', payload: boolean };

const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'setEmail':
            return {
                ...state,
                email: action.payload
            };
        case 'setPassword':
            return {
                ...state,
                password: action.payload
            };
        case 'setIsError':
            return {
                ...state,
                isError: action.payload
            };
    }
}

const LoginForm: React.FunctionComponent = observer(() => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const history = useHistory();
    const store = useContext(StoreContext)

    const handleLogin = (e: any, data: any) => {

        e.preventDefault();
        fetch('http://localhost:8000/token-auth/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(res)
            })
            .then(json => {
                console.log(json)
                localStorage.setItem('token', json.token);
                localStorage.setItem('email', json.user.email);
                store.setUser(json.user.email).then(r => console.log("SET USER"));
                store.setIsLoggedIn(true)
                history.push('/Home');
            })
            .catch((response) => {
                console.log(response.status, response.statusText);
                dispatch({type: 'setIsError', payload: true})
            });
    };

    const handleEmailChange: React.ChangeEventHandler<HTMLInputElement> =
        (event) => {
            dispatch({
                type: 'setEmail',
                payload: event.target.value
            });
        };

    const handlePasswordChange: React.ChangeEventHandler<HTMLInputElement> =
        (event) => {
            dispatch({
                type: 'setPassword',
                payload: event.target.value
            });
        }
    return (
        <form style={{textAlign: 'center', marginTop: '20px'}} noValidate autoComplete="off">
            <Card style={{display: 'inline-block', width: '30%'}} title="Login">
                <Space direction="vertical">
                    <Input
                        id="email"
                        type="email"
                        placeholder="Email"
                        onChange={handleEmailChange}
                    />
                    <Input
                        id="password"
                        type="password"
                        placeholder="Password"
                        onChange={handlePasswordChange}
                    />
                    <Button
                        size="large"
                        color="primary"
                        style={buttonStyles}
                        onClick={(e) => handleLogin(e, state)}>
                        Login
                    </Button>
                    {state.isError ?
                        <Alert
                            message="Login Failed"
                            description=""
                            type="error"
                            showIcon
                            closable
                            onClose={() => {
                                dispatch({
                                    type: 'setIsError',
                                    payload: false
                                })
                            }}
                        /> : null}
                </Space>
            </Card>
        </form>
    );
})

export default LoginForm;
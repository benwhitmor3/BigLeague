import React, {useReducer, useContext} from 'react';
import {Alert, Button, Card, Input, Space} from 'antd';
import {useNavigate} from 'react-router-dom';
import {StoreContext} from "../models";
import {observer} from "mobx-react";
import {buttonStyles} from "./Molecules/Create/CreateStyles";


//state type (using redux for practice)
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
    const navigate = useNavigate();

    const store = useContext(StoreContext)

    const handleLogin = (e: any, data: any) => {
        // this is for switching local between react and backend static local (3000 vs. 8000)
        let link = '';
        if (window.location.port === '3000') {
            link = window.location.hostname + ':8000'
        } else {
            link = window.location.host
        }
        e.preventDefault();
        fetch(window.location.protocol + "//" + link + '/token-auth/', {
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
                localStorage.setItem('token', json.access);
                localStorage.setItem('refresh', json.refresh);
                localStorage.setItem('email', data.email);
                store.setUser(data.email).then(() => console.log("SET USER"));
                store.setIsLoggedIn(true)
                navigate('/Home');
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
                        // @ts-ignore
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

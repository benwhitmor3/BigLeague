import React, {useReducer, useEffect} from 'react';
import {Alert, Button, Card, Input, Space} from 'antd';
import CSS from "csstype";
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
    username: string
    email: string
    password: string
    isButtonDisabled: boolean
    isError: boolean
};

const initialState: State = {
    username: '',
    email: '',
    password: '',
    isButtonDisabled: true,
    isError: false
};

type Action = { type: 'setUsername', payload: string }
    | { type: 'setEmail', payload: string }
    | { type: 'setPassword', payload: string }
    | { type: 'setIsButtonDisabled', payload: boolean }
    | { type: 'setIsError', payload: boolean };

const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'setUsername':
            return {
                ...state,
                username: action.payload
            };
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
        case 'setIsButtonDisabled':
            return {
                ...state,
                isButtonDisabled: action.payload
            };
        case 'setIsError':
            return {
                ...state,
                isError: action.payload
            };
    }
}

const SignupForm: React.FunctionComponent = observer(() => {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        if (state.username.trim() && state.password.trim()) {
            dispatch({
                type: 'setIsButtonDisabled',
                payload: false
            });
        } else {
            dispatch({
                type: 'setIsButtonDisabled',
                payload: true
            });
        }
    }, [state.username, state.password]);

    const handleSignup = (e: any, data: any) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(state.email) && state.username.length < 30 && state.password) {

            e.preventDefault();
            fetch('http://localhost:8000/users/', {
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
                    localStorage.setItem('token', json.token);
                })
            .catch((response) => {
            console.log(response.status, response.statusText);
            dispatch({type: 'setIsError', payload: true})
    });
        } else {
            dispatch({type: 'setIsError', payload: true})
        }
    };


    const handleEmailChange: React.ChangeEventHandler<HTMLInputElement> =
        (event) => {
            dispatch({
                type: 'setEmail',
                payload: event.target.value
            });
        };

    const handleUsernameChange: React.ChangeEventHandler<HTMLInputElement> =
        (event) => {
            dispatch({
                type: 'setUsername',
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
            <Card style={{display: 'inline-block', width: '30%'}} title="Register">
                <Space direction="vertical">
                    <Input
                        id="email"
                        type="email"
                        placeholder="Email"
                        onChange={handleEmailChange}
                    />
                    <Input
                        id="username"
                        type="username"
                        placeholder="Username"
                        onChange={handleUsernameChange}
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
                        onClick={(e) => handleSignup(e, state)}
                        disabled={state.isButtonDisabled}>
                        Sign Up
                    </Button>
                    {state.isError ?
                        <Alert
                            message="Sign Up Failed"
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
}
)

export default SignupForm;
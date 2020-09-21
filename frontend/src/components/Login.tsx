import * as React from "react";
import { useForm } from "react-hook-form";
import 'antd/dist/antd.css';
import { Alert } from 'antd';
import CSS from 'csstype';

type loginConfig = {
  username: string
  password: string;
};

export default function Login() {
    const {register, handleSubmit, errors} = useForm<loginConfig>();
    const onSubmit = handleSubmit(({username, password}: loginConfig) => {
        console.log(username, password);
    });

    const onClose = (e: any) => {
        console.log(e, 'I was closed.');
    };

    const formStyles: CSS.Properties = {
        backgroundColor: '#d4380d',
        display: "block",
        border: '0px',
        margin: '10px',
        borderRadius: '4px',
        padding: '0.5rem',
        fontSize: '14px',
        color: '#fff2e8',
        width: '30vh',
    };

    const buttonStyles: CSS.Properties = {
        backgroundColor: '#ad2102',
        margin: '5px',
        marginLeft: '10px',
        border: '0px',
        borderRadius: '12px',
        fontSize: '14px',
        color: '#fff2e8',
        width: '30vh',
    };


    return (
        <form onSubmit={onSubmit}>

            <label>Username</label>
            <input name="username" style={formStyles} ref={register({
                required: {
                    value: true,
                    message: "Username is a required field",
                },
                maxLength: {
                    value: 60,
                    message: 'Max username length is 60',
                },
            })}/>

            <label>Password</label>
            <input name="password" style={formStyles} ref={register({
                required: {
                    value: true,
                    message: "Password is a required field",
                },
            })}/>

            <input type="submit"  style={buttonStyles} value="Login"/>

            <br/> {errors.username && <Alert message={errors.username.message} type="error" closable onClose={onClose}/>}
            <br/>
            <br/> {errors.password && <Alert message={errors.password.message} type="error" closable onClose={onClose}/>}
            <br/>

        </form>
    )
};
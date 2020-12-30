import * as React from "react";
import { useForm } from "react-hook-form";
import 'antd/dist/antd.css';
import { Alert } from 'antd';
import CSS from 'csstype';
import {useContext} from "react";
import {StoreContext} from "../../models";

type registrationConfig = {
  email: string;
  username: string
  password: string;
};

export default function Register() {
    const {register, handleSubmit, errors} = useForm<registrationConfig>();
    const store = useContext(StoreContext)

    const onSubmit = handleSubmit(({email, username, password}: registrationConfig) => {
      store.mutateCreateUser({"email": email, "username": username, "password": password},
          `
      message
        user {
          id
          email
          username
          password
        }
      `,
       )
        console.log(email, username, password);
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
            <label>Email</label>
            <input name="email" style={formStyles} ref={register({
                required: {
                    value: true,
                    message: "Email is a required field",
                },
                pattern: {
                    value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                    message: 'Invalid email address',
                },
                maxLength: {
                    value: 60,
                    message: 'Max email length is 60',
                },
            })}/>

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

            <input type="submit"  style={buttonStyles} value="Register"/>

            <br/> {errors.email && <Alert message={errors.email.message} type="error" closable onClose={onClose}/>}
            <br/>
            <br/> {errors.username && <Alert message={errors.username.message} type="error" closable onClose={onClose}/>}
            <br/>
            <br/> {errors.password && <Alert message={errors.password.message} type="error" closable onClose={onClose}/>}
            <br/>

        </form>
    )
};
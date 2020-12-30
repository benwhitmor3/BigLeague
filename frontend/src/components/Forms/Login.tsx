import * as React from "react";
import { useForm } from "react-hook-form";
import 'antd/dist/antd.css';
import { Alert } from 'antd';
import CSS from 'csstype';
import {observer} from "mobx-react";
import {useQuery} from "../../models";
import {getToken, setToken} from "./token";
import {ObtainJsonWebTokenModelType } from"../../models"

type loginConfig = {
  email: string
  password: string;
};

export const Login: React.FunctionComponent = observer(() => {
    const {register, handleSubmit, errors} = useForm<loginConfig>();
    const {store} = useQuery()
    const onSubmit = handleSubmit(({email, password}: loginConfig) => {
        console.log(email, password);
        store.mutateTokenAuth(
        {
            // email: "ben-whitmore@hotmail.com", password: "password",
		"email": email,
        "password": password,
                },
        "token",
        ).then((token : {tokenAuth: ObtainJsonWebTokenModelType} ) => {
        if (token) {
          setToken(token)
          console.log(token)
          getToken()
        }
      },reason => {
          console.log(reason)
          return alert("Invalid Credentials")
        }
    );
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

            {/*<label>Username</label>*/}
            {/*<input name="username" style={formStyles} ref={register({*/}
            {/*    required: {*/}
            {/*        value: true,*/}
            {/*        message: "Username is a required field",*/}
            {/*    },*/}
            {/*    maxLength: {*/}
            {/*        value: 60,*/}
            {/*        message: 'Max username length is 60',*/}
            {/*    },*/}
            {/*})}/>*/}

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

            <label>Password</label>
            <input name="password" type="password" style={formStyles} ref={register({
                required: {
                    value: true,
                    message: "Password is a required field",
                },
            })}/>

            <input type="submit"  style={buttonStyles} value="Login"/>

            <br/> {errors.email && <Alert message={errors.email.message} type="error" closable onClose={onClose}/>}
            <br/>
            <br/> {errors.password && <Alert message={errors.password.message} type="error" closable onClose={onClose}/>}
            <br/>

        </form>
    )
}
)

export default Login;
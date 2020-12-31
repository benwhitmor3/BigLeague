import * as React from "react";
import {useEffect} from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import 'antd/dist/antd.css';
import { Alert } from 'antd';
import CSS from 'csstype';
import {observer} from "mobx-react";
import {StoreContext, useQuery, VerifyModelType} from "../../models";
import {deleteToken, getToken, setToken} from "./token";
import {ObtainJsonWebTokenModelType } from"../../models"
import {useContext} from "react";

type loginConfig = {
  email: string
  password: string;
  data: any
};

export const Login: React.FunctionComponent = observer((props) => {
    const {register, handleSubmit, errors} = useForm<loginConfig>();
    const history = useHistory();
    const store = useContext(StoreContext)

    const onSubmit = handleSubmit(({email, password}: loginConfig) => {
        store.mutateTokenAuth(
        {
            // email: "ben-whitmore@hotmail.com", password: "password",
		"email": email,
        "password": password,
                },
        "token",
        ).then((token : {tokenAuth: ObtainJsonWebTokenModelType} ) => {
        if (token) {
          setToken(token.tokenAuth['token'])
          history.push("/Home");
          store.setUser(email)
        }
      },reason => {
          console.log(reason)
          return alert("Invalid Credentials")
        }
    );

    const token: any = getToken()
    store.mutateVerifyToken({
                "token": token,
            },
            'payload'
        ).then((payload: {verifyToken: VerifyModelType}) => {
            if (payload) {
                console.log(payload)
                localStorage.setItem('email', payload.verifyToken.payload.email)
            }
        },(reason) => {
          console.log(reason)
        })
    });

    const onClose = (e: any) => {
        console.log(e, 'Error was closed.');
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
import React, {useState} from 'react';
import CSS from "csstype";
import {getToken, setToken} from "./token";
import {useQuery, VerifyModelType} from "../../models";
import {observer} from "mobx-react";

export const TeamInfo: React.FunctionComponent = observer(() => {

    const {store} = useQuery()
    const [email, setEmail] = useState(localStorage.getItem('email'))
    // const email = localStorage.getItem('email');
    const onSubmit = () => {
        const token: any = getToken()
        console.log(token)
        store.mutateVerifyToken({
                "token": token,
            },
            'payload'
        ).then((payload: {verifyToken: VerifyModelType}) => {
            if (payload) {
                console.log(payload)
                localStorage.setItem('email', payload.verifyToken.payload.email)
                console.log(payload.verifyToken.payload.email)
                setEmail(payload.verifyToken.payload.email)
            }
        },(reason) => {
          console.log(reason)
        })
    }

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

    return (
    <div>
        <input type="submit" onClick={onSubmit} style={buttonStyles} value="Team Info"/>
        {email}
    </div>
    );
    }
)

export default TeamInfo;
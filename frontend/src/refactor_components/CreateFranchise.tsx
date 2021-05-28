import React, {useContext} from 'react';
import {observer} from "mobx-react";
import {StoreContext} from "../models";
import {useForm} from "react-hook-form";
import {Alert} from "antd";
import CSS from "csstype";

type franchiseConfig = {
    franchiseName: any;
};


interface ICreate {
    setFranchise: any;
}

export const CreateFranchise: React.FunctionComponent<ICreate> = observer(({setFranchise} : ICreate) => {

        const store = useContext(StoreContext)
        const {register, handleSubmit, errors} = useForm<franchiseConfig>();
        const onSubmit = handleSubmit(({franchiseName}: franchiseConfig) => {
            console.log(franchiseName);
            store.mutateCreateFranchise({
                        "email": store.User.email,
                        "franchiseInput": {
                            "franchise": franchiseName
                        }
                    },
                `
                    franchise{
                          __typename
                          id
                          franchise
                          gm{
                            __typename
                            id
                            trait
                          }
                          coach{
                            __typename
                            id
                            name
                          }
                        }
                        user{
                          __typename
                          id
                          password
                          email
                          franchise{
                            __typename
                            id
                            franchise
                            user{
                              __typename
                              id
                            }
                          }
                        } 
            `,
                undefined
            ).then(data => setFranchise(data.createFranchise.user.franchise))
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

        if (store.User == undefined) return <div>Missing User</div>;
        else {
            return (
                <form onSubmit={onSubmit}>
                    <label>Franchise Name</label>
                    <input name="franchiseName" style={formStyles} ref={register({
                        required: {
                            value: true,
                            message: "Franchise name is a required field",
                        },
                        maxLength: {
                            value: 25,
                            message: 'Max Franchise name length is 25',
                        },
                    })}/>

                    <input type="submit" style={buttonStyles} value="Create Franchise"/>

                <br/> {errors.franchiseName && <Alert message={errors.franchiseName.message} type="error" closable/>}
                    <br/>

                </form>
            );
        }
    }
)

export default CreateFranchise;

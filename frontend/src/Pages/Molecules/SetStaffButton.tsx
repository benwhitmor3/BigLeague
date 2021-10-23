import React, {useContext, useState} from 'react';
import 'antd/dist/antd.css';
import {Button, Progress} from 'antd';
import {observer} from "mobx-react";
import axios from "axios";
import {StoreContext} from "../../models";
import CSS from "csstype";


const buttonStyles: CSS.Properties = {
    backgroundColor: '#ad2102',
    border: '0px',
    borderRadius: '12px',
    marginBottom: '8px',
    fontSize: '14px',
    color: '#fff2e8',
};

export const SetStaffButton: React.FunctionComponent = observer(() => {

        const store = useContext(StoreContext)

        const [loading, setLoading] = useState<boolean>(false)
        const [percent, setPercent] = useState<number>(0)

        const setLineups = () => {
            const data = new FormData();
            data.append("franchise_id", store.User.franchise.id)
            setLoading(true)
            setPercent(50)
            axios.post('http://127.0.0.1:8000/set_staff', data)
                .then(res => {
                    console.log(res.data)
                    store.queryUser(
                    {email: "email@email.com"},
                        `__typename
                                      id
                                      franchise{
                                        __typename
                                        id
                                        league{
                                          __typename
                                          id
                                          franchiseSet{
                                            __typename
                                            id
                                            playerSet{
                                              __typename
                                              id
                                              name
                                              suit
                                              age
                                              pv
                                              epv
                                              sEpv
                                              contract
                                              tOption
                                              pOption
                                              renew
                                              salary
                                              grade
                                              year
                                              trainer
                                              lineup
                                            }
                                            gm{
                                                __typename
                                                id
                                                trait
                                            }
                                            coach{
                                                __typename
                                                id
                                                name
                                                attributeOne
                                                attributeTwo
                                                franchise{
                                                    __typename
                                                    id
                                                }
                                            }
                                          }
                                        }
                                      }`
                    )
                    setLoading(false)
                })
                .catch(err => {
                    console.log(err)
                    setLoading(false)
                })
        };


        if (loading) return (
            <div>
                <h3>Setting Staff</h3>
                <Progress strokeColor={{'0%': '#108ee9', '100%': '#87d068',}} percent={percent}/>
            </div>
        )
        else {
            return (
                <div>
                    <Button type="primary" style={buttonStyles} onClick={() => setLineups()} block>
                        Set Bots Staff
                    </Button>
                </div>
            );
        }
    }
)

export default SetStaffButton;
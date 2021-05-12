import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
import 'antd/dist/antd.css';
import {Card} from 'antd';
import {StoreContext} from "../models";
import {observer} from "mobx-react";


export const DraftOrder: React.FunctionComponent = observer(() => {

        const store = useContext(StoreContext)

        const [bestplayer, setBestPlayer] = useState<string>()
        const [draftorder, setTeamOrder] = useState<Array<string>>()
        const [selectedfranchise, setSelectedFranchise] = useState<string>()

        useEffect(() => {
            const data = new FormData();
            data.append("franchise_id", store.User.franchise.id)
            axios.post('http://127.0.0.1:8000/draft_optimize', data)
                .then(res => {
                    console.log(res.data)
                    setBestPlayer(res.data.best_player)
                })
                .catch(err => {
                    console.log(err)
                })
        }, [])

        useEffect(() => {
            const data = new FormData();
            data.append("franchise_id", store.User.franchise.id)
            data.append("season", '1')
            axios.post('http://127.0.0.1:8000/draft_order', data)
                .then(res => {
                    console.log(res.data)
                    setTeamOrder(res.data.draft_order)
                    store.User.franchise.league.setDraftingFranchise(res.data.draft_order[0])
                })
                .catch(err => {
                    console.log(err)
                })
        }, [])


        if (store.User == undefined || store.User.franchise == undefined) return <div> loading</div>;
        else {
            return (
                <div>
                    {bestplayer}
                    {draftorder ? draftorder.map((name, index) => {
                        let number = (index + 1)
                        return <Card title={number + ' ' + name} hoverable onClick={() => store.User.league.setDraftingFranchise(name)}
                                     key={index} style={{width: '12%', marginBottom: '20px', display: 'inline-flex'}}>
                            </Card>
                        }
                        )
                        : null
                    }

                </div>
            );
        }
    }
)

export default DraftOrder;
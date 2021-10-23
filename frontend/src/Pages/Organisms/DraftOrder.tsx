import React, {useContext, useEffect} from 'react';
import 'antd/dist/antd.css';
import {Card, Button, Statistic, Tag} from 'antd';
import {FranchiseTypeModelType, StoreContext} from "../../models";
import {observer} from "mobx-react";
import {colour, suit_icon} from "../Utils/TableFunctions";
import {mutateCreatePlayerQuery} from "../Utils/queries";


export const DraftOrder: React.FunctionComponent = observer(() => {

        const store = useContext(StoreContext)

        const draft_order_border = (name: string | undefined) => {

            if (store.User.league.draftingFranchise && store.User.league.draftingFranchise.franchise == name) {
                return '2px dashed #ffc300'
            } else
                return '1px solid #ffffff'
        }

        const draftSim = (franchise: FranchiseTypeModelType, player: any) => {
            store.mutateCreatePlayer({
                    "playerInput": {
                        "name": player.name,
                        "suit": player.suit,
                        "age": player.age,
                        "pv": player.pv,
                        "epv": player.epv,
                        "sEpv": player.sEpv,
                        "contract": undefined,
                        "tOption": undefined,
                        "pOption": undefined,
                        "renew": undefined,
                        "salary": undefined,
                        "grade": undefined,
                        "lineup": "bench",
                        "franchiseId": store.User.franchise.league.draftingFranchise.id,
                        "trainer": false,
                        "year": player.year,
                        "leagueId": store.User.franchise.league.id
                    }
                }, mutateCreatePlayerQuery,
                undefined
            );
            try {
                // make next franchise in draft order draftingFranchise
                store.User.league.setDraftingFranchise(store.User.league.draftOrder[store.User.league.draftOrder.indexOf(franchise) + 1])
            } catch (exception_var) {
                // if at the end of draft order reset to beginning
                store.User.league.setDraftingFranchise(store.User.league.draftOrder[0])
            }
        }

        useEffect(() => {
            if (!store.User.franchise.league.draftingFranchise) {
                store.User.franchise.league.setDraftingFranchise(store.User.league.draftOrder[0])
            }
        }, [])


        if (store.User == undefined || store.User.franchise == undefined) return <div> loading</div>;
        else {
            return (
                <div>
                    {store.User.league.bestDraftPlayer ?
                    <Button type="primary" onClick={() => draftSim(store.User.league.draftingFranchise, store.User.league.bestDraftPlayer)} block>
                        Draft Sim
                    </Button> :
                        null}

                    {(store.User.league.bestDraftPlayer && store.User.league.draftingFranchise !== store.User.franchise) ?
                        <Statistic
                            style={{
                                display: "block", marginLeft: 'auto', marginRight: 'auto',
                                padding: '10px',
                                boxShadow: "0px 0px 4px 0px #D0D8F3",
                                borderRadius: "4px",
                                marginTop: "15px",
                                textAlign: 'center',
                            }}
                            value={store.User.league.bestDraftPlayer.name}
                            valueStyle={{color: '#414141'}}
                            prefix={<Tag icon={suit_icon(store.User.league.bestDraftPlayer.suit)}
                                         color={colour(store.User.league.bestDraftPlayer.suit)}
                                         key={store.User.league.bestDraftPlayer.suit}>
                                {store.User.league.bestDraftPlayer.suit.toUpperCase()}
                            </Tag>}
                        />
                        : null}


                    {store.User.league.draftOrder ? store.User.league.draftOrder.map((franchise: FranchiseTypeModelType, index: number) => {
                            let number = (index + 1)
                            return <Card hoverable
                                         onClick={() =>
                                             store.User.league.setDraftingFranchise(franchise)
                                         }
                                         key={index} style={{
                                width: '12.5%', marginTop: '20px', marginBottom: '20px', display: 'inline-flex',
                                border: draft_order_border(franchise.franchise)
                            }}>
                                <span>{number + ' ' + franchise.franchise}</span>
                                <span>{" –– Players: " + store.User.league.franchiseplayers(franchise.franchise).length}</span>
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
import React, {useContext, useEffect} from 'react';
import 'antd/dist/antd.css';
import {Card} from 'antd';
import {FranchiseTypeModelType, StoreContext} from "../../models";
import {observer} from "mobx-react";

export const DraftOrder: React.FunctionComponent = observer(() => {

        const store = useContext(StoreContext)

        const draft_order_border = (name: string | undefined) => {

            if (store.User.league.draftingFranchise && store.User.league.draftingFranchise.franchise == name) {
                return '2px dashed #ffc300'
            } else
                return '1px solid #ffffff'
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

                    {store.User.league.draftOrder ? store.User.league.draftOrder.map((franchise: FranchiseTypeModelType, index: number) => {
                            let number = (index + 1)
                            return <Card
                                hoverable
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
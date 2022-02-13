import React, {useContext} from 'react';
import 'antd/dist/antd.css';
import {Button} from 'antd';
import {observer} from "mobx-react";
import {FranchiseTypeModelType, StoreContext} from "../../../models";
import {simButtonStyles} from "./SimButtonStyles";
import {mutateCreatePlayerQuery} from "../../Utils/queries";

export const DraftButton: React.FunctionComponent = observer(() => {

        const store = useContext(StoreContext)


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


        return (
            <div>
                {store.User.league.bestDraftPlayer ?
                    <Button style={simButtonStyles}
                            onClick={() => draftSim(store.User.league.draftingFranchise, store.User.league.bestDraftPlayer)}
                            block>
                        Draft Sim
                    </Button> :
                    <h1 style={{textAlign: 'center'}}>
                        Go to OffSeason
                    </h1>
                }
            </div>
        );
    }
)

export default DraftButton;
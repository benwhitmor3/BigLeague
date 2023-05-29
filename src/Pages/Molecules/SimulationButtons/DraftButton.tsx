import React, {useContext, useState} from 'react';
import 'antd/dist/antd.css';
import {Button} from 'antd';
import {observer} from "mobx-react";
import {FranchiseTypeModelType, StoreContext} from "../../../models";
import {simButtonStyles} from "./SimButtonStyles";
import {mutateCreatePlayerQuery} from "../../Utils/queries";

export const DraftButton: React.FunctionComponent = observer(() => {

        const store = useContext(StoreContext)
        const [simulatingDraft, setSimulatingDraft] = useState<boolean>(false)


        const draftSimRepeat = (franchise: FranchiseTypeModelType, player: any) => {
            setSimulatingDraft(true)
            let timeForEachPick: number = 750;
            let currentTeamIndex: number = store.User.league.draftOrder.indexOf(franchise)
            let userTeamIndex: number = store.User.league.draftOrder.indexOf(store.User.franchise)
            let numOfPicks: number

            if (userTeamIndex > currentTeamIndex) {
                numOfPicks = userTeamIndex - currentTeamIndex
            } else {
                numOfPicks = Math.abs(store.User.league.franchiseSet.length - currentTeamIndex + userTeamIndex)
            }

            if (store.User.league.draftClassRemaining < numOfPicks) {
                numOfPicks = store.User.league.draftClassRemaining
            }

            setTimeout(function () {
                setSimulatingDraft(false)
            }, timeForEachPick * numOfPicks);

            function draftRepeater(i: any) {
                setTimeout(function () {
                    franchise = store.User.league.draftingFranchise
                    player = store.User.league.bestDraftPlayer
                    draftSim(franchise, player)
                }, timeForEachPick * i);
            }

            for (let i = 0; i < numOfPicks; i++) {
                draftRepeater(i);
            }
        }

        const setNextDraftingFranchise = (franchise: any) => {
            try {
                // make next franchise in draft order draftingFranchise
                store.User.league.setDraftingFranchise(store.User.league.draftOrder[store.User.league.draftOrder.indexOf(franchise) + 1])
            } catch (exception_var) {
                // if at the end of draft order reset to first franchise in list
                store.User.league.setDraftingFranchise(store.User.league.draftOrder[0])
            }
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
            ).then(response => {
                setNextDraftingFranchise(franchise)
            })
        }


        return (
            <div>
                {store.User.league.bestDraftPlayer ?
                    <>
                        {!simulatingDraft
                        ?
                            <Button style={simButtonStyles}
                                    onClick={() => draftSimRepeat(store.User.league.draftingFranchise, store.User.league.bestDraftPlayer)}
                                    block>
                                Draft Sim
                            </Button>
                        :
                            <p></p>
                        }

                    </>
                    :
                    <h1 style={{textAlign: 'center'}}>
                        Go to OffSeason
                    </h1>
                }
            </div>
        );
    }
)

export default DraftButton;

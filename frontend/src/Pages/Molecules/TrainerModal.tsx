import React, {useContext} from 'react';
import 'antd/dist/antd.css';
import {Modal, notification} from 'antd';
import {observer} from "mobx-react";
import {StoreContext} from "../../models";
import {mutateCreatePlayerQuery} from "../Utils/queries";

interface IVisible {
    trainerVisible: boolean;
    setTrainerVisible: (visible:boolean) => void;
    selectedplayer: any;
}

export const TrainerModal: React.FunctionComponent<IVisible> = observer(({ trainerVisible, setTrainerVisible, selectedplayer} : IVisible) => {

        const store = useContext(StoreContext)

        const actionError = (franchise: string | undefined) => {
            notification.error({
                message: 'Action Error',
                description: franchise + ' does not have enough actions to train',
                duration: 10,
            });
        };

        const train_player = () => {
                console.log("PLAYER TRAINED!");
                console.log(selectedplayer)
                if (selectedplayer.franchise.action.numberOfActions <= 0)
                    return actionError(selectedplayer.franchise.franchise);
            else {
                    store.mutateCreatePlayer({
                            "playerInput": {
                                "name": selectedplayer.name,
                                "suit": selectedplayer.suit,
                                "age": selectedplayer.age,
                                "pv": selectedplayer.pv,
                                "epv": selectedplayer.epv,
                                "sEpv": selectedplayer.sEpv,
                                "contract": selectedplayer.contract,
                                "tOption": selectedplayer.tOption,
                                "pOption": selectedplayer.pOption,
                                "renew": selectedplayer.renew,
                                "salary": selectedplayer.salary,
                                "grade": selectedplayer.grade,
                                "lineup": selectedplayer.lineup,
                                "franchiseId": selectedplayer.franchise.id,
                                "trainer": true,
                                "year": selectedplayer.year,
                                "leagueId": store.User.franchise.league.id
                            }
                        }, mutateCreatePlayerQuery,
                        undefined
                    ).then(() => store.mutateUpdateAction({
                            "actionInput": {
                                "numberOfActions": (selectedplayer.franchise.action.numberOfActions - 1),
                                "improvedBathrooms": selectedplayer.franchise.action.improvedBathrooms,
                                "improvedConcessions": selectedplayer.franchise.action.improvedConcessions,
                                "jumbotron": selectedplayer.franchise.action.jumbotron,
                                "upscaleBar": selectedplayer.franchise.action.upscaleBar,
                                "hallOfFame": selectedplayer.franchise.action.hallOfFame,
                                "improvedSeating": selectedplayer.franchise.action.improvedSeating,
                                "improvedSound": selectedplayer.franchise.action.improvedSound,
                                "partyDeck": selectedplayer.franchise.action.partyDeck,
                                "wiFi": selectedplayer.franchise.action.wiFi,
                                "fanNight": selectedplayer.franchise.action.fanNight,
                                "familyGame": selectedplayer.franchise.action.familyGame,
                                "doorPrizes": selectedplayer.franchise.action.doorPrizes,
                                "mvpNight": selectedplayer.franchise.action.mvpNight,
                                "paradeOfChampions": selectedplayer.franchise.action.paradeOfChampions,
                                "bribeTheRefs": selectedplayer.franchise.action.bribeTheRefs,
                                "easyRuns": selectedplayer.franchise.action.easyRuns,
                                "fanFactor": selectedplayer.franchise.action.fanFactor,
                                "trainPlayer": 2,
                                "farmSystem": false,
                                "fanFavourites": selectedplayer.franchise.action.fanFavourites,
                                "gourmetRestaurant": selectedplayer.franchise.action.gourmetRestaurant,
                                "beerGarden": selectedplayer.franchise.action.beerGarden,
                                "namingRights": selectedplayer.franchise.action.namingRights,
                                "eventPlanning": selectedplayer.franchise.action.eventPlanning,
                                "franchiseId": selectedplayer.franchise.id
                            }
                        }, `__typename
                                    action{
                                      __typename
                                      id
                                      franchise{
                                        __typename
                                        id
                                        user{
                                          __typename
                                          id
                                          franchise{
                                            __typename
                                            id
                                            action{
                                          __typename
                                          id
                                          numberOfActions
                                          improvedBathrooms
                                          improvedConcessions
                                          jumbotron
                                          upscaleBar
                                          hallOfFame
                                          improvedSeating
                                          improvedSound
                                          partyDeck
                                          wiFi
                                          fanNight
                                          familyGame
                                          doorPrizes
                                          mvpNight
                                          paradeOfChampions
                                          bribeTheRefs
                                          easyRuns
                                          fanFactor
                                          trainPlayer
                                          farmSystem
                                          fanFavourites
                                          gourmetRestaurant
                                          beerGarden
                                          namingRights
                                          eventPlanning
                                            }
                                         league{
                                          __typename
                                          id
                                          franchiseSet{
                                            __typename
                                            id
                                            action{
                                              __typename
                                              id
                                              numberOfActions
                                              improvedBathrooms
                                              improvedConcessions
                                              jumbotron
                                              upscaleBar
                                              hallOfFame
                                              improvedSeating
                                              improvedSound
                                              partyDeck
                                              wiFi
                                              fanNight
                                              familyGame
                                              doorPrizes
                                              mvpNight
                                              paradeOfChampions
                                              bribeTheRefs
                                              easyRuns
                                              fanFactor
                                              trainPlayer
                                              farmSystem
                                              fanFavourites
                                              gourmetRestaurant
                                              beerGarden
                                              namingRights
                                              eventPlanning
                                              franchise{
                                                __typename
                                                id
                                              }
                                            }
                                          }
                                        }
                                          }
                                        }
                                  }
                                }
                                `,
                        undefined
                    ))
                }
                setTrainerVisible(false);
            }

        return (
            <div>
                <Modal
                    title="Trainer"
                    centered
                    visible={trainerVisible}
                    onOk={() =>
                        train_player()
                    }
                    onCancel={() => setTrainerVisible(false)}
                    width={'600px'}
                >
                    <p>Are you sure you want to train {selectedplayer.name}?</p>
                </Modal>

            </div>
        );
    }
)

export default TrainerModal;
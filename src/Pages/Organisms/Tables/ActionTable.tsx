import React, {useContext, useEffect, useState} from 'react';
import 'antd/dist/antd.css';
import {Table, Checkbox, Button, Popconfirm} from 'antd';
import {ActionTypeModelType, FranchiseTypeModelType, StoreContext} from "../../../models";
import {observer} from "mobx-react";
import {IObservableArray, observable} from "mobx";
import {buttonStyles, tableStyles} from "./TableStyles";
import {userQuery} from "../../Utils/queries";
import {actionError} from "../../Atoms/notificationerrors";

interface IFranchise {
    franchise: FranchiseTypeModelType;
}

export const ActionTable: React.FunctionComponent<IFranchise> = observer(({franchise}: IFranchise) => {

        const store = useContext(StoreContext)
        const email: any = localStorage.getItem('email') ? localStorage.getItem('email') : '';

        let facilitatorBonus = 2

        // need this useEffect since state of selected actions not switching when change franchise
        useEffect(() => {
            setImprovedBathrooms(franchise.action.improvedBathrooms)
            setImprovedConcessions(franchise.action.improvedConcessions)
            setJumbotron(franchise.action.jumbotron)
            setUpscaleBar(franchise.action.upscaleBar)
            setHallOfFame(franchise.action.hallOfFame)
            setImprovedSeating(franchise.action.improvedSeating)
            setImprovedSound(franchise.action.improvedSound)
            setPartyDeck(franchise.action.partyDeck)
            setWiFi(franchise.action.wiFi)
            setFanNight(franchise.action.fanNight)
            setFamilyGame(franchise.action.familyGame)
            setDoorPrizes(franchise.action.doorPrizes)
            setMvpNight(franchise.action.mvpNight)
            setParadeOfChampions(franchise.action.paradeOfChampions)
            setBribeTheRefs(franchise.action.bribeTheRefs)
            setEasyRuns(franchise.action.easyRuns)
            setFanFactor(franchise.action.fanFactor)
            setFanFavourites(franchise.action.fanFavourites)
            setGourmetRestaurant(franchise.action.gourmetRestaurant)
            setBeerGarden(franchise.action.beerGarden)
            setNamingRights(franchise.action.namingRights)
            setEventPlanning(franchise.action.eventPlanning)
        }, [franchise])

        const [improvedBathrooms, setImprovedBathrooms] = useState<boolean | undefined>(franchise.action.improvedBathrooms)
        const [improvedConcessions, setImprovedConcessions] = useState<boolean | undefined>(franchise.action.improvedConcessions)
        const [jumbotron, setJumbotron] = useState<boolean | undefined>(franchise.action.jumbotron)
        const [upscaleBar, setUpscaleBar] = useState<boolean | undefined>(franchise.action.upscaleBar)
        const [hallOfFame, setHallOfFame] = useState<boolean | undefined>(franchise.action.hallOfFame)
        const [improvedSeating, setImprovedSeating] = useState<boolean | undefined>(franchise.action.improvedSeating)
        const [improvedSound, setImprovedSound] = useState<boolean | undefined>(franchise.action.improvedSound)
        const [partyDeck, setPartyDeck] = useState<boolean | undefined>(franchise.action.partyDeck)
        const [wiFi, setWiFi] = useState<boolean | undefined>(franchise.action.wiFi)
        const [fanNight, setFanNight] = useState<boolean | undefined>(franchise.action.fanNight)
        const [familyGame, setFamilyGame] = useState<boolean | undefined>(franchise.action.familyGame)
        const [doorPrizes, setDoorPrizes] = useState<boolean | undefined>(franchise.action.doorPrizes)
        const [mvpNight, setMvpNight] = useState<boolean | undefined>(franchise.action.mvpNight)
        const [paradeOfChampions, setParadeOfChampions] = useState<boolean | undefined>(franchise.action.paradeOfChampions)
        const [bribeTheRefs, setBribeTheRefs] = useState<boolean | undefined>(franchise.action.bribeTheRefs)
        const [easyRuns, setEasyRuns] = useState<boolean | undefined>(franchise.action.easyRuns)
        const [fanFactor, setFanFactor] = useState<boolean | undefined>(franchise.action.fanFactor)
        const [fanFavourites, setFanFavourites] = useState<boolean | undefined>(franchise.action.fanFavourites)
        const [gourmetRestaurant, setGourmetRestaurant] = useState<boolean | undefined>(franchise.action.gourmetRestaurant)
        const [beerGarden, setBeerGarden] = useState<boolean | undefined>(franchise.action.beerGarden)
        const [namingRights, setNamingRights] = useState<boolean | undefined>(franchise.action.namingRights)
        const [eventPlanning, setEventPlanning] = useState<boolean | undefined>(franchise.action.eventPlanning)


        const actionChecker = (franchise: any) => {
            let oldActions = [franchise.action.improvedBathrooms, franchise.action.improvedConcessions, franchise.action.jumbotron,
                franchise.action.upscaleBar, franchise.action.hallOfFame, franchise.action.improvedSeating, franchise.action.improvedSound,
                franchise.action.partyDeck, franchise.action.wiFi, franchise.action.fanNight, franchise.action.familyGame,
                franchise.action.doorPrizes, franchise.action.mvpNight, franchise.action.paradeOfChampions, franchise.action.bribeTheRefs,
                franchise.action.easyRuns, franchise.action.fanFactor, franchise.action.fanFavourites, franchise.action.gourmetRestaurant,
                franchise.action.beerGarden, franchise.action.namingRights, franchise.action.eventPlanning]
            let newActions = [improvedBathrooms, improvedConcessions, jumbotron, upscaleBar,
                hallOfFame, improvedSeating, improvedSound, partyDeck, wiFi, fanNight, familyGame, doorPrizes, mvpNight,
                paradeOfChampions, bribeTheRefs, easyRuns, fanFactor, fanFavourites, gourmetRestaurant, beerGarden,
                namingRights, eventPlanning]

            let oldTrue = oldActions.filter(x => x === true).length
            let newTrue = newActions.filter(x => x === true).length

            let numberOfActions = franchise.action.numberOfActions
            if (franchise.gm?.trait === "FACILITATOR") {
                // @ts-ignore
                numberOfActions += facilitatorBonus
            }


            let actionsSelected = newTrue - oldTrue
            // @ts-ignore
            if (actionsSelected > numberOfActions)
                return actionError(franchise.franchise);
            else {
                // @ts-ignore
                submitActions(actionsSelected)
            }
        }


        const submitActions = (actionsSelected: number) => {

            store.mutateUpdateAction({
                    "actionInput": {
                        // @ts-ignore
                        "numberOfActions": (franchise.action.numberOfActions - actionsSelected),
                        "improvedBathrooms": improvedBathrooms,
                        "improvedConcessions": improvedConcessions,
                        "jumbotron": jumbotron,
                        "upscaleBar": upscaleBar,
                        "hallOfFame": hallOfFame,
                        "improvedSeating": improvedSeating,
                        "improvedSound": improvedSound,
                        "partyDeck": partyDeck,
                        "wiFi": wiFi,
                        "fanNight": fanNight,
                        "familyGame": familyGame,
                        "doorPrizes": doorPrizes,
                        "mvpNight": mvpNight,
                        "paradeOfChampions": paradeOfChampions,
                        "bribeTheRefs": bribeTheRefs,
                        "easyRuns": easyRuns,
                        "fanFactor": fanFactor,
                        "trainPlayer": 2,
                        "farmSystem": false,
                        "fanFavourites": fanFavourites,
                        "gourmetRestaurant": gourmetRestaurant,
                        "beerGarden": beerGarden,
                        "namingRights": namingRights,
                        "eventPlanning": eventPlanning,
                        "franchiseId": franchise.id
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
            );
            // overkill query since mutation response not re-rendering action table correctly
            store.queryUser(
                {email: email},
                userQuery
            )
        }

        const columns = [
            {
                title: 'Actions',
                dataIndex: "numberOfActions",
                key: "numberOfActions",
                fixed: 'left',
                render: (numberOfActions: number) => (
                    ((franchise.gm?.trait === "FACILITATOR") ?
                            <span>{numberOfActions + facilitatorBonus}</span> :
                            <span>{numberOfActions}</span>
                    )
                )
            },
            {
                title: 'Imp. Bathrooms',
                dataIndex: "improvedBathrooms",
                key: "improvedBathrooms",
                render: (improvedBathrooms: boolean) => (
                    ((franchise.action.improvedBathrooms === true) ?
                            <div>
                                <span style={{color: "grey", marginRight: "5px"}}>used</span>
                                <Checkbox disabled defaultChecked={true}></Checkbox>
                            </div>
                            :
                            <Checkbox defaultChecked={improvedBathrooms}
                                      onChange={(e) => setImprovedBathrooms(e.target.checked)}></Checkbox>
                    )
                ),
            },
            {
                title: 'Imp. Concessions',
                dataIndex: "improvedConcessions",
                key: "improvedConcessions",
                render: (improvedConcessions: boolean) => (
                    ((franchise.action.improvedConcessions === true) ?
                            <div>
                                <span style={{color: "grey", marginRight: "5px"}}>used</span>
                                <Checkbox disabled defaultChecked={true}></Checkbox>
                            </div>
                            :
                            <Checkbox defaultChecked={improvedConcessions}
                                      onChange={(e) => setImprovedConcessions(e.target.checked)}></Checkbox>
                    )
                ),
            },
            {
                title: 'Jumbotron',
                dataIndex: "jumbotron",
                key: "jumbotron",
                render: (jumbotron: boolean) => (
                    ((franchise.action.jumbotron === true) ?
                            <div>
                                <span style={{color: "grey", marginRight: "5px"}}>used</span>
                                <Checkbox disabled defaultChecked={true}></Checkbox>
                            </div>
                            :
                            <Checkbox defaultChecked={jumbotron}
                                      onChange={(e) => setJumbotron(e.target.checked)}></Checkbox>
                    )
                ),
            },
            {
                title: 'Upscale Bar',
                dataIndex: "upscaleBar",
                key: "upscaleBar",
                render: (upscaleBar: boolean) => (
                    ((franchise.action.upscaleBar === true) ?
                            <div>
                                <span style={{color: "grey", marginRight: "5px"}}>used</span>
                                <Checkbox disabled defaultChecked={true}></Checkbox>
                            </div>
                            :
                            ((franchise.action.improvedConcessions === true) ?
                                    <Checkbox defaultChecked={upscaleBar}
                                              onChange={(e) => setUpscaleBar(e.target.checked)}></Checkbox>
                                    :
                                    <Checkbox disabled></Checkbox>
                            )
                    )
                ),
            },
            {
                title: 'Hall Of Fame',
                dataIndex: "hallOfFame",
                key: "hallOfFame",
                render: (hallOfFame: boolean) => (
                    ((franchise.action.hallOfFame === true) ?
                            <div>
                                <span style={{color: "grey", marginRight: "5px"}}>used</span>
                                <Checkbox disabled defaultChecked={true}></Checkbox>
                            </div>
                            :
                            // @ts-ignore
                            ((franchise.championships > 0) ?
                                    <Checkbox defaultChecked={hallOfFame}
                                              onChange={(e) => setHallOfFame(e.target.checked)}></Checkbox>
                                    :
                                    <Checkbox disabled></Checkbox>
                            )
                    )
                ),
            },
            {
                title: 'Imp. Seating',
                dataIndex: "improvedSeating",
                key: "improvedSeating",
                render: (improvedSeating: boolean) => (
                    ((franchise.action.improvedSeating === true) ?
                            <div>
                                <span style={{color: "grey", marginRight: "5px"}}>used</span>
                                <Checkbox disabled defaultChecked={true}></Checkbox>
                            </div>
                            :
                            <Checkbox defaultChecked={improvedSeating}
                                      onChange={(e) => setImprovedSeating(e.target.checked)}></Checkbox>
                    )
                ),
            },
            {
                title: 'Imp. Sound',
                dataIndex: "improvedSound",
                key: "improvedSound",
                render: (improvedSound: boolean) => (
                    ((franchise.action.improvedSound === true) ?
                            <div>
                                <span style={{color: "grey", marginRight: "5px"}}>used</span>
                                <Checkbox disabled defaultChecked={true}></Checkbox>
                            </div>
                            :
                            <Checkbox defaultChecked={improvedSound}
                                      onChange={(e) => setImprovedSound(e.target.checked)}></Checkbox>
                    )
                ),
            },
            {
                title: 'Party Deck',
                dataIndex: "partyDeck",
                key: "partyDeck",
                render: (partyDeck: boolean) => (
                    ((franchise.action.partyDeck === true) ?
                            <div>
                                <span style={{color: "grey", marginRight: "5px"}}>used</span>
                                <Checkbox disabled defaultChecked={true}></Checkbox>
                            </div>
                            :
                            <Checkbox defaultChecked={partyDeck}
                                      onChange={(e) => setPartyDeck(e.target.checked)}></Checkbox>
                    )
                ),
            },
            {
                title: 'wiFi',
                dataIndex: "wiFi",
                key: "wiFi",
                render: (wiFi: boolean) => (
                    ((franchise.action.wiFi === true) ?
                            <div>
                                <span style={{color: "grey", marginRight: "5px"}}>used</span>
                                <Checkbox disabled defaultChecked={true}></Checkbox>
                            </div>
                            :
                            <Checkbox defaultChecked={wiFi} onChange={(e) => setWiFi(e.target.checked)}></Checkbox>
                    )
                ),
            },
            {
                title: 'Fan Night',
                dataIndex: "fanNight",
                key: "fanNight",
                render: (fanNight: boolean) => (
                    ((franchise.gm?.trait === "PROMOTER") ?
                            <Checkbox defaultChecked={fanNight} onChange={(e) => setFanNight(e.target.checked)}></Checkbox>
                            :
                            <Checkbox disabled></Checkbox>
                    )
                ),
            },
            {
                title: 'Family Game',
                dataIndex: "familyGame",
                key: "familyGame",
                render: (familyGame: boolean) => (
                    ((franchise.gm?.trait === "PROMOTER") ?
                            <Checkbox defaultChecked={familyGame}
                                      onChange={(e) => setFamilyGame(e.target.checked)}></Checkbox>
                            :
                            <Checkbox disabled></Checkbox>
                    )
                ),
            },
            {
                title: 'Door Prizes',
                dataIndex: "doorPrizes",
                key: "doorPrizes",
                render: (doorPrizes: boolean) => (
                    ((franchise.gm?.trait === "PROMOTER") ?
                            <Checkbox defaultChecked={doorPrizes}
                                      onChange={(e) => setDoorPrizes(e.target.checked)}></Checkbox>
                            :
                            <Checkbox disabled></Checkbox>
                    )
                ),
            },
            {
                title: 'MVP Night',
                dataIndex: "mvpNight",
                key: "mvpNight",
                render: (mvpNight: boolean) => (
                    // @ts-ignore
                    ((franchise.gm?.trait === "PROMOTER" && franchise.championships > 0) ?
                            <Checkbox defaultChecked={mvpNight} onChange={(e) => setMvpNight(e.target.checked)}></Checkbox>
                            :
                            <Checkbox disabled></Checkbox>
                    )
                ),
            },
            {
                title: 'Parade of Champions',
                dataIndex: "paradeOfChampions",
                key: "paradeOfChampions",
                render: (paradeOfChampions: boolean) => (
                    // @ts-ignore
                    ((franchise.gm?.trait === "PROMOTER" && franchise.championships > 0) ?
                            <Checkbox defaultChecked={paradeOfChampions}
                                      onChange={(e) => setParadeOfChampions(e.target.checked)}></Checkbox>
                            :
                            <Checkbox disabled></Checkbox>
                    )
                ),
            },
            {
                title: 'Easy Runs',
                dataIndex: "easyRuns",
                key: "easyRuns",
                render: (easyRuns: boolean) => (
                    ((franchise.action.easyRuns === true) ?
                            <div>
                                <span style={{color: "grey", marginRight: "5px"}}>used</span>
                                <Checkbox disabled defaultChecked={true}></Checkbox>
                            </div>
                            :
                            <Checkbox defaultChecked={easyRuns} onChange={(e) => setEasyRuns(e.target.checked)}></Checkbox>
                    )
                ),
            },
            {
                title: 'Fan Factor',
                dataIndex: "fanFactor",
                key: "fanFactor",
                render: (fanFactor: boolean) => (
                    // @ts-ignore
                    ((franchise.seasonSet[franchise.seasonSet.length - 1].fanIndex > 120) ?
                            <Checkbox defaultChecked={fanFactor}
                                      onChange={(e) => setFanFactor(e.target.checked)}></Checkbox>
                            :
                            <Checkbox disabled></Checkbox>
                    )
                ),
            },
            {
                title: 'Fan Favourites',
                dataIndex: "fanFavourites",
                key: "fanFavourites",
                render: (fanFavourites: boolean) => (
                    ((franchise.action.fanFavourites === true) ?
                            <Checkbox disabled defaultChecked={true}></Checkbox>
                            :
                            ((franchise.action.improvedConcessions === true) ?
                                    <Checkbox defaultChecked={fanFavourites}
                                              onChange={(e) => setFanFavourites(e.target.checked)}></Checkbox>
                                    :
                                    <Checkbox disabled></Checkbox>
                            )
                    )
                ),
            },
            {
                title: 'Gourmet Restaurant',
                dataIndex: "gourmetRestaurant",
                key: "gourmetRestaurant",
                render: (gourmetRestaurant: boolean) => (
                    ((franchise.action.gourmetRestaurant === true) ?
                            <div>
                                <span style={{color: "grey", marginRight: "5px"}}>used</span>
                                <Checkbox disabled defaultChecked={true}></Checkbox>
                            </div>
                            :
                            <Checkbox defaultChecked={gourmetRestaurant}
                                      onChange={(e) => setGourmetRestaurant(e.target.checked)}></Checkbox>
                    )
                ),
            },
            {
                title: 'Beer Garden',
                dataIndex: "beerGarden",
                key: "beerGarden",
                render: (beerGarden: boolean) => (
                    ((franchise.action.upscaleBar === true) ?
                            <Checkbox defaultChecked={beerGarden}
                                      onChange={(e) => setBeerGarden(e.target.checked)}></Checkbox>
                            :
                            <Checkbox disabled></Checkbox>
                    )
                ),
            },
            {
                title: 'Naming Rights',
                dataIndex: "namingRights",
                key: "namingRights",
                render: (namingRights: boolean) => (
                    ((franchise.action.namingRights === true) ?
                            <div>
                                <span style={{color: "grey", marginRight: "5px"}}>used</span>
                                <Checkbox disabled defaultChecked={true}></Checkbox>
                            </div>
                            :
                            <Checkbox defaultChecked={namingRights}
                                      onChange={(e) => setNamingRights(e.target.checked)}></Checkbox>
                    )
                ),
            },
            {
                title: 'Event Planning',
                dataIndex: "eventPlanning",
                key: "eventPlanning",
                render: (eventPlanning: boolean) => (
                    <Checkbox defaultChecked={eventPlanning}
                              onChange={(e) => setEventPlanning(e.target.checked)}></Checkbox>
                ),
            },
            {
                title: 'Confirm',
                key: "Confirm",
                fixed: 'right',
                render: () => (
                    <Popconfirm
                        title="Are you sure to choose these actions?"
                        onConfirm={() => actionChecker(franchise)}
                        okText="Yes"
                        cancelText="No"
                        placement="left"
                    >
                    <Button style={{...buttonStyles, ...{marginBottom: '12px', marginTop: '10px'}}}>
                        Confirm
                    </Button>
                    </Popconfirm>
                ),
            }
        ];

        let actions: IObservableArray<ActionTypeModelType> = observable([franchise.action])
        // hack to re-render number of actions when train player is used
        console.log(franchise.action.numberOfActions)

        if (store.User?.franchise?.action === undefined) return <div>loading</div>;
        else {
            return (
                <div>
                    <Table
                        // @ts-ignore
                        columns={columns} dataSource={actions} pagination={false}
                        rowKey="id"
                        bordered
                        scroll={{x: 'max-content'}}
                        style={tableStyles}
                    />
                </div>
            );
        }
    }
)

export default ActionTable;

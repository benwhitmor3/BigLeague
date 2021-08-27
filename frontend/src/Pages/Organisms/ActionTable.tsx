import React, {useContext, useState} from 'react';
import 'antd/dist/antd.css';
import {Table, Checkbox, Button} from 'antd';
import {ActionTypeModelType, FranchiseTypeModelType, StoreContext} from "../../models";
import {observer} from "mobx-react";
import {IObservableArray, observable} from "mobx";

interface IFranchise {
    franchise: FranchiseTypeModelType;
}

export const ActionTable: React.FunctionComponent<IFranchise> = observer(({franchise}: IFranchise) => {

        const store = useContext(StoreContext)

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
        // @ts-ignore
        const [championships, setChampionships] = useState<number>(franchise.seasonSet[franchise.seasonSet.length - 1].championships)


        const submitActions = () => {

            store.mutateUpdateAction({
                    "actionInput": {
                        // @ts-ignore
                        "numberOfActions": franchise.action.numberOfActions,
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
                                `,
                undefined
            );

            store.queryUser(
                {email: "email@email.com"},
                ` __typename
                                id
                                email
                                username
                                league{
                                  __typename
                                  id
                                }
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
                                    leagueName
                                    franchiseSet{
                                      __typename
                                      id
                                      franchise
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
                                    seasonSet{
                                      __typename
                                      id
                                      franchise{
                                        __typename
                                        id
                                        franchise
                                      }
                                      season
                                      ready
                                      wins
                                      losses
                                      ppg
                                      std
                                      championships
                                      bonuses
                                      penalties
                                      fanBase
                                      fanIndex
                                      advertising
                                      revenue
                                      expenses
                                    }
                                    }
                                  }
                                }`,
                undefined
            )

        }

        const columns = [
            {
                title: '# of Actions',
                dataIndex: "numberOfActions",
                key: "numberOfActions",
            },
            {
                title: 'Improved Bathrooms',
                dataIndex: "improvedBathrooms",
                key: "improvedBathrooms",
                render: (improvedBathrooms: boolean) => (
                    <Checkbox defaultChecked={improvedBathrooms}
                              onChange={(e) => setImprovedBathrooms(e.target.checked)}></Checkbox>
                ),
            },
            {
                title: 'Improved Concessions',
                dataIndex: "improvedConcessions",
                key: "improvedConcessions",
                render: (improvedConcessions: boolean) => (
                    <Checkbox defaultChecked={improvedConcessions}
                              onChange={(e) => setImprovedConcessions(e.target.checked)}></Checkbox>
                ),
            },
            {
                title: 'Jumbotron',
                dataIndex: "jumbotron",
                key: "jumbotron",
                render: (jumbotron: boolean) => (
                    <Checkbox defaultChecked={jumbotron} onChange={(e) => setJumbotron(e.target.checked)}></Checkbox>
                ),
            },
            {
                title: 'Upscale Bar',
                dataIndex: "upscaleBar",
                key: "upscaleBar",
                render: (upscaleBar: boolean) => (
                    <Checkbox defaultChecked={upscaleBar} onChange={(e) => setUpscaleBar(e.target.checked)}></Checkbox>
                ),
            },
            {
                title: 'Hall Of Fame',
                dataIndex: "hallOfFame",
                key: "hallOfFame",
                render: (hallOfFame: boolean) => (
                    <Checkbox defaultChecked={hallOfFame} onChange={(e) => setHallOfFame(e.target.checked)}></Checkbox>
                ),
            },
            {
                title: 'Improved Seating',
                dataIndex: "improvedSeating",
                key: "improvedSeating",
                render: (improvedSeating: boolean) => (
                    <Checkbox defaultChecked={improvedSeating}
                              onChange={(e) => setImprovedSeating(e.target.checked)}></Checkbox>
                ),
            },
            {
                title: 'Improved Sound',
                dataIndex: "improvedSound",
                key: "improvedSound",
                render: (improvedSound: boolean) => (
                    <Checkbox defaultChecked={improvedSound}
                              onChange={(e) => setImprovedSound(e.target.checked)}></Checkbox>
                ),
            },
            {
                title: 'Party Deck',
                dataIndex: "partyDeck",
                key: "partyDeck",
                render: (partyDeck: boolean) => (
                    <Checkbox defaultChecked={partyDeck} onChange={(e) => setPartyDeck(e.target.checked)}></Checkbox>
                ),
            },
            {
                title: 'wiFi',
                dataIndex: "wiFi",
                key: "wiFi",
                render: (wiFi: boolean) => (
                    <Checkbox defaultChecked={wiFi} onChange={(e) => setWiFi(e.target.checked)}></Checkbox>
                ),
            },
            {
                title: 'Fan Night',
                dataIndex: "fanNight",
                key: "fanNight",
                render: (fanNight: boolean) => (
                    ((franchise.gm?.trait == "PROMOTER") ?
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
                    ((franchise.gm?.trait == "PROMOTER") ?
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
                    ((franchise.gm?.trait == "PROMOTER") ?
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
                    ((franchise.gm?.trait == "PROMOTER" && championships > 0) ?
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
                    ((franchise.gm?.trait == "PROMOTER" && championships > 0) ?
                            <Checkbox defaultChecked={paradeOfChampions}
                                      onChange={(e) => setParadeOfChampions(e.target.checked)}></Checkbox>
                            :
                            <Checkbox disabled></Checkbox>
                    )
                ),
            },
            {
                title: 'Bribe The Refs',
                dataIndex: "bribeTheRefs",
                key: "bribeTheRefs",
                render: (bribeTheRefs: boolean) => (
                    <Checkbox defaultChecked={bribeTheRefs} onChange={(e) => setBribeTheRefs(e.target.checked)}></Checkbox>
                ),
            },
            {
                title: 'Easy Runs',
                dataIndex: "easyRuns",
                key: "easyRuns",
                render: (easyRuns: boolean) => (
                    <Checkbox defaultChecked={easyRuns} onChange={(e) => setEasyRuns(e.target.checked)}></Checkbox>
                ),
            },
            {
                title: 'Fan Factor',
                dataIndex: "fanFactor",
                key: "fanFactor",
                render: (fanFactor: boolean) => (
                    <Checkbox defaultChecked={fanFactor} onChange={(e) => setFanFactor(e.target.checked)}></Checkbox>
                ),
            },
            // {
            //     title: 'Train Player',
            //     dataIndex: "trainPlayer",
            //     key: "trainPlayer",
            // },
            // {
            //     title: 'Farm System',
            //     dataIndex: "farmSystem",
            //     key: "farmSystem",
            // },
            {
                title: 'Fan Favourites',
                dataIndex: "fanFavourites",
                key: "fanFavourites",
                render: (fanFavourites: boolean) => (
                    <Checkbox defaultChecked={fanFavourites}
                              onChange={(e) => setFanFavourites(e.target.checked)}></Checkbox>
                ),
            },
            {
                title: 'Gourmet Restaurant',
                dataIndex: "gourmetRestaurant",
                key: "gourmetRestaurant",
                render: (gourmetRestaurant: boolean) => (
                    <Checkbox defaultChecked={gourmetRestaurant}
                              onChange={(e) => setGourmetRestaurant(e.target.checked)}></Checkbox>
                ),
            },
            {
                title: 'Beer Garden',
                dataIndex: "beerGarden",
                key: "beerGarden",
                render: (beerGarden: boolean) => (
                    <Checkbox defaultChecked={beerGarden} onChange={(e) => setBeerGarden(e.target.checked)}></Checkbox>
                ),
            },
            {
                title: 'Naming Rights',
                dataIndex: "namingRights",
                key: "namingRights",
                render: (namingRights: boolean) => (
                    <Checkbox defaultChecked={namingRights} onChange={(e) => setNamingRights(e.target.checked)}></Checkbox>
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
                title: 'Submit',
                key: "submit",
                render: () => (
                    <Button onClick={submitActions}>
                        Confirm
                    </Button>
                ),
            },
        ];

        let actions: IObservableArray<ActionTypeModelType> = observable([franchise.action])

        if (store.User == undefined || store.User.franchise == undefined || store.User.franchise.action == undefined) return <div>loading</div>;
        else {
            return (
                <div>
                    <Table columns={columns} dataSource={actions} pagination={false}
                           rowKey="id"
                           bordered
                           style={{
                               boxShadow: "0px 0px 2px 0px #D0D8F3",
                           }}
                    />
                </div>
            );
        }
    }
)

export default ActionTable;
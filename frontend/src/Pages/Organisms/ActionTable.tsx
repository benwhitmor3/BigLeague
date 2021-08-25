import React, {useContext} from 'react';
import 'antd/dist/antd.css';
import {Space, Table, Tag, Checkbox} from 'antd';
import {FranchiseTypeModelType, PlayerTypeModelType, StoreContext} from "../../models";
import {observer} from "mobx-react";


interface IFranchise {
    franchise: FranchiseTypeModelType;
}


export const ActionTable: React.FunctionComponent<IFranchise> = observer(({franchise}: IFranchise) => {

        const store = useContext(StoreContext)


        const columns = [
            {
                title: 'Action',
                dataIndex: "numberOfActions",
                key: "numberOfActions",
            },
            {
                title: 'Improved Bathrooms',
                dataIndex: "improvedBathrooms",
                key: "improvedBathrooms",
                render: (improvedBathrooms: boolean) => (
                    (improvedBathrooms) ? (
                        <text>True</text>
                    ) : (
                        <text>False</text>
                    )
                ),
            },
            {
                title: 'Improved Concessions',
                dataIndex: "improvedConcessions",
                key: "improvedConcessions",
                render: (improvedConcessions: boolean) => (
                    (improvedConcessions) ? (
                        <text>True</text>
                    ) : (
                        <text>False</text>
                    )
                ),
            },
            {
                title: 'Jumbotron',
                dataIndex: "jumbotron",
                key: "jumbotron",
                render: (jumbotron: boolean) => (
                    (jumbotron) ? (
                        <text>True</text>
                    ) : (
                        <text>False</text>
                    )
                ),
            },
            {
                title: 'Upscale Bar',
                dataIndex: "upscaleBar",
                key: "upscaleBar",
                render: (upscaleBar: boolean) => (
                    (upscaleBar) ? (
                        <text>True</text>
                    ) : (
                        <text>False</text>
                    )
                ),
            },
            {
                title: 'Hall Of Fame',
                dataIndex: "hallOfFame",
                key: "hallOfFame",
                render: (hallOfFame: boolean) => (
                    (hallOfFame) ? (
                        <text>True</text>
                    ) : (
                        <text>False</text>
                    )
                ),
            },
            {
                title: 'Improved Seating',
                dataIndex: "improvedSeating",
                key: "improvedSeating",
                render: (improvedSeating: boolean) => (
                    (improvedSeating) ? (
                        <text>True</text>
                    ) : (
                        <text>False</text>
                    )
                ),
            },
            {
                title: 'Improved Sound',
                dataIndex: "improvedSound",
                key: "improvedSound",
                render: (improvedSound: boolean) => (
                    (improvedSound) ? (
                        <text>True</text>
                    ) : (
                        <text>False</text>
                    )
                ),
            },
            {
                title: 'Party Deck',
                dataIndex: "partyDeck",
                key: "partyDeck",
                render: (partyDeck: boolean) => (
                    (partyDeck) ? (
                        <text>True</text>
                    ) : (
                        <text>False</text>
                    )
                ),
            },
            {
                title: 'wiFi',
                dataIndex: "wiFi",
                key: "wiFi",
                render: (wiFi: boolean) => (
                    (wiFi) ? (
                        <text>True</text>
                    ) : (
                        <text>False</text>
                    )
                ),
            },
            {
                title: 'Fan Night',
                dataIndex: "fanNight",
                key: "fanNight",
                render: (fanNight: boolean) => (
                    (fanNight) ? (
                        <text>True</text>
                    ) : (
                        <text>False</text>
                    )
                ),
            },
            {
                title: 'Family Game',
                dataIndex: "familyGame",
                key: "familyGame",
                render: (familyGame: boolean) => (
                    (familyGame) ? (
                        <text>True</text>
                    ) : (
                        <text>False</text>
                    )
                ),
            },
            {
                title: 'Door Prizes',
                dataIndex: "doorPrizes",
                key: "doorPrizes",
                render: (doorPrizes: boolean) => (
                    (doorPrizes) ? (
                        <text>True</text>
                    ) : (
                        <text>False</text>
                    )
                ),
            },
            {
                title: 'MVP Night',
                dataIndex: "mvpNight",
                key: "mvpNight",
                render: (mvpNight: boolean) => (
                    (mvpNight) ? (
                        <text>True</text>
                    ) : (
                        <text>False</text>
                    )
                ),
            },
            {
                title: 'Parade of Champions',
                dataIndex: "paradeOfChampions",
                key: "paradeOfChampions",
                render: (paradeOfChampions: boolean) => (
                    (paradeOfChampions) ? (
                        <text>True</text>
                    ) : (
                        <text>False</text>
                    )
                ),
            },
            {
                title: 'Bribe The Refs',
                dataIndex: "bribeTheRefs",
                key: "bribeTheRefs",
                render: (bribeTheRefs: boolean) => (
                    (bribeTheRefs) ? (
                        <text>True</text>
                    ) : (
                        <text>False</text>
                    )
                ),
            },
            {
                title: 'Easy Runs',
                dataIndex: "easyRuns",
                key: "easyRuns",
                render: (easyRuns: boolean) => (
                    (easyRuns) ? (
                        <text>True</text>
                    ) : (
                        <text>False</text>
                    )
                ),
            },
            {
                title: 'Fan Factor',
                dataIndex: "fanFactor",
                key: "fanFactor",
                render: (fanFactor: boolean) => (
                    (fanFactor) ? (
                        <text>True</text>
                    ) : (
                        <text>False</text>
                    )
                ),
            },
            {
                title: 'Train Player',
                dataIndex: "trainPlayer",
                key: "trainPlayer",
            },
            {
                title: 'Farm System',
                dataIndex: "farmSystem",
                key: "farmSystem",
                render: (farmSystem: boolean) => (
                    (farmSystem) ? (
                        <text>True</text>
                    ) : (
                        <text>False</text>
                    )
                ),
            },
            {
                title: 'Fan Favourites',
                dataIndex: "fanFavourites",
                key: "fanFavourites",
                render: (fanFavourites: boolean) => (
                    (fanFavourites) ? (
                        <text>True</text>
                    ) : (
                        <text>False</text>
                    )
                ),
            },
            {
                title: 'Gourmet Restaurant',
                dataIndex: "gourmetRestaurant",
                key: "gourmetRestaurant",
                render: (gourmetRestaurant: boolean) => (
                    (gourmetRestaurant) ? (
                        <text>True</text>
                    ) : (
                        <text>False</text>
                    )
                ),
            },
            {
                title: 'Beer Garden',
                dataIndex: "beerGarden",
                key: "beerGarden",
                render: (beerGarden: boolean) => (
                    (beerGarden) ? (
                        <text>True</text>
                    ) : (
                        <text>False</text>
                    )
                ),
            },
            {
                title: 'Naming Rights',
                dataIndex: "namingRights",
                key: "namingRights",
                render: (namingRights: boolean) => (
                    (namingRights) ? (
                        <text>True</text>
                    ) : (
                        <text>False</text>
                    )
                ),
            },
            {
                title: 'Event Planning',
                dataIndex: "eventPlanning",
                key: "eventPlanning",
                render: (eventPlanning: boolean) => (
                    (eventPlanning) ? (
                        <text>True</text>
                    ) : (
                        <text>False</text>
                    )
                ),
            },
        ];

        if (store.User == undefined || store.User.franchise == undefined || store.User.franchise.action == undefined) return <div>loading</div>;
        else {
            return (
                <div>
                    <Table columns={columns} dataSource={[franchise.action]} pagination={false}
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
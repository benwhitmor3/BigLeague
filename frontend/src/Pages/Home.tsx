import React, {useContext} from 'react';
import {observer} from "mobx-react";
import {StoreContext} from "../models";
import {Spin} from "antd";
import {Link} from "react-router-dom";
import CreateLeague from "./Molecules/CreateLeague";


export const Home: React.FunctionComponent = observer(() => {

        const store = useContext(StoreContext)

        if (store.User == undefined) return <Spin></Spin>;
        if (store.User.league?.franchiseSet?.length > 1) return (
            <div>
                <h1>Welcome to, {store.User.league?.leagueName}!</h1>
                <h1>Good luck this season, {store.User.franchise?.franchise}!</h1>
                <p>Please read the instructions to guide you on your way to victory</p>
            </div>
        )
        if (store.User.league) return (
            <div>
                <h1>Welcome to, {store.User.league.leagueName}!</h1>
                <h3>Click <Link to="/Franchise">here</Link> to create a Franchise!</h3>
            </div>
        )
        else {
            return (
                <CreateLeague/>
            );
        }
    }
)

export default Home;

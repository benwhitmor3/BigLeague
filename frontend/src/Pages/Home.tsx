import React, {useContext} from 'react';
import {observer} from "mobx-react";
import {StoreContext} from "../models";
import {Link} from "react-router-dom";
import {Spin} from 'antd';
import CreateLeague from "./Molecules/Create/CreateLeague";
import '../loading.css';
import '../transition.min.css';
import BigLoading from "./Atoms/Loading/BigLoading";

export const Home: React.FunctionComponent = observer(() => {

        const store = useContext(StoreContext)

        if (store.User === undefined) return (
            <Spin/>
        )
        else if (store.User.league && !store.User.franchise) return (
            <div style={{textAlign: 'center', marginTop: '20px'}}>
                <h1>Welcome to, {store.User.league.leagueName}!</h1>
                <h3>Click <Link to="/Franchise">here</Link> to create a Franchise!</h3>
            </div>
        )
        else if (store.User.league?.franchiseSet?.length > 1) return (
            <div className="ld ld-slide-rtl-in">
                <h1>Welcome to, {store.User.league?.leagueName}!</h1>
                <h1>Good luck this season, {store.User.franchise?.franchise}!</h1>
                <p>Please read the instructions to guide you on your way to victory</p>
                <BigLoading animation="ld ld-bounce"/>
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

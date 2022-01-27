import React, {useEffect, useState} from "react";
import './index.css';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import 'antd/dist/antd.css';
import {Layout, Menu} from 'antd';
import './App.css'
import {useQuery} from "./models";
import {observer} from "mobx-react";
import Franchise from "./Pages/Franchise";
import Draft from "./Pages/Draft";
import PlayerHistory from "./Pages/PlayerHistory";
import Season from "./Pages/Season";
import Home from "./Pages/Home";
import OffSeason from "./Pages/OffSeason";
import {userQuery} from "./Pages/Utils/queries";
import FreeAgency from "./Pages/FreeAgency";
import Staff from "./Pages/Staff";
import LoginForm from "./Pages/LoginForm";
import SignupForm from "./Pages/SignupForm";
import SmallLoading from "./Pages/Atoms/Loading/SmallLoading";
import Leaderboard from "./Pages/Leaderboard";


const {Header, Content, Footer} = Layout;

const App: React.FunctionComponent = observer(() => {

    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(localStorage.getItem('token') ? true : false)
    const email: any = localStorage.getItem('email') ? localStorage.getItem('email') : '';

    const deleteToken = () => {
        localStorage.removeItem("email")
        localStorage.removeItem("token")
    }

    const {store, error, loading, data} = useQuery((store) =>
        store.queryUser(
            {email: email},
            userQuery,
            {fetchPolicy: 'cache-first'}
        )
    )

    useEffect(() => {
        if (isLoggedIn) {
            let link = '';
            if (window.location.port === '3000') {
                link = window.location.hostname + ':8000'
            } else {
                link = window.location.host
            }
            fetch(window.location.protocol + "//" + link + '/current_user/', {
                headers: {
                    Authorization: `JWT ${localStorage.getItem('token')}`
                }
            })
                .then(res => {
                    if (res.ok) {
                        setIsLoggedIn(true)
                        return res.json();
                    }
                    return Promise.reject(res)
                })
                .then(json => {
                    console.log(json)
                    localStorage.setItem('email', json.email);
                    store.setUser(json.email).then(r => console.log("SET USER"));
                    store.setIsLoggedIn(true)
                    setIsLoggedIn(true)
                })
                .catch(() => {
                    console.log('not logged in');
                    store.setIsLoggedIn(false)
                });
        }
    }, [store.isLoggedIn, ]);


    if (!store.isLoggedIn) {
        return <div>
                        <Layout className='layout'>
                            <Router>
                                <Header style={{backgroundColor: '#12263A'}}>
                                    <Menu theme="dark" mode="horizontal" style={{backgroundColor: 'inherit', color: '#12263A'}}>
                                        <Menu.Item key="13" style={{float: 'right'}}>Register<a href="/Register"/></Menu.Item>
                                        {isLoggedIn ? (
                                                <Menu.Item key="14" style={{float: 'right'}} onClick={() => {
                                                    deleteToken()
                                                }}>Logout
                                                    <a href="/Login"/></Menu.Item>)
                                            :
                                            (<Menu.Item key="15" style={{float: 'right'}}>Login<a href="/Login"/></Menu.Item>)
                                        }
                                    </Menu>
                                </Header>
                                <Content style={{margin: '0px'}}>
                                    <div className="site-layout-content">
                                        <Routes>
                                            <Route path='/Register' element={<SignupForm/>}/>
                                            <Route path='/Login' element={<LoginForm/>}/>
                                        </Routes>
                                    </div>
                                </Content>
                                <Footer style={{textAlign: 'center'}}>The Big League ©2021 Created by Ben Whitmore</Footer>
                            </Router>
                        </Layout>
            </div>;
    }
    else if (loading || store.User === undefined) return <div><SmallLoading animation="ld ld-bounce"/></div>;
    else if (!store.User?.league || !store.User?.franchise || store.User?.franchise.seasonSet.length === 0) {
        return (
            <div>
                <Layout className='layout'>
                    <Router>
                        <Header style={{backgroundColor: '#12263A'}}>
                            <Menu theme="dark" mode="horizontal" style={{backgroundColor: 'inherit', color: '#12263A'}}>
                                <Menu.Item key="1"><Link to="/Home">Home</Link></Menu.Item>
                                <Menu.Item key="2"><Link to="/Franchise">Franchise</Link></Menu.Item>
                                <Menu.Item key="10" style={{position: 'absolute', top: 0, right: 0}}>Register<a href="/Register"/></Menu.Item>
                                {isLoggedIn ? (
                                        <Menu.Item key="11" style={{float: 'right'}} onClick={() => {
                                            deleteToken()
                                        }}>Logout
                                            <a href="/Login"/></Menu.Item>)
                                    :
                                    (<Menu.Item key="12" style={{float: 'right'}}>Login<a href="/Login"/></Menu.Item>)
                                }
                            </Menu>
                        </Header>
                        <Content style={{margin: '0px'}}>
                            <div className="site-layout-content">
                                <Routes>
                                    <Route  path='/Home' element={<Home/>}/>
                                    <Route  path='/Franchise' element={<Franchise/>}/>w
                                    <Route  path='/Login' element={<LoginForm/>}/>
                                    <Route  path='/Register' element={<SignupForm/>}/>
                                </Routes>
                            </div>
                        </Content>

                        <Footer style={{textAlign: 'center'}}>The Big League ©2021 Created by Ben Whitmore</Footer>
                    </Router>
                </Layout>
            </div>
        )
    }
    else {
        return (
            <div>
                <Layout className='layout'>
                    <Router>
                        <Header style={{backgroundColor: '#12263A'}}>
                            <Menu theme="dark" mode="horizontal" style={{backgroundColor: 'inherit', color: '#12263A'}}>
                                <Menu.Item key="1"><Link to="/Home">Home</Link></Menu.Item>
                                <Menu.Item key="2"><Link to="/Franchise">Franchise</Link></Menu.Item>
                                <Menu.Item key="3"><Link to="/Staff">Staff</Link></Menu.Item>
                                <Menu.Item key="4"><Link to="/OffSeason">OffSeason</Link></Menu.Item>
                                <Menu.Item key="5"><Link to="/Draft">Draft</Link></Menu.Item>
                                <Menu.Item key="6"><Link to="/FreeAgency">Free Agency</Link></Menu.Item>
                                <Menu.Item key="7"><Link to="/PlayerHistory">Player History</Link></Menu.Item>
                                <Menu.Item key="8"><Link to="/Season">Season</Link></Menu.Item>
                                <Menu.Item key="9"><Link to="/Leaderboard">Leaderboard</Link></Menu.Item>
                                <Menu.Item key="10" style={{float: 'right'}}>Register<a href="/Register"/></Menu.Item>
                                {isLoggedIn ? (
                                        <Menu.Item key="11" style={{float: 'right'}} onClick={() => {
                                            deleteToken()
                                        }}>Logout
                                            <a href="/Login"/></Menu.Item>)
                                    :
                                    (<Menu.Item key="12" style={{float: 'right'}}>Login<a href="/Login"/></Menu.Item>)
                                }
                            </Menu>
                        </Header>
                        <Content style={{margin: '0px'}}>
                            <div className="site-layout-content">
                                <Routes>
                                    <Route path='/Home' element={<Home/>}/>
                                    <Route path='/Franchise' element={<Franchise/>}/>w
                                    <Route path='/Staff' element={<Staff/>}/>
                                    <Route path='/OffSeason' element={<OffSeason/>}/>
                                    <Route path='/Draft' element={<Draft/>}/>
                                    <Route path='/FreeAgency' element={<FreeAgency/>}/>
                                    <Route path='/PlayerHistory' element={<PlayerHistory/>}/>
                                    <Route path='/Season' element={<Season/>}/>
                                    <Route path='/Leaderboard' element={<Leaderboard/>}/>
                                    <Route path='/Login' element={<LoginForm/>}/>
                                    <Route path='/Register' element={<SignupForm/>}/>
                                </Routes>
                            </div>
                        </Content>

                        <Footer style={{textAlign: 'center'}}>The Big League ©2021 Created by Ben Whitmore</Footer>
                    </Router>
                </Layout>
            </div>
        )
    }
});

export default App;
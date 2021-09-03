import React from "react";
import './index.css';
// @ts-ignore
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import 'antd/dist/antd.css';
import {Layout, Menu, Spin} from 'antd';
import './Header.css'
import {useQuery} from "./models";
import {observer} from "mobx-react";
import Franchise from "./Pages/Franchise";
import Stadium from "./Pages/Stadium";
import Draft from "./Pages/Draft";
import League from "./Pages/League";
import Season from "./Pages/Season";
import Home from "./Pages/Home";
import OffSeason from "./Pages/OffSeason";
import {userQuery} from "./Pages/Utils/queries";
import FreeAgency from "./Pages/FreeAgency";
import Staff from "./Pages/Staff";
// import {AUTH_TOKEN} from "./Constants";
// import {deleteToken, getToken} from "./components/Forms/token";


const {Header, Content, Footer} = Layout;

const App: React.FunctionComponent = observer(() => {

    // const isLoggedIn = !!getToken();

    const {store, error, loading, data} = useQuery((store) =>
        store.queryUser(
                    {email: "email@email.com"},
                    userQuery,
                    {fetchPolicy: 'cache-first'}
        ))

    store.setUser("email@email.com").then(r => console.log("SET USER"));

    // const authToken = localStorage.getItem(AUTH_TOKEN)
    if (error) return <div>{error.message}</div>;
    if (loading) return <div><Spin size="large"/></div>;
    else {
        return (
            <div>
                <Layout className='layout'>
                    <Router>
                        <Header style={{backgroundColor: '#d4380d'}}>
                            <Menu theme="dark" mode="horizontal" style={{backgroundColor: 'inherit', color: '#fff2e8'}}>
                                <Menu.Item key="1">Home <a href="/Home"/></Menu.Item>
                                <Menu.Item key="2"><Link to="/Stadium">Stadium</Link></Menu.Item>
                                <Menu.Item key="3"><Link to="/Franchise">Franchise</Link></Menu.Item>
                                <Menu.Item key="4"><Link to="/Staff">Staff</Link></Menu.Item>
                                <Menu.Item key="5"><Link to="/OffSeason">OffSeason</Link></Menu.Item>
                                <Menu.Item key="6"><Link to="/Draft">Draft</Link></Menu.Item>
                                <Menu.Item key="7"><Link to="/FreeAgency">Free Agency</Link></Menu.Item>
                                <Menu.Item key="8"><Link to="/Season">Season</Link></Menu.Item>
                                <Menu.Item key="9"><Link to="/LeagueSummary">League Summary</Link></Menu.Item>
                                {/*<Menu.Item key="8" >Instructions<a href = {file}/></Menu.Item>*/}
                                {/*{isLoggedIn ? (*/}
                                {/*    <Menu.Item key="9" style={{float: 'right'}} onClick={() => {deleteToken()}}>Logout*/}
                                {/*        <a href="/Login"/></Menu.Item>)*/}
                                {/*    : (<Menu.Item key="9" style={{float: 'right'}}>Login<a href="/Login"/></Menu.Item>)*/}
                                {/*}*/}
                                <Menu.Item key="10" style={{float: 'right'}}>Register<a href="/Register"/></Menu.Item>
                            </Menu>
                        </Header>
                        <Content style={{margin: '0px'}}>
                            <div className="site-layout-content">
                                <Switch>
                                    <Route exact path='/Home' component={Home} />
                                    <Route exact path='/Stadium' component={Stadium} />
                                    <Route exact path='/Franchise' component={Franchise}/>
                                    <Route exact path='/Staff' component={Staff}/>
                                    <Route exact path='/Draft' component={Draft}/>
                                    <Route exact path='/FreeAgency' component={FreeAgency}/>
                                    <Route exact path='/LeagueSummary' component={League}/>
                                    <Route exact path='/Season' component={Season} />
                                    <Route exact path='/OffSeason' component={OffSeason} />
                                    {/*<Route exact path='/Login' component={Login} />*/}
                                    {/*<Route exact path='/Register' component={Register} />*/}
                                </Switch>
                            </div>
                        </Content>

                        <Footer style={{textAlign: 'center'}}>The Big League ©2020 Created by Ben Whitmore</Footer>
                    </Router>
                </Layout>
            </div>
        )
    }
});


export default App;

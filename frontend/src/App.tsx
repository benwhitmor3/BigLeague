import React from "react";
import './index.css';
import Home from './components/Pages/Home';
import Stadium from './components/Pages/Stadium';
import Franchise from "./components/Pages/Franchise";
import Draft from './components/Pages/Draft';
import Season from './components/Pages/Season';
import OffSeason from './components/Pages/Offseason';
import Login from './components/Forms/Login';
// @ts-ignore
import file from "./components/Instructions/BigLeagueInstructions.pdf";
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import 'antd/dist/antd.css';
import { Layout, Menu} from 'antd';
import './Header.css'
import {useQuery} from "./models";
import {observer} from "mobx-react";
import {AUTH_TOKEN} from "./Constants";


const { Header, Content, Footer } = Layout;

const App: React.FunctionComponent = observer(() => {
    const {store, error, loading, data} = useQuery(store =>
        store.queryAllPlayer(
      {},
      `
    name
    suit
    age
    pv
    epv
    sEpv
    contract
    tOption
    pOption
    renew
    salary
    grade
    trainer
    roster{
      lineup
      franchise{
        franchise
      }
      }
    league{
      leagueName
      }
    `,
    ),
    );
    const authToken = localStorage.getItem(AUTH_TOKEN)
    if (error) return <div>{error.message}</div>;
    if (loading) return <div>loading</div>;
    else {
        return (
        <div>
            <Layout className='layout'>
                <Header style={{backgroundColor: '#d4380d' }}>
                    <Menu theme="dark" mode="horizontal"  style={{backgroundColor: 'inherit', color: '#fff2e8'}}>
                        <Menu.Item key="1" >Home <a href="/Home"/></Menu.Item>
                        <Menu.Item key="2" >Stadium<a href="/Stadium"/></Menu.Item>
                        <Menu.Item key="3" >Franchise<a href="/Franchise"/></Menu.Item>
                        <Menu.Item key="4" >OffSeason<a href="/OffSeason"/></Menu.Item>
                        <Menu.Item key="5" >Draft<a href="/Draft"/></Menu.Item>
                        <Menu.Item key="6" >Season<a href="/Season"/></Menu.Item>
                        <Menu.Item key="7" >League Summary<a href="/League Summary"/></Menu.Item>
                        <Menu.Item key="8" >Instructions<a href = {file}/></Menu.Item>
                        <Menu.Item key="9" >Login<a href="/Login"/></Menu.Item>
                    </Menu>
                </Header>
                <Content style={{ margin: '16px' }}>
                    <div className="site-layout-content">
                        <Router>
                            <Switch>
                                <Route exact path='/Home' component={Home} />
                                <Route exact path='/Stadium' component={Stadium} />
                                <Route exact path='/Franchise' component={Franchise} />
                                <Route exact path='/Draft' component={Draft} />
                                <Route exact path='/Stadium' component={Stadium} />
                                <Route exact path='/Season' component={Season} />
                                <Route exact path='/OffSeason' component={OffSeason} />
                                <Route exact path='/login' component={Login} />
                            </Switch>
                        </Router>
                    </div>
                </Content>

                <Footer style={{ textAlign: 'center' }}>The Big League ©2020 Created by Ben Whitmore</Footer>

            </Layout>
        </div>
        )
}
});


export default App;

import React from "react";
import './index.css';
import Home from './components/Home';
import Draft from './components/Draft';
import Stadium from './components/Stadium';
import GM from './components/GM';
import Season from './components/Season';
import OffSeason from './components/Offseason';
// @ts-ignore
import file from "./components/Instructions/BigLeagueInstructions.pdf";
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import 'antd/dist/antd.css';
import { Layout, Menu} from 'antd';
import './Header.css'
import {useQuery} from "./models";
import {observer} from "mobx-react";


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
    `,
    ),
    );
    if (error) return <div>{error.message}</div>;
    if (loading) return <div>loading</div>;
    else {
        // console.log(data)
        return (
        <div>
            <Layout className='layout'>
                <Header style={{backgroundColor: '#d4380d' }}>
                    <Menu theme="dark" mode="horizontal"  style={{backgroundColor: 'inherit', color: '#fff2e8'}}>
                        <Menu.Item key="1" >Home <a href="/Home"/></Menu.Item>
                        <Menu.Item key="2" >Franchise<a href="/Stadium"/></Menu.Item>
                        <Menu.Item key="3" >OffSeason<a href="/OffSeason"/></Menu.Item>
                        <Menu.Item key="4" >Draft<a href="/Draft"/></Menu.Item>
                        <Menu.Item key="5" >Season<a href="/Season"/></Menu.Item>
                        <Menu.Item key="6" >League Summary<a href="/League Summary"/></Menu.Item>
                        <Menu.Item key="7" >Instructions<a href = {file}/></Menu.Item>
                    </Menu>
                </Header>
                <Content style={{ margin: '16px' }}>
                    <div className="site-layout-content">
                        <Router>
                            <Switch>
                                <Route exact path='/Home' component={Home} />
                                <Route exact path='/Stadium' component={Stadium} />
                                <Route exact path='/GM' component={GM} />
                                <Route exact path='/Draft' component={Draft} />
                                <Route exact path='/Stadium' component={Stadium} />
                                <Route exact path='/Season' component={Season} />
                                <Route exact path='/OffSeason' component={OffSeason} />
                                <Route exact path='/Login' component={Draft} />
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

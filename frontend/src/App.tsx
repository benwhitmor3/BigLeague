import React from "react";
import './index.css';
// @ts-ignore
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import 'antd/dist/antd.css';
import {Layout, Menu} from 'antd';
import './Header.css'
import {useQuery} from "./models";
import {observer} from "mobx-react";
import Franchise from "./refactor_components/Franchise";
import Stadium from "./refactor_components/Stadium";
import Draft from "./refactor_components/Draft";
// import {AUTH_TOKEN} from "./Constants";
// import {deleteToken, getToken} from "./components/Forms/token";


const {Header, Content, Footer} = Layout;

const App: React.FunctionComponent = observer(() => {

    // const isLoggedIn = !!getToken();

    const {store, error, loading, data} = useQuery((store) =>
        store.queryUser(
            {email: "email@email.com"},
            `
    __typename
    id
    email
    username
    franchise{
      __typename
      id
      gm{
        __typename
        id
        trait
      }
      coach{
        __typename
        id
        name
        attributeOne
        attributeTwo
      }
      stadium{
        __typename
        id
        stadiumName
        seats
        boxes
        grade
        maxGrade
        homeFieldAdvantage
        city{
          __typename
          id
          city
          cityValue
        }
        franchise{
          __typename
          id
          franchise
        }
      }
      playerSet{
        __typename
        id
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
        franchise{
          __typename
          id
          franchise
        }
        lineup
      }
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
      league{
        __typename
        id
        leagueName
        franchiseSet{
          __typename
          id
          franchise
          gm{
            __typename
            id
            trait
          }
          coach{
            __typename
            id
            name
            attributeOne
            attributeTwo
          }
        }
        citySet{
          __typename
          id
          city
          cityValue
          league{
            __typename
            id
          }
          stadiumSet{
            __typename
            id
            city{
              __typename
              id
            }
            franchise{
              __typename
              id
            }
            stadiumName
            seats
            boxes
            grade
            maxGrade
            homeFieldAdvantage
          }
        }
        playerSet{
          __typename
          id
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
          franchise{
            __typename
            id
            franchise
          }
          lineup
        }
      }
    }
    `,
            {fetchPolicy: 'cache-first'}
        ))

    store.setUser("email@email.com").then(r => console.log("SET USER"));

    // window.data = data
    // window.rootStore = store;

    // const authToken = localStorage.getItem(AUTH_TOKEN)
    if (error) return <div>{error.message}</div>;
    if (loading) return <div>loading</div>;
    else {
        // console.log(data)
        return (
            <div>
                <Layout className='layout'>
                    <Router>
                        <Header style={{backgroundColor: '#d4380d'}}>
                            <Menu theme="dark" mode="horizontal" style={{backgroundColor: 'inherit', color: '#fff2e8'}}>
                                <Menu.Item key="1">Home <a href="/Home"/></Menu.Item>
                                <Menu.Item key="2"><Link to="/Stadium">Stadium</Link></Menu.Item>
                                <Menu.Item key="3"><Link to="/Franchise">Franchise</Link></Menu.Item>
                                <Menu.Item key="4">OffSeason<a href="/OffSeason"/></Menu.Item>
                                <Menu.Item key="5"><Link to="/Draft">Draft</Link></Menu.Item>
                                <Menu.Item key="6">Season<a href="/Season"/></Menu.Item>
                                <Menu.Item key="7">League Summary<a href="/League Summary"/></Menu.Item>
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
                                    {/*<Route exact path='/Home' component={Home} />*/}
                                    <Route exact path='/Stadium'>
                                        <Stadium/>
                                    </Route>
                                    <Route exact path='/Franchise' component={Franchise}/>
                                    <Route exact path='/Draft' component={Draft}/>
                                    {/*<Route exact path='/Stadium' component={Stadium} />*/}
                                    {/*<Route exact path='/Season' component={Season} />*/}
                                    {/*<Route exact path='/OffSeason' component={OffSeason} />*/}
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

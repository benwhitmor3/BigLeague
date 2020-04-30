import React, { useState } from "react";
import ReactDOM from 'react-dom';
import './index.css';
import Header from './components/Header';
import Home from './components/Home';
import Draft from './components/Draft';
import Stadium from './components/Stadium';
import GM from './components/GM';
import Season from './components/Season';
import OffSeason from './components/OffSeason';
import Page from './components/Page';

import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {

  return (
          <div className='App'>
      <Header />
      <div className='Content'>
        <h4>In Progress...</h4>
      <Router>
      <Switch>
      <Route exact path='/Home' component={Home} />
      <Route exact path='/Stadium' component={Stadium} />
      <Route exact path='/GM' component={GM} />
      <Route exact path='/Draft' component={Draft} />
      <Route exact path='/Stadium' component={Stadium} />
      <Route exact path='/Season' component={Season} />
      <Route exact path='/OffSeason' component={Page} />
      </Switch>
      </Router>
      </div>
    </div>
  );
}

export default App

import React from "react";
import './index.css';
import Header from './components/Header';
import Home from './components/Home';
import Draft from './components/Draft';
import Stadium from './components/Stadium';
import GM from './components/GM';
import Season from './components/Season';
import OffSeason from './components/OffSeason';

import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {

  return (
          <div className='App'>
      <Header />
      <div className='Content'>
      <Router>
      <Switch>
      <Route exact path='/Home' component={Home} />
      <Route exact path='/Stadium' component={Stadium} />
      <Route exact path='/GM' component={GM} />
      <Route exact path='/Draft' component={Draft} />
      <Route exact path='/Stadium' component={Stadium} />
      <Route exact path='/Season' component={Season} />
      <Route exact path='/OffSeason' component={OffSeason} />
      </Switch>
      </Router>
      </div>
    </div>
  );
}

export default App

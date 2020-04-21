import React, { useState } from "react";
import ReactDOM from 'react-dom';
import './index.css';
import Header from './components/Header';
import Home from './components/Home';
import Draft from './components/Draft';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import CustomSelect from "./components/CustomSelect.js";
import Button from "./components/Button.js";
import Modal from "./components/Modal.js";


function App() {

  return (
          <div className='App'>
      <Header />
      <div className='Content'>
        <h4>In Progress...</h4>
          <form>
        <Modal show={true} message={"Hello"}>
          <p>THIS IS A MODAL</p>
        </Modal>
        <Button variant="danger" size={"sm"} >Small Button</Button>
        <Button variant="primary" size={"lg"} >Smaller Button</Button>
        <Button variant="warning" size={"xs"} >Big Button</Button>
      </form>
      <Router>
      <Switch>
      <Route exact path='/Home' component={Home} />
      <Route exact path='/Draft' component={Draft} />
      </Switch>
      </Router>
      </div>
    </div>
  );
}

export default App

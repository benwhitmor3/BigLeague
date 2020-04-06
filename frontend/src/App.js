import React, { Component } from "react";
import Modal from "./components/Modal";
import axios from "axios";
import './App.css';
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import Home from "./components/Home";
import Stadium from "./components/Stadium";
import GM from "./components/GM";
import Draft from "./components/Draft";


function App() {
  return (
      <HashRouter>
      <div className="App">
          <ul className="nav">
            <li><NavLink exact to="/">Home</NavLink></li>
            <li><NavLink to="/Stadium">Stadium</NavLink></li>
            <li><NavLink to="/GM">Spreadsheet and Pricing</NavLink></li>
            <li><NavLink to="/Draft">Draft</NavLink></li>
          </ul>
          <div className="content">
            <Route exact path="/" component={Home}/>
            <Route path="/Stadium" component={Stadium}/>
            <Route path="/GM" component={GM}/>
            <Route path="/Draft" component={Draft}/>
          </div>
      </div>
      </HashRouter>
  );
}

export default App

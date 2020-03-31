import React, { Component } from "react";
import axios from 'axios';

class Home extends Component {

  render() {
    return (
      <div>
        <form>
          <label>
            Team Name:
            <input type="text" name="name" />
          </label>
          <input type="submit" value="Submit" />
        </form>
          <br/>
        <h2>CHOOSE CITY</h2>
        <p> Instructions </p>

      </div>
    );
  }
}

export default Home;
import React, { useContext } from 'react'
import logo from '../Images/BigLeague_Gif.gif';
// @ts-ignore
import instructions from "../Instructions/BigLeagueInstructions.pdf";
import {Col, Row} from "antd";
import {deleteToken, getToken} from "../Forms/token";
import {observer} from "mobx-react";
import {StoreContext, useQuery } from "../../models";


const Home = (props: any) => {
    const store = useContext(StoreContext)
    const authToken = localStorage.getItem('auth-token');

    console.log(authToken)

    const { loading, setQuery } = useQuery((store) =>
        store.queryUser(
              {email: "ben-whitmore@hotmail.com"},
              `
      id
      email
      username
      franchise{
        franchise
      }
      __typename
    `,))

    const isLoggedIn = !!getToken();

    return (
<div>
  <h2>Welcome to the Big League</h2>
  {/*<img src={logo} alt="picture" />*/}
  <p>Please review the <a href = {instructions}>instructions</a> before starting</p>
  <br/>
<Row>
</Row>

</div>

  );
}

export default (observer(Home))
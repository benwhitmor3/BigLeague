import React from "react";
import "./Header.css";
// @ts-ignore
import file from "./Instructions/BigLeagueInstructions.pdf";
import 'antd/dist/antd.less'

export default function Header() {

  return (
    <header className="Header">

        <nav className="Nav">
          <a href="/Home">Home</a>
          <a href="/Stadium">Stadium</a>
          <a href="/GM">GM</a>
          <a href="/Draft">Draft</a>
          <a href="/Season">Season</a>
          <a href="/OffSeason">OffSeason</a>
          <a href = {file}>Instructions</a>
        </nav>

    </header>
  );
}
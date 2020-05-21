import React, { useState, useEffect } from "react";
import "./Header.css";
import { CSSTransition } from "react-transition-group";
import file from "./Instructions/BigLeagueInstructions.pdf";


export default function Header() {
  const [isNavVisible, setNavVisibility] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 800px)");
    mediaQuery.addListener(handleMediaQueryChange);
    handleMediaQueryChange(mediaQuery);

    return () => {
      mediaQuery.removeListener(handleMediaQueryChange);
    };
  }, []);

  const handleMediaQueryChange = mediaQuery => {
    if (mediaQuery.matches) {
      setIsSmallScreen(true);
    } else {
      setIsSmallScreen(false);
    }
  };

  const toggleNav = () => {
    setNavVisibility(!isNavVisible);
  };

  return (
    <header className="Header">

        <CSSTransition in={!isSmallScreen || isNavVisible}
      timeout={350} classNames="NavAnimation" unmountOnExit>
        <nav className="Nav">
          <a href="/Home">Home</a>
          <a href="/Stadium">Stadium</a>
          <a href="/GM">GM</a>
          <a href="/Draft">Draft</a>
          <a href="/Season">Season</a>
          <a href="/OffSeason">OffSeason</a>
          <a href = {file}>Instructions</a>
        </nav>
      </CSSTransition>

      <button onClick={toggleNav} className="Burger">
        <span role="img" aria-label="Basketball">🏀</span>
      </button>

    </header>
  );
}
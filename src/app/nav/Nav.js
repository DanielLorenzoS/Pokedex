"use client";

import React, { useState } from "react";
import "./NavStyle.css";
import Link from "next/link";

const Nav = () => {

  const [activeButton, setActiveButton] = useState(false);

  const handleButtonClick = () => {
    console.log("algo")
    setActiveButton(!activeButton);
  };

  return (
    <>
      <nav className="navv">
        <h1 className="nav-h1">POKEDEX</h1>
        <div className="navs">
          <Link href="/">
            <h2 className="nav-h2">Inicio</h2>
          </Link>
          <Link href="/saved">
            <h2 className="nav-h2">Pokemons Guardados</h2>
          </Link>
        </div>
        <div className="nav-btn">
          <img className={`image-menu ${activeButton ? "active" : "nav-btn"}`}
            src="./menu.svg"
            onClick={handleButtonClick} />
        </div>
        <div className={`menu-emergente rounded m-auto text-center ${activeButton ? "show" : "notD"}`}>
          <Link href="/" onClick={handleButtonClick}>
            <h2 className="nav-i">Inicio</h2>
          </Link>
          <Link href="/saved">
            <h2 className="nav-i">Pokemons Guardados</h2>
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Nav;
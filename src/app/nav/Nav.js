import React from "react";
import "./NavStyle.css";
import Link from "next/link";

const Nav = () => {
  return (
    <>
      <nav className="nav">
        <h1 className="nav-h1">POKEDEX</h1>
        <div className="navs d-flex">
          <Link href="/">
            <h2 className="nav-h2">Inicio</h2>
          </Link>
          <Link href="/saved">
            <h2 className="nav-h2">Pokemons Guardados</h2>
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Nav;
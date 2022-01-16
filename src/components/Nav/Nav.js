import React from 'react';
import './Nav.scss'
import { NavLink } from 'react-router-dom'
import Search from '../Search/Search.js'

const Nav = () => {
    return (
        <nav>
            <div>
                <h1>METVIRTUAL</h1>
                <div className="nav-links">
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/about">About</NavLink>
                    <NavLink to="/saved">Saved</NavLink>
                </div>
            </div>
            <Search />
            <p>Search the collection of the Metropolitan Museum of Art and get inspired without leaving home.</p>
        </nav>
    )
}

export default Nav;
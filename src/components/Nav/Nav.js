import React from 'react';
import './Nav.scss'
import { NavLink } from 'react-router-dom'
import Search from '../Search/Search.js'

const Nav = ({ handleSubmit }) => {
    return (
        <nav>
            <div className="nav-content">
                <div className="logo-nav-container">
                    <h1 className="logo">METVIRTUAL</h1>
                    <div className="nav-links">
                        <NavLink to="/">Home</NavLink>
                        <NavLink to="/about">About</NavLink>
                        <NavLink to="/saved">Saved</NavLink>
                    </div>
                </div>
                <Search handleSubmit={handleSubmit} />
                <p>Search the collection of the Metropolitan Museum of Art and get inspired without leaving home.</p>
            </div>
        </nav>
    )
}

export default Nav;
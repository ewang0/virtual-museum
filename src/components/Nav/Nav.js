import React from 'react';
import './Nav.scss'
import { NavLink } from 'react-router-dom'
import Search from '../Search/Search.js'
import Checkbox from '@mui/material/Checkbox';

const Nav = ({ handleSubmit, handleChecked }) => {
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
                <p>Search the collection of the Metropolitan Museum of Art and get inspired without leaving home.</p>
                <Search handleSubmit={handleSubmit} />
                <form className="search-filter-container">
                    <p>Filters:</p>
                    <label>
                        <Checkbox 
                            id="onView"
                            onChange={(event) => {
                                console.log(event.target.id)
                                handleChecked(event.target.checked, event.target.id)
                            }}
                        />
                        On view
                    </label>
                    <label>
                        <Checkbox 
                            id="isHighlight"
                            onChange={(event) => {
                                console.log(event.target.id)
                                handleChecked(event.target.checked, event.target.id)
                            }}
                        />
                        Highlighted
                    </label>
                </form>
                
            </div>
        </nav>
    )
}

export default Nav;
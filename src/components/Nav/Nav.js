import React, { useState } from 'react';
import './Nav.scss'
import { NavLink, Link } from 'react-router-dom'
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import PropTypes from 'prop-types';
import { WcTwoTone } from '@mui/icons-material';

const Nav = ({ handleSubmit, handleChecked }) => {
    const [searchState, setSearchState] = useState('');
    const [checkedState, setCheckedState] = useState({isOnView: false, isHighlight: false});

    return (
        <nav>
            <div className="nav-content">
                <div className="logo-nav-container">
                    <h1 className="logo">METVIRTUAL</h1>
                    <div className="nav-links">
                        <NavLink 
                            to="/"
                            style={({ isActive }) => ({                           
                                color: isActive ? '#E00028' : '',
                            })}
                            >Home</NavLink>
                        <NavLink 
                            to="/about"
                            style={({ isActive }) => ({                           
                                color: isActive ? '#E00028' : '',
                            })}
                            >About</NavLink>
                        <a href="https://github.com/ewang0/virtual-museum" target="_blank" rel="noreferrer">Repo</a>
                        <a href="https://metmuseum.github.io/" target="_blank" rel="noreferrer">API</a>
                    </div>
                </div>
                <p>Search over 470,000 objects in The Metropolitan Museum of Art and get inspired without leaving home.</p>
                <form className="search-bar">
                    <TextField 
                        className="search"
                        hiddenLabel
                        fullWidth
                        id="search"
                        placeholder="Search"
                        size="small"
                        variant="filled"
                        color="error"
                        onChange={(event) => setSearchState(event.target.value)}
                        onKeyPress={(event) => {
                            if(event.key === 'Enter') {
                                event.preventDefault()
                                const el = document.getElementById('inputAdornment').click();
                            }
                        }}
                        value={searchState}
                        InputProps={{
                            endAdornment: 
                                <InputAdornment 
                                    id="inputAdornment"
                                    position="end"
                                    onClick={(event) => {
                                        handleSubmit(event, searchState)
                                        setSearchState('')
                                        setCheckedState({isOnView: false, isHighlight: false});
                                    }}
                                    >
                                        <Link to="/"><SearchIcon className="submit-search-button" /></Link>
                                </InputAdornment>,
                        }}
                    />
                </form>
                <form className="search-filter-container">
                    <p>Filters:</p>
                    <label>
                        <Checkbox 
                            id="onView"
                            sx={{
                                '&.Mui-checked': {
                                    color: '#E00028',
                                }
                            }}
                            checked={checkedState.isOnView}
                            onChange={(event) => {
                                handleChecked(event.target.checked, event.target.id)
                                setCheckedState({isOnView: event.target.checked, isHighlight: checkedState.isHighlight})
                            }}
                        />
                        On view
                    </label>
                    <label>
                        <Checkbox 
                            id="isHighlight"
                            sx={{
                                '&.Mui-checked': {
                                    color: '#E00028',
                                }
                            }}
                            checked={checkedState.isHighlight}
                            onChange={(event) => {
                                handleChecked(event.target.checked, event.target.id)
                                setCheckedState({isOnView: checkedState.isOnView, isHighlight: event.target.checked})
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

Nav.propTypes = {
    handleSubmit: PropTypes.func,
    handleChecked: PropTypes.func
}
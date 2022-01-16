import React, { useState } from 'react';
import TextField from '@mui/material/TextField';

const Search = ({ handleSubmit }) => {
    const searchValue = document.getElementById('search')
    const [searchState, setSearchState] = useState('');
    return(
        <form>
            <TextField 
                className="search"
                //label="Search"
                id="search"
                //defaultValue="Search"
                placeholder="Search by artist, title, department..."
                size="small"
                color="secondary"
                onChange={(event) => setSearchState(event.target.value)}
                value={searchState}
            />
            <button className="submit-search" onClick={(event) => {
                handleSubmit(event, searchState)
                setSearchState('')
            }}>Search</button>
        </form>
    )
}

export default Search;
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import './Search.scss'

const Search = ({ handleSubmit }) => {
    const [searchState, setSearchState] = useState('');
    return(
        <form className="search-bar">
            <TextField 
                className="search"
                //label="Search"
                hiddenLabel
                fullWidth
                id="search"
                //defaultValue="Search"
                placeholder="Search"
                size="small"
                variant="filled"
                //color="secondary"
                onChange={(event) => setSearchState(event.target.value)}
                value={searchState}
                InputProps={{
                    endAdornment: 
                        <InputAdornment 
                            position="end"
                            onClick={(event) => {
                                handleSubmit(event, searchState)
                                setSearchState('')
                            }}
                            >
                                <SearchIcon className="submit-search-button" />
                        </InputAdornment>,
                }}
            />
        </form>
    )
}

export default Search;
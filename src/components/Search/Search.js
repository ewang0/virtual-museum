import React from 'react';
import TextField from '@mui/material/TextField';

const Search = () => {
    return(
        <form>
            <TextField 
                //label="Search"
                id="outlined-size-small"
                defaultValue="Search"
                size="small"
                color="secondary"
            />
        </form>
    )
}

export default Search;
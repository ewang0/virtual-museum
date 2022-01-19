import React, { useState } from 'react';
import './ImageGridHeader.scss'
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { departments } from '../../content.js';
import PropTypes from 'prop-types';

const ImageGridHeader = ({ handleSort, searchEndpoint }) => {
    const [departmentValue, setDepartmentValue] = useState(null);

    return(
        <div className="image-grid-header-container">
            {searchEndpoint ? <p>Showing results for <b>"{searchEndpoint.includes("Highlight") ? searchEndpoint.slice(19) : searchEndpoint.slice(2)}"</b></p> : <p>Loading results...</p>}
            
            <div className="image-grid-header-sort">
                <form className="department-sort-container">
                    <label>
                        Sort by:
                        <Autocomplete
                            value={departmentValue}
                            className="autocomplete"
                            options={departments}
                            id="departmentsAutocomplete"
                            //disableCloseOnSelect
                            
                            sx={{ width: 200 }}
                            onChange={(event, newValue) => {
                                //console.log('before', departmentValue)
                                setDepartmentValue(newValue)
                                console.log(newValue)
                                //console.log('after', departmentValue)
                                handleSort(event, newValue)
                            }}
                            renderInput={(params) => (
                                <TextField {...params} color="error" label="Department" size="small" />
                            )}
                        />
                    </label>
                </form>
            </div>
        </div>
    )
}

export default ImageGridHeader;

ImageGridHeader.propTypes = {
    handleSort: PropTypes.func
}
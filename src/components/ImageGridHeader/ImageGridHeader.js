import React, { useState } from 'react';
import './ImageGridHeader.scss'
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import { departments } from '../../content.js'

const ImageGridHeader = ({ handleSort }) => {
    //const autocomplete = document.querySelector('.MuiAutocomplete-listbox')
    const [departmentValue, setDepartmentValue] = useState('');

    return(
        <div className="image-grid-header-container">
            <p>Showing results for "sunflower"</p>
            <div className="image-grid-header-sort">
                <form className="department-sort-container">
                    <label>
                        Sort by
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
                                <TextField {...params} label="Department" size="small" />
                            )}
                        />
                    </label>
                </form>
                <form className="on-view-sort-container">
                    <label>
                        <Checkbox />
                        On view
                    </label>
                </form>
            </div>
        </div>
    )
}

export default ImageGridHeader;
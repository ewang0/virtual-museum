import React from 'react';
import './ImageGridHeader.scss'
import Autocomplete from '@mui/material/Autocomplete';
import Checkbox from '@mui/material/Checkbox';

const ImageGridHeader = () => {
    return(
        <div className="image-grid-header-container">
            <p>Showing results for "sunflower"</p>
            <div className="image-grid-header-sort">
                <form className="department-sort-container">
                    <label>Sort by</label>
                    {/* <Autocomplete
                        disablePortal
                        id="departments"
                        options={["top100Films"]}
                        sx={{ width: 300 }}
                    /> */}
                </form>
                <form className="on-view-sort-container">
                    <Checkbox />
                    <label>On view</label>
                </form>
            </div>
        </div>
    )
}

export default ImageGridHeader;
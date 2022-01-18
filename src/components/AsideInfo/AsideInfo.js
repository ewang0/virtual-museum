import React from 'react';
import './AsideInfo.scss';
import PropTypes from 'prop-types';

const AsideInfo = ({ asideInfo }) => {
    return(
        <aside className="aside-container">
            <div className="aside-content">
                <h2>{asideInfo.title}</h2>
                <p>{asideInfo.artist}</p>
                <p>{asideInfo.date}</p>
            </div>  
        </aside>
    )
}

export default AsideInfo;

AsideInfo.propTypes = {
    asideInfo: PropTypes.object
}
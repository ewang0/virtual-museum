import React from 'react';
import './ErrorState.scss';
import PropTypes from 'prop-types';

const ErrorState = ({ type }) => {
    return(
        <section className={`error-state-container ${type}`}>
            <div className={`error-state-content ${type}`}>
                <h2>No Results</h2>
                <p>Looks like no results came back for your search. Please try a different search.</p>
            </div>
        </section>
    )
}


export default ErrorState;

ErrorState.propTypes = {
    type: PropTypes.string
}
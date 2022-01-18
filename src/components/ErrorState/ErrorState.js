import React from 'react';
import './ErrorState.scss';
import PropTypes from 'prop-types';

const ErrorState = ({ type, is404 }) => {
    return(
        <section className={`error-state-container ${type}`}>
            <div className={`error-state-content ${type}`}>
                {is404 ? <h2>404 Not Found</h2> : <h2>No Results</h2>}
                {is404 ? 
                    <p>Oops! The page you are looking for does not exist. Please check that the URL is correct, or use the links in the site navigation to go to a valid page.</p> : <p>Looks like no results came back for your search. Please try a different search.</p>}
            </div>
        </section>
    )
}


export default ErrorState;

ErrorState.propTypes = {
    type: PropTypes.string
}
import React from 'react';
import './ErrorState.scss';

const ErrorState = ({ error }) => {
    return(
        <section className="error-state-container">
            <div className="error-state-content">
                <h2>No Results</h2>
                <p>Looks like no results came back for your search. Please try a different search.</p>
            </div>
        </section>
    )
}

export default ErrorState;
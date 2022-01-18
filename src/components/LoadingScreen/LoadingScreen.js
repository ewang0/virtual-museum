import React from 'react'
import ImageGridHeader from '../ImageGridHeader/ImageGridHeader'
import './LoadingScreen.scss'
import PropTypes from 'prop-types';

const LoadingScreen = ({ handleSort }) => {
    const skeletonDivs = [
        <div key={1} className="skeleton one" />,
        <div key={2} className="skeleton two"></div>,
        <div key={3} className="skeleton three"></div>,
        <div key={4} className="skeleton four"></div>,
        <div key={5} className="skeleton five"></div>,
        <div key={6} className="skeleton six"></div>,
        <div key={7} className="skeleton seven"></div>
    ]

    return(
        <section className="image-grid-section-container loading">
            <ImageGridHeader handleSort={handleSort} />
            <div className="skeleton-divs">
                {skeletonDivs}
            </div>
        </section>
    )
}

export default LoadingScreen;

LoadingScreen.propTypes = {
    handleSort: PropTypes.func
}
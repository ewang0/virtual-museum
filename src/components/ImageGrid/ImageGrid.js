import React, { useState, useEffect } from 'react';
import './ImageGrid.scss';
import ImageGridHeader from '../ImageGridHeader/ImageGridHeader';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ImageGrid = ({ displayedArtObjects, handleSort }) => {
    const images = displayedArtObjects.map((artObject) => {
        return(
            <Link key={artObject.objectID} to={`/details/${artObject.objectID}`}>
                <img className="" key={artObject.objectID} src={artObject.primaryImageSmall} alt={artObject.title} />
            </Link>
        )
    })

    return(
        <section className="image-grid-section-container">
            <ImageGridHeader handleSort={handleSort} />
            <div className="images">
                {images}
            </div>
        </section>
    )
}

export default ImageGrid;

ImageGrid.propTypes = {
    displayedArtObjects: PropTypes.array,
    handleSort: PropTypes.func
};
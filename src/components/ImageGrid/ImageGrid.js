import React from 'react';
import './ImageGrid.scss';
import ImageGridHeader from '../ImageGridHeader/ImageGridHeader';
import ErrorState from '../ErrorState/ErrorState';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ImageGrid = ({ displayedArtObjects, handleSort, handleHover, clearAsideInfo, searchEndpoint }) => {
    const images = displayedArtObjects.map((artObject) => {
        return(
            <Link 
                key={artObject.objectID} 
                to={`/details/${artObject.objectID}`}
                >
                <img 
                    className="" 
                    key={artObject.objectID} 
                    src={artObject.primaryImageSmall} 
                    alt={artObject.title} 
                    id={artObject.objectID}
                    onMouseEnter={(event) => { handleHover(event, event.target.id) }}
                    onMouseLeave={() => { clearAsideInfo() }}
                    />
            </Link>
        )
    })

    return(
        <section className="image-grid-section-container">
            <ImageGridHeader handleSort={handleSort} searchEndpoint={searchEndpoint} />
            { displayedArtObjects.length===0 ? <ErrorState type={"sort" }/> : <div className="images">{images}</div>}
        </section>
    )
}

export default ImageGrid;

ImageGrid.propTypes = {
    displayedArtObjects: PropTypes.array,
    handleSort: PropTypes.func,
    handleHover: PropTypes.func,
    searchEndpoint: PropTypes.string
};
import React, { useState, useEffect } from 'react';
import './ImageGrid.scss'
import ImageGridHeader from '../ImageGridHeader/ImageGridHeader'

const ImageGrid = ({ imageURLs, handleSort }) => {
    // const [imageURLs, setImageURLs] = useState([]);

    // useEffect(() => {
    //     let idArray = [];
    //     for(let i=0; i<objectIDs.length; i++) {
    //         const fetchData = async() => {
    //                 const res = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectIDs[i]}`)
    //                 const resJson = await res.json()
    //                 .catch(error => console.log(error));
    //                 idArray.push(resJson.primaryImage)
                    
    //                 if(i === objectIDs.length-1) {
    //                     setImageURLs(idArray)
    //                     console.log(idArray)
    //                 }
    //             }
    //             fetchData();
    //     }
    //     }, []);

    const images = imageURLs.map((url) => {
        return(
            <img className="" src={url} />
        )
    })

    return(
        <section className="image-grid-section-container">
            <ImageGridHeader handleSort={handleSort}/>
            <div className="images">
                {images}
            </div>
        </section>
    )
}

export default ImageGrid;
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import './Details.scss'

const Details = () => {
    const objectID = useParams().objectID;

    const [artObject, setArtObject] = useState({});
    const [allImages, setAllImages] = useState([])

    useEffect(() => {
        const fetchData = async() => {
            const res = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`)
            const resJson = await res.json()
                .catch(error => console.log(error));
            setArtObject(resJson)

            const allObjectImages = [resJson.primaryImage];
            resJson.additionalImages.forEach((additionalImage) => {
                allObjectImages.push(additionalImage)
            })
            
            setAllImages(allObjectImages);
        }
        fetchData();
        }, [objectID]);
    
    const allObjectImages = allImages.map((imageURL) => {
        return(
            <img key={artObject.objectID} src={imageURL} alt={artObject.title} />
        )
    })

    return(
        <section className="details-section-container">
            <Carousel className="carousel-container" dynamicHeight={true}showStatus={false} showIndicators={false} centerMode={false} >
                {allObjectImages}
            </Carousel>
            <div className="object-details-container">
                <div className="object-details-content">
                    <h2>{artObject.title} ({artObject.objectDate})</h2>
                    <p><b>Artist:</b> {artObject.artistDisplayName}</p>
                    <p><b>Department:</b> {artObject.department}</p>
                    <p><b>Dimensions:</b> {artObject.dimensions}</p>
                    <p><b>Medium:</b> {artObject.medium}</p>
                    <p><b>Additional Information:</b> <a href={artObject.objectURL} target="_blank" rel="noreferrer">{artObject.objectURL}</a></p>
                </div>
            </div>
        </section>
    )
}

export default Details;
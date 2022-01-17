import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom'
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import './Details.scss'

const Details = () => {
    // const objectID = useParams().objectID;
    //console.log(objectID);
    const objectID = "2019";
    const [artObject, setArtObject] = useState();
    const [allImages, setAllImages] = useState([])

    useEffect(() => {
        const fetchData = async() => {
            const res = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`)
            console.log('details fetch:', `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`)
            const resJson = await res.json()
            .catch(error => console.log(error));
            setArtObject(resJson)
            const allObjectImages = [resJson.primaryImageSmall];
            resJson.additionalImages.forEach((additionalImage) => {
                allObjectImages.push(additionalImage)
            })
            setAllImages(allObjectImages);


            //console.log(artObject.primaryImageSmall)
        }
        fetchData();
        }, []);
    
    // const getAllImages = () => {
    //     const allImages = [];
    //     allImages.push(artObject.primaryImageSmall);
    //     console.log(artObject.primaryImageSmall)
    //     artObject.additionalImages.forEach((additionalImage) => {
    //         allImages.push(additionalImage)
    //     })

    //     return allImages;
        
    // }

    const allObjectImages = allImages.map((imageURL) => {
        return(
            <img key={artObject.objectID} src={imageURL} alt={artObject.title} />
            
        )
    })
    return(
        <section className="details-section-container">
            <Carousel className="carousel-container" showStatus={false} showIndicators={false} centerMode={false}>
                {allObjectImages}
            </Carousel>
            
        </section>
    )
}

export default Details;
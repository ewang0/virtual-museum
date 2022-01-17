import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom'
import './Details.scss'

const Details = () => {
    // const objectID = useParams().objectID;
    //console.log(objectID);
    const objectID = "459123";
    const [artObject, setArtObject] = useState();

    useEffect(() => {
        const fetchData = async() => {
            const res = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`)
            console.log('details fetch:', `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`)
            const resJson = await res.json()
            .catch(error => console.log(error));
            setArtObject(resJson)
        }
        fetchData();
        }, []);
    return(
        <section className="details-section-container">
            
        </section>
    )
}

export default Details;
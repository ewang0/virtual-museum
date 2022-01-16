import React, { useEffect, useState } from 'react';
import './App.scss';
import Nav from '../Nav/Nav.js'
import ImageGrid from '../ImageGrid/ImageGrid.js'

function App() {
  const [objectIDs, setObjectIDs] = useState([]);
  const [imageURLs, setImageURLs] = useState([]);
  const [endpoint, setEndpoint] = useState('sunflower');

  useEffect(() => {
    const fetchData = async() => {
        const res = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=${endpoint}`)
        const resJson = await res.json()
        .catch(error => console.log(error));
        setObjectIDs(resJson.objectIDs.splice(0, 10))
        console.log(resJson.objectIDs) 
    }
    fetchData();
    }, [endpoint]);

    // useEffect(() => {
    //   console.log(endpoint);
    // }, [endpoint])

  useEffect(() => {
    let idArray = [];
    for(let i=0; i<objectIDs.length; i++) {
        const fetchData = async() => {
                const res = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectIDs[i]}`)
                const resJson = await res.json()
                .catch(error => console.log(error));
                idArray.push(resJson.primaryImage)
                
                if(i === objectIDs.length-1) {
                    setImageURLs(idArray)
                    console.log(idArray)
                }
            }
            fetchData();
    }
    }, [objectIDs]);
    
  const handleSubmit = (event, searchQuery) => {
    event.preventDefault();
    setEndpoint(searchQuery);
  }
    
  return (
    <main className="main-container">
      <Nav handleSubmit={handleSubmit}/>
      <ImageGrid imageURLs={imageURLs}/>
    </main>
  );
}

export default App;

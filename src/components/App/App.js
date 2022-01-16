import React, { useEffect, useState } from 'react';
import './App.scss';
import Nav from '../Nav/Nav.js'
import ImageGrid from '../ImageGrid/ImageGrid.js'

function App() {
  const [objectIDs, setObjectIDs] = useState([]);
  const [imageURLs, setImageURLs] = useState([]);

  useEffect(() => {
    const fetchData = async() => {
        const res = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=sunflowers`)
        const resJson = await res.json()
        .catch(error => console.log(error));
        setObjectIDs(resJson.objectIDs.splice(0, 10))
        console.log(resJson.objectIDs) 
    }
    fetchData();
    }, []);

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

    
  return (
    <main className="main-container">
      <Nav />
      <ImageGrid imageURLs={imageURLs}/>
    </main>
  );
}

export default App;

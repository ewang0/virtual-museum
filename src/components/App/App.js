import React, { useEffect, useState } from 'react';
import './App.scss';
import Nav from '../Nav/Nav.js'
import ImageGrid from '../ImageGrid/ImageGrid.js'

function App() {
  const [objectIDs, setObjectIDs] = useState([]);
  const [artObjects, setArtObjects] = useState([]);
  const [displayedArtObjects, setDisplayedArtObjects] = useState([]);
  const [searchEndpoint, setSearchEndpoint] = useState('q=sunflower');
  //const [departmentEndpoint, setDepartmentEndpoint] = useState('');
  
  useEffect(() => {
    const fetchData = async() => {
        const res = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&${searchEndpoint}`)
        //console.log(`https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true${'&' + departmentEndpoint}&${searchEndpoint}`)
        const resJson = await res.json()
        .catch(error => console.log(error));
        setObjectIDs(resJson.objectIDs.splice(0, 10))
        //console.log(resJson.objectIDs) 
    }
    fetchData();
    }, [searchEndpoint]);

  useEffect(() => {
    let objArray = [];
    for(let i=0; i<objectIDs.length; i++) {
        const fetchData = async() => {
                const res = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectIDs[i]}`)
                const resJson = await res.json()
                .catch(error => console.log(error));
                objArray.push(resJson)
                
                if(i === objectIDs.length-1) {
                    setArtObjects(objArray)
                    setDisplayedArtObjects(objArray)
                    console.log(objArray)
                }
            }
            fetchData();
    }
    }, [objectIDs]);
    
  const handleSubmit = (event, searchQuery) => {
    event.preventDefault();
    setDisplayedArtObjects([]);
    setSearchEndpoint(`q=${searchQuery}`);
  }

  const handleSort = (event, inputValue) => {
    event.preventDefault();
    if(!inputValue) {
      setDisplayedArtObjects(artObjects);
    } else {
      //console.log('inputvalue', inputValue.label)
      const filteredObjects = artObjects.filter((artObject) => {
        return artObject.department === inputValue.label;
      })
      //console.log('filtered objs', filteredObjects)
      setDisplayedArtObjects(filteredObjects);
    }
    }

    
  const imageURLs = displayedArtObjects.reduce((acc, obj) => {
      acc.push(obj.primaryImageSmall)
      return acc;
    }, [])
  
  return (
    <main className="main-container">
      <Nav handleSubmit={handleSubmit}/>
      <ImageGrid imageURLs={imageURLs} handleSort={handleSort}/>
    </main>
  );
}

export default App;

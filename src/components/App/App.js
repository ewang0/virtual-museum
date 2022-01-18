import React, { useEffect, useState } from 'react';
import './App.scss';
import Nav from '../Nav/Nav.js'
import ImageGrid from '../ImageGrid/ImageGrid.js'
import About from '../About/About.js'
import Details from '../Details/Details.js'
import AsideInfo from '../AsideInfo/AsideInfo';
import { Route, Routes } from 'react-router-dom'

function App() {
  const [objectIDs, setObjectIDs] = useState([]);
  const [artObjects, setArtObjects] = useState([]);
  const [displayedArtObjects, setDisplayedArtObjects] = useState([]);
  const [searchEndpoint, setSearchEndpoint] = useState('q=sunflower');
  const [isOnView, setIsOnView] = useState(false)
  const [isHighlight, setIsHighlight] = useState(false)
  const [asideInfo, setAsideInfo] = useState({})
  //const [departmentEndpoint, setDepartmentEndpoint] = useState('');
  
  useEffect(() => {
    const fetchData = async() => {
        const res = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true${isHighlight ? '&isHighlight=true' : ''}${isOnView ? '&isOnView=true' : ''}&${searchEndpoint}`)
        //console.log(`https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true${isHighlight ? '&isHighlight=true' : ''}${isOnView ? '&isOnView=true' : ''}&${searchEndpoint}`)
        const resJson = await res.json()
        .catch(error => console.log(error));
        setObjectIDs(resJson.objectIDs.splice(0,20))
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

  const handleChecked = (isChecked, id) => {
    if(isChecked && id==='onView') {
      setIsOnView(true)
    } else if (!isChecked && id==='onView') {
      setIsOnView(false)
    }

    if(isChecked && id==='isHighlight') {
      setIsHighlight(true)
    } else if (!isChecked && id==='isHighlight'){
      setIsHighlight(false)
    }
  }

  const handleHover = (event, objectKey) => {
    const hoveredObject = displayedArtObjects.find((object) => { 
      return objectKey===object.objectID.toString()
    });
    setAsideInfo({title: hoveredObject.title, artist: hoveredObject.artistDisplayName, date: hoveredObject.objectDate});
    console.log(asideInfo)
  }

  const clearAsideInfo = () => {
    setAsideInfo({});
  }
  
  return (
    <main className="main-container">
      <Nav handleSubmit={handleSubmit} handleChecked={handleChecked}/>
      <Routes>
        {/* <Route path="/" element={<Details />} />  */}
        <Route path="/" element={
          <div className="image-grid-aside-wrapper">
            <ImageGrid displayedArtObjects={displayedArtObjects} handleSort={handleSort} handleHover={handleHover} clearAsideInfo={clearAsideInfo} />
            <AsideInfo asideInfo={asideInfo} />
          </div>
          } />
        <Route path="/about" element={<About />} />
        <Route path="/details" element={<Details />}>
          <Route path="/details/:objectID" element={<Details />}/>
        </Route>
      </Routes>
    </main>
  );
}

export default App;

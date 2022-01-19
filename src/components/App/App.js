import React, { useEffect, useState } from 'react';
import './App.scss';
import Nav from '../Nav/Nav.js'
import ImageGrid from '../ImageGrid/ImageGrid.js'
import About from '../About/About.js'
import Details from '../Details/Details.js'
import AsideInfo from '../AsideInfo/AsideInfo';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import ErrorState from '../ErrorState/ErrorState';
import randomSearches from '../../randomSearches.js'
import { Route, Routes } from 'react-router-dom'

function App() {
  const [objectIDs, setObjectIDs] = useState([]);
  const [artObjects, setArtObjects] = useState([]);
  const [displayedArtObjects, setDisplayedArtObjects] = useState([]);
  const [searchEndpoint, setSearchEndpoint] = useState(`isHighlight=true&q=${randomSearches[Math.floor(Math.random()*randomSearches.length)]}`);
  const [isOnView, setIsOnView] = useState(false)
  const [isHighlight, setIsHighlight] = useState(false)
  const [asideInfo, setAsideInfo] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  //const [departmentEndpoint, setDepartmentEndpoint] = useState('');

  useEffect(() => {
    const fetchData = async() => {
        const res = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true${isHighlight ? '&isHighlight=true' : ''}${isOnView ? '&isOnView=true' : ''}&${searchEndpoint}`)
        //console.log(`https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true${isHighlight ? '&isHighlight=true' : ''}${isOnView ? '&isOnView=true' : ''}&${searchEndpoint}`)
        const resJson = await res.json()
        .catch(error => setError(error));
        console.log(resJson)
        if(resJson.objectIDs === null) {
          setError("No results")
          setTimeout(() => setIsLoading(false), 2500)
        } else {
          setError('')
          setObjectIDs(resJson.objectIDs.splice(0, 50))
        }

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
                  .catch(error => setError(error));
                  objArray.push(resJson)
                  
                  if(i === objectIDs.length-1) {
                      setArtObjects(objArray)
                      setDisplayedArtObjects(objArray)
                      setIsLoading(false)
                      console.log(objArray)
                  }
              }
              setIsLoading(true)
              fetchData();
      }

    }, [objectIDs]);
    
  const handleSubmit = (event, searchQuery) => {
    event.preventDefault();
    if(!searchQuery){
      return;
    } else {
      setIsLoading(true);
      setDisplayedArtObjects([]);
      setSearchEndpoint(`q=${searchQuery}`);
    }
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
      <Nav 
        handleSubmit={handleSubmit} 
        handleChecked={handleChecked}
        />
      <Routes>
        {/* <Route path="/" element={<Details />} />  */}
        <Route path="/" element={ 
          isLoading ? <LoadingScreen handleSort={handleSort} /> :
            error ? <ErrorState /> : 
              <div className="image-grid-aside-wrapper">
                <ImageGrid 
                displayedArtObjects={displayedArtObjects} 
                handleSort={handleSort} 
                handleHover={handleHover} 
                clearAsideInfo={clearAsideInfo} 
                searchEndpoint={searchEndpoint}
                />
                <AsideInfo asideInfo={asideInfo} />
              </div>
          } />
        <Route path="/about" element={<About />} />
        <Route path="/details" element={<Details />}>
          <Route path="/details/:objectID" element={<Details />}/>
        </Route>
        <Route path="*" element={<ErrorState is404={true} />} />
      </Routes>
    </main>
  );
}

export default App;

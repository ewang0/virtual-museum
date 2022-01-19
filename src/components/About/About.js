import React from 'react'
import './About.scss'

const About = () => {
    return(
        <section className="about-section-container">
            <div className="about-section-content">
                <img src="met-picture.jpeg"></img>
                <h2>About</h2>
                <p>METVIRTUAL is a 6-day solo project by Eric Wang, built with JavaScript and React.* In addition to searching objects in the museum's collection, users can filter their search by objects on view at the museum, and sort search results by department. Image and object data is fetched from the <a href="https://metmuseum.github.io/" target="blank" rel="noreferrer">Metropolitan Museum of Art Collection API</a>.</p>
                <p>*This is a personal project and in no way affiliated with The Metropolitan Museum of Art in New York.</p>
            </div>
            
        </section>
    )
}

export default About;
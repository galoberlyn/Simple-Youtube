import React, {useState, useEffect} from "react";
import axios from 'axios';
import environment from '../../config/environment';
import { DefaultPlayer as Video } from 'react-html5video';
import 'react-html5video/dist/styles.css';
import Player from '../../player.png';

// setup the nav links 

let Nav = () => {

  const [videos, setVideos] = useState({});
  const [videoCount, setVideoCount] = useState(0);

  let params = {}; //no need to pass any

  useEffect( () => {
    axios.get(`${environment.REACT_REST_API()}/videos/video-list`, params)
    .then( (response) => {
      if(response.status == 200) {
        setVideos(response.data);
        if(response.data.length > 0) {
          setVideoCount(1);
        } 
      }
    })
    .catch(error => {
      console.log('Something went wrong while fetching data '+ error);
    });
  }, []);
  
  return (
    <div className="container">
      <h2 style={{'textAlign':'center', 'paddingTop' : '18px'}}> Favorites </h2>
      <h3 style={{'textAlign':'center',}}> {videoCount ? '' : 'No Videos, upload some :) ' } </h3>
        <ul>
          {Object.keys(videos).map( (key, index) => {
            return (
              <div key={videos[key].id} className="container" style={{'marginBottom': '10%'}}>
                  <span>{videos[key].title} <br/>
                  {videos[key].description}
                  </span> 
                  <Video loop muted
                      controls={['PlayPause', 'Seek', 'Time', 'Volume', 'Fullscreen']}
                      poster={Player}
                      onCanPlayThrough={() => {
                          // Do stuff
                      }}>
                      <source src={`${environment.REACT_REST_API()}/${videos[key].path}`} type="video/webm" />
                  </Video>
              </div>
              );
          })}
        </ul>
    </div>
  );
}




export default Nav;
import React, { useState } from "react";
import axios from 'axios';
import environment from '../../config/environment';



// component for video uploading

let UploadVideo = () => {

  // set file state to null first
  const [video, setVideoFile] = useState();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingState, setLoadingState] = useState('Uploading...');

  //set the state of the new file 
  let handleVideoState = event => {
    setVideoFile(event.target.files[0]);
  }

  //handle the uplaod of file
  let handleVideoUpload = event => {

    //form container

    //load the form
    setLoading(true);
    setLoadingState('Uploading...');

    //create a form instance
    const form = new FormData();

    //append data and file to the form
    form.append('file', video)
    form.append('title', title);
    form.append('description', description);

    //send the file to the server, reset the states
    axios.post(`${environment.REACT_REST_API()}/videos/upload`, form)
    .then( (response) => {
      if(response.status === 200) {
        setLoadingState('Successfully uploaded');
        setVideoFile(null);
        setTitle(null);
        setDescription(null);
      }
    })
    
  }
  
  //onclick to remove the value input

  return (
    <div className="container" style={{'paddingTop': '10px'}}>
    <form> 
      <div className="form-group container">
        <label>Video Title</label>
        <input type="text" name="title" onClick={e=> e.target.value = ''} placeholder="Enter video title" className="form-control" onKeyUp={e => setTitle(e.target.value)}/>
      </div>
      <div className="form-group container">
        <label>Video Description</label>
        <input type="text" name="description" onClick={e=> e.target.value = ''} placeholder="Enter video description" className="form-control"  onKeyUp={e => setDescription(e.target.value)}/>
      </div>
      <div className="form-group container">
        <label>Video Upload</label>
        <input type="file" style={{height:'58px'}} onClick={e=> e.target.value = ''} name="video_file" className="form-control" accept="video/*" onChange={handleVideoState} /> <br/>
      </div>
      <div className="form-group container">
        <button className="btn btn-success" type="button" onClick={handleVideoUpload}> Upload </button> {loading ? <span> {loadingState} </span> : ''} 
      </div>
    </form>
    </div>
  );
}

export default UploadVideo;
import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router } from 'react-router-dom';

//import components
import Navigation from './components/Nav/nav';
import VideoList from './components/Video/videoList';
import Upload from './components/Video/uploadVideo';

//any additional assets here
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
//setup the routes
const app = (
    <Router> 
        <div>
            <Navigation/>
            <Route exact path="/" component={VideoList} />
            <Route exact path="/upload" component={Upload} />
        </div>
    </Router>
)

//render the project
ReactDOM.render(app, document.getElementById('root'));


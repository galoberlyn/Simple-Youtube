var express = require('express');
var router = express.Router();
var VideoController = require('../controller/VideoController');

//Routes for videos

router.get('/video-list', VideoController.getAllVideos);
router.post('/upload', VideoController.handleVideoUpload); 

module.exports = router;

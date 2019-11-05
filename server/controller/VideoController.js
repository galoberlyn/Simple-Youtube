const multer = require('multer');


var helpers = require('../middleware/helpers');



/**
 * handleVideoUpload
 * 
 * handles the upload process, respond to user
 * 
 * @param {object} (req, res, next)      express 
 * @param {object} res                   response to client
 */
exports.handleVideoUpload = (req, res, next) => {
    
    // generate a timestamp
    let timeStamp = helpers.generateTimeStamps();
    
    // initiate storage instance
    let storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './public/videos');
        },
        filename: function (req, file, cb) {
            cb(null, `${timeStamp}-${file.originalname}`); 
        }
    });

    //upload instance 
    let upload = multer({ storage: storage }).single('file');

    upload(req, res, (err) => {

        //handle errors
        if (err instanceof multer.MulterError) {

            return res.status(500).json({
                status: 'Failed',
                message: 'Something went wrong, please try again later',
                error_message: err
            });

        } else if (err) {
            
            return res.status(500).json({
                status: 'Failed',
                message: 'Something went wrong, please try again later',
                error_message: err
            });
        }

        //savedetails to json object
        helpers.saveUploadedDetails(req.file, req.body);

        //if there are no errors, send the success response to client
        return res.status(200).json({
            status: 'Success',
            message: 'Successfully uploaded file'
        });
    });

}


/**
 * getAllVideos
 * 
 * responds the all the video list and its details to the client
 * 
 * @param {object} (req, res, next)      express 
 * @param {object} res                   response to client
 */

exports.getAllVideos = (req, res, next) => {

    (async () =>{
    
    // get videos 
    let allVideos = await helpers.getAllVideos();
    
    return res.status(200).json(allVideos);

    })();
}
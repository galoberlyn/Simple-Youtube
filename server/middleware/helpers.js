require('dotenv').config();

const fs = require('fs');
var express = require('express');
var router = express.Router();
//set up storage data of uploaded files



/**
 * saveUploadedDetails
 * 
 * handles the upload details, writes to json object
 * 
 * @param {object} fileDetails           details of the file uploaded.
 * @param {object} formDetails           input fields of the form.
 */

exports.saveUploadedDetails = (fileDetails, formDetails) => {

    fs.readFile(`${process.env.DB_FAKE}`, (err, data) => {
        if(err) { throw err; }

        let record = JSON.parse(data);
        var recordCount = record.length; //used for unique identifier

        //construct details
        let uploadDetails = {
            "id" : recordCount + 1,
            "path" : fileDetails.path,
            "title" : formDetails.title,
            "description" : formDetails.description
        };

        //push to array
        record.push(uploadDetails);

        //write to db
        fs.writeFileSync(`${process.env.DB_FAKE}`, JSON.stringify(record))
        
    });

}

/**
 * getAllVideos
 * 
 * returns the list of videos and it's details
 * 
 * @return {Promise}                     returns the Promise intance of json object            
 */
exports.getAllVideos = () => {

    return new Promise((resolve, reject) => {

        fs.readFile(`${process.env.DB_FAKE}`, (err, data) => {
            if(err) { throw err; }

            let record = JSON.parse(data);

            record.forEach((value, key) => {
                //assign the path to a temporaray variable
                let tempPath = record[key].path;
                //remove the "/public" in routes
                record[key].path = (tempPath).substring(tempPath.indexOf("\\") + 1);
            });
            resolve(record);
 
        });
    });
}

/**
 * generateTimeStamps
 * 
 * @return {date}     returns the time the date
 */

exports.generateTimeStamps = () => {
    
    return new Date().getTime();

}
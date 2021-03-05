/*
Helps to generate a secure presigned url for uploading the object to S3

Step-1:
Create a pre-signed url for a Object in S3 bucket

Step-2:
Upload the Object using the Generated URL 

This code uses nodejs for generating the pre-signed URL and upload object using generated URL.

Refer index.html for font end code for uploading the object to S3

*/


const AWS = require('aws-sdk');
const fs = require('fs');
const axios = require('axios');


const s3 = new AWS.S3();
const filePath = 'C:/Users/XXXX/Downloads/invoice.pdf';


var params = {
    Bucket: 'testing-presigned-url-dev',
    Key: 'dummy.pdf',
    "ContentType": "application/octet-stream"
};


s3.getSignedUrl('putObject', params, function (err, url) {
    console.log('The URL is', url);

    fs.writeFileSync("./url.txt", url);


    axios({
        method: "put",
        url,
        data: fs.readFileSync(filePath),
        headers: {
            "Content-Type": "application/octet-stream"
        }
    })
        .then((result) => {
            console.log('result', result);

        }).catch((err) => {
            console.log('err', err);

        });

});
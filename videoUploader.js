const AWS = require('aws-sdk');
const s3 = new AWS.S3();

exports.handler = async (event) => {
    debugger;
    let fileContent = event.isBase64Encoded ? Buffer.from(event.body, 'base64') : event.body;
    let fileName = `${Date.now()}`
    let movieName = event.headers["movieName"]

    let contentType = event.headers['content-type'] || event.headers['Content-Type'];
    let extension = contentType ? mime.extension(contentType) : '';


    let fullFileName = extension ? `${fileName}.${extension}` : fileName;


    try {
        let data = await s3.putObject({
            Bucket: "movilti-user-reviews",
            Key: fullFileName,
            Body: fileContent,
            Metadata: {}
        }).promise();

        console.log("Successfully uploaded file", fullFileName);
        return "Successfully uploaded : " + movieName;

    } catch (err) {
        console.log("Failed to upload file", fullFileName, err);
        //throw err;
    };

    return { "message": "Successfully executed" };

};
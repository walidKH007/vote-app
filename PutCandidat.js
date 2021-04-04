'use strict';
const AWS = require('aws-sdk');
exports.handler = async (event, context) => {
    const documentClient = new AWS.DynamoDB.DocumentClient();
    let responseBody = "";
    let statusCode = 0;
    const { candidat } = JSON.parse(event.body);
    const params = {
        TableName: "CandidatsTable",
        Key: {
            candidat: candidat
        },
        UpdateExpression: "set vote = vote + :val",
        ExpressionAttributeValues: {
            ":val": 1
        },
        ReturnValues: "UPDATED_NEW"
    };
    try {
        const data = await documentClient.update(params).promise(); responseBody = JSON.stringify(data); statusCode = 204;
    } catch (err) {
        responseBody = `Unable to update product: ${err}`; statusCode = 403;
    }
    const response = {
       statusCode: statusCode,
        headers: {
            "Content-Type": "application/json",
            "access-control-allow-origin": "*"
        },
        body: responseBody
    };
    return response;
};


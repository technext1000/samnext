const tableName = process.env.ProfileTable;

// Create a DocumentClient that represents the query to add an item
const dynamodb = require('aws-sdk/clients/dynamodb');
const docClient = new dynamodb.DocumentClient();

exports.signUpFunction=async (event)=>{
    if (event.httpMethod !== 'POST') {
        throw new Error(`getAllItems only accept GET method, you tried: ${event.httpMethod}`);
    }
    console.info('received:', event);
    const body = JSON.parse(event.body)

    var params = {
        TableName : tableName,
        Item: { email : body.email, name: body.name ,gender: body.gender,mobile:body.mobile,password: body.password }
    };

    const result = await docClient.put(params).promise();

    const response = {
        statusCode: 200,
        body: JSON.stringify("Registration Successfuly Comppleted")
    };

    // All log statements are written to CloudWatch
    console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`);
    return response;
    
}
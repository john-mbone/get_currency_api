const AWS = require('aws-sdk');
const db = new AWS.DynamoDB.DocumentClient({ region: 'us-east-2' })

exports.handler = (event, context, callback) => {
    
    const params =  {
            TableName: 'crypto_currency_exchange',
            List: 10
        }
   
    getData(params).then(data=>{
        const items = data.Items.reverse();
        callback(null, {statusCode:200,
        headers: {
            // "Access-Control-Allow-Headers" : "Content-Type",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET"
        },body:JSON.stringify(items)})
    })
};


function getData(params){
    return db.scan(params).promise();
}

const AWS = require('aws-sdk')
const DynamoDB = new AWS.DynamoDB.DocumentClient()
const TableName = 'Users-dev'

exports.handler = async (event) => {
  let statusCode = 200
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Origin': '*'
  }
  let body = {}

  const Id = event.pathParameters.id
  if (Id !== undefined) {
    const props = JSON.parse(event.body)
    const Name = props.name
    const Class = props.class
    const Phone = props.phone

    const res = async () => {
      const params = {
        TableName,
        Key: {
          Id,
          Name,
          Class,
          Phone
        },
        UpdateExpression: 'SET #Name = :Name, #Class = :Class, #Phone = :Phone',
        ExpressionAttributeNames: {
          '#Name': 'Name',
          '#Class': 'Class',
          '#Phone': 'Phone'
        },
        ExpressionAttributeValues: {
          ':Name': Name,
          ':Class': Class,
          ':Phone': Phone
        },
        ReturnValues: 'UPDATED_NEW'
      }
      return await DynamoDB.update(params, function (err, data) {
        if (err) console.log(err)
        else console.log(data)
      }).promise()
    }

    console.log(body)
    let body = res.Item
    if (body === undefined) {
      statusCode = 404
    }
  } else {
    statusCode = 400
  }

  return {
    statusCode,
    headers,
    body: JSON.stringify(body),
    isBase64Encoded: false
  }
}

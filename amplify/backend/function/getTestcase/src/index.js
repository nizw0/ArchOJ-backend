const AWS = require('aws-sdk')
const DynamoDB = new AWS.DynamoDB.DocumentClient()
const TableName = 'Testcases-dev'

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
    const res = await (() => {
      const params = {
        TableName,
        Key: {
          Id
        }
      }
      return DynamoDB.get(params, function (err, data) {
        if (err) console.log(err)
        else console.log(data)
      }).promise()
    })()

    body = res.Item
    if (body === undefined) {
      statusCode = 400
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

const AWS = require('aws-sdk')
const DynamoDB = new AWS.DynamoDB.DocumentClient()
const TableName = 'Problems-dev'

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
    const Title = props.title
    const Description = props.description

    const res = await (() => {
      const params = {
        TableName,
        Key: {
          Id,
          Title,
          Description
        },
        UpdateExpression: 'SET #Title = :Title, #Class = :Class',
        ExpressionAttributeNames: {
          '#Title': 'Title',
          '#Description': 'Description'
        },
        ExpressionAttributeValues: {
          ':Title': Title,
          ':Description': Description
        },
        ReturnValues: 'UPDATED_NEW'
      }
      return DynamoDB.update(params, function (err, data) {
        if (err) console.log(err)
        else console.log(data)
      }).promise()
    })()

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

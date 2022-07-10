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
    const props = JSON.parse(event.body)
    const ProblemId = props.problemId
    const Input = props.input
    const Output = props.output

    const res = await (() => {
      const params = {
        TableName,
        Key: {
          Id,
          ProblemId,
          Input,
          Output
        },
        UpdateExpression: 'SET #ProblemId = :ProblemId, #Input = :Input, #Output = :Output',
        ExpressionAttributeNames: {
          '#ProblemId': 'ProblemId',
          '#Input': 'Input',
          '#Output': 'Output'
        },
        ExpressionAttributeValues: {
          ':ProblemId': ProblemId,
          ':Input': Input,
          ':Output': Output
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

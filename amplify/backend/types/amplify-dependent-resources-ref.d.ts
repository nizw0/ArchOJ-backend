export type AmplifyDependentResourcesAttributes = {
    "function": {
        "getPath": {
            "Name": "string",
            "Arn": "string",
            "Region": "string",
            "LambdaExecutionRole": "string"
        },
        "getUser": {
            "Name": "string",
            "Arn": "string",
            "Region": "string",
            "LambdaExecutionRole": "string"
        },
        "updateUser": {
            "Name": "string",
            "Arn": "string",
            "Region": "string",
            "LambdaExecutionRole": "string"
        }
    },
    "api": {
        "users": {
            "RootUrl": "string",
            "ApiName": "string",
            "ApiId": "string"
        },
        "problems": {
            "RootUrl": "string",
            "ApiName": "string",
            "ApiId": "string"
        },
        "testcases": {
            "RootUrl": "string",
            "ApiName": "string",
            "ApiId": "string"
        },
        "submissions": {
            "RootUrl": "string",
            "ApiName": "string",
            "ApiId": "string"
        },
        "workspaces": {
            "RootUrl": "string",
            "ApiName": "string",
            "ApiId": "string"
        },
        "statistics": {
            "RootUrl": "string",
            "ApiName": "string",
            "ApiId": "string"
        }
    },
    "storage": {
        "Users": {
            "Name": "string",
            "Arn": "string",
            "StreamArn": "string",
            "PartitionKeyName": "string",
            "PartitionKeyType": "string",
            "Region": "string"
        },
        "Problems": {
            "Name": "string",
            "Arn": "string",
            "StreamArn": "string",
            "PartitionKeyName": "string",
            "PartitionKeyType": "string",
            "Region": "string"
        },
        "Testcases": {
            "Name": "string",
            "Arn": "string",
            "StreamArn": "string",
            "PartitionKeyName": "string",
            "PartitionKeyType": "string",
            "Region": "string"
        },
        "Submissions": {
            "Name": "string",
            "Arn": "string",
            "StreamArn": "string",
            "PartitionKeyName": "string",
            "PartitionKeyType": "string",
            "Region": "string"
        }
    }
}
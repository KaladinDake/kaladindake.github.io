from __future__ import print_function
import random
import json
import decimal
import boto3
import datetime
from boto3.dynamodb.conditions import Key, Attr

# Helper class to convert a DynamoDB item to JSON.
class DecimalEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, decimal.Decimal):
            if o % 1 > 0:
                return float(o)
            else:
                return int(o)
        return super(DecimalEncoder, self).default(o)

# --------------- Main handler ------------------
def lambda_handler(event, context):
    username = event["queryStringParameters"]["username"]
    print("Adding username: " + username)
    jsoncallback = event["queryStringParameters"]["jsoncallback"]

    epoch = datetime.datetime.utcfromtimestamp(0)
    print("Epoch: " + str(epoch))
    millisSinceEpoch = int((datetime.datetime.now() - epoch).total_seconds() * 1000.0)
    print("Millis Since Epoch: " + str(millisSinceEpoch))
    earliestStartMillis = millisSinceEpoch - (1000 * 6 * 5) #5 minutes
    print("Earliest Start Ms : " + str(earliestStartMillis))

    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('scratchmultiplayer')

    response = table.put_item(
        Item={
            'date_inserted': millisSinceEpoch,
            'username': username
        }
    )

    print("PutItem succeeded:")
    print(json.dumps(response, indent=4, cls=DecimalEncoder))

    fe = Key('date_inserted').between(earliestStartMillis, millisSinceEpoch);
    pe = "date_inserted, username"
    response = table.scan(
        FilterExpression=fe,
        ProjectionExpression=pe
    )

    print("Response from dynamodb scan: " + str(response))

    unique_users = set()

    for i in response['Items']:
#        print(json.dumps(i, cls=DecimalEncoder))
#        print(i["username"])
        unique_users.add(i["username"])

    #print("Existing users: " + json.dumps(unique_users))

    unique_users.add(username)
    users = list(unique_users)
    print("Now users: " + json.dumps(users))

    callbackargs = {
        'users' : users,
        'count' : len(users)
    }
    body = jsoncallback + "(" + json.dumps(callbackargs) + ")"
    print("Body: " +body)

    return {
        "isBase64Encoded": "false",
        "statusCode": "200",
        "headers": { },
        "body": body
    }

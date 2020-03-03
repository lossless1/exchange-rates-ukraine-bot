const got = require('got');
const AWS = require('aws-sdk');
const tableName = 'exchane-rates-ukraine-bot';
class DynamoDatabase {
  constructor() {
    this.dynamodb = new AWS.DynamoDB({
      region: 'us-east-2',
      apiVersion: '2012-08-10'
    });
  }
  async listTables() {
    return this.dynamodb.listTables({}).promise();
  }

  async getItem() {
    var params = {
      TableName: tableName,
      Key: {
        123: {}
      },
      ProjectionExpression: 'integer'
    };
    this.dynamodb.getItem(params, function(err, data) {
      if (err) {
        console.log('Error', err);
      } else {
        console.log('Success', data.Item);
      }
    });
  }

  async putItem() {
    var params = {
      TableName: tableName,
      Item: {
        CUSTOMER_ID: { N: '001' },
        CUSTOMER_NAME: { S: 'Richard Roe' }
      }
    };

    this.dynamodb.putItem(params, function(err, data) {
      if (err) {
        console.log('Error', err);
      } else {
        console.log('Success', data);
      }
    });
  }

  async deleteItem() {
    var params = {
      TableName: tableName,
      Key: {
        KEY_NAME: { N: 'VALUE' }
      }
    };
    this.dynamodb.deleteItem(params, function(err, data) {
      if (err) {
        console.log('Error', err);
      } else {
        console.log('Success', data);
      }
    });
  }
  async batchGetItem() {
    var params = {
      RequestItems: {
        TABLE_NAME: {
          Keys: [
            { KEY_NAME: { N: 'KEY_VALUE_1' } },
            { KEY_NAME: { N: 'KEY_VALUE_2' } },
            { KEY_NAME: { N: 'KEY_VALUE_3' } }
          ],
          ProjectionExpression: 'KEY_NAME, ATTRIBUTE'
        }
      }
    };

    this.dynamodb.batchGetItem(params, function(err, data) {
      if (err) {
        console.log('Error', err);
      } else {
        data.Responses.TABLE_NAME.forEach(function(element, index, array) {
          console.log(element);
        });
      }
    });
  }
}

module.exports = DynamoDatabase;

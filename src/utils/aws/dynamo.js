const got = require('got');
const AWS = require('aws-sdk');

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

  async listTables() {
    return this.dynamodb.listTables({}).promise();
  }
  async putItem({ tableName }) {
    var params = {
      TableName: tableName,
      Item: {
        CUSTOMER_ID: { N: '001' },
        CUSTOMER_NAME: { S: 'Richard Roe' }
      }
    };

    ddb.putItem(params, function(err, data) {
      if (err) {
        console.log('Error', err);
      } else {
        console.log('Success', data);
      }
    });
  }

  async getItem() {
    var params = {
      TableName: 'TABLE',
      Key: {
        KEY_NAME: { N: '001' }
      },
      ProjectionExpression: 'ATTRIBUTE_NAME'
    };
    ddb.getItem(params, function(err, data) {
      if (err) {
        console.log('Error', err);
      } else {
        console.log('Success', data.Item);
      }
    });
  }

  async deleteItem() {
    var params = {
      TableName: 'TABLE',
      Key: {
        KEY_NAME: { N: 'VALUE' }
      }
    };
    ddb.deleteItem(params, function(err, data) {
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

    ddb.batchGetItem(params, function(err, data) {
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

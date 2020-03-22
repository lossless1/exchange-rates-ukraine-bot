const got = require('got');
const AWS = require('aws-sdk');
const tableName = 'exchane-rates-ukraine-bot';
const uuid = require('uuid/v4');

class DynamoDatabase {
  constructor() {
    this.dynamodb = new AWS.DynamoDB({
      region: 'us-east-2',
      apiVersion: '2012-08-10',
    });
  }

  // async listTables() {
  //   return this.dynamodb.listTables({}).promise();
  // }

  // async scan() {
  //   var params = {
  //     TableName: tableName,
  //   };
  //   this.dynamodb.scan(params, function(err, data) {
  //     if (err) {
  //       console.log('Error', err);
  //     } else {
  //       console.log('Success', data.Items);
  //     }
  //   });
  // }

  // async get() {
  //   var params = {
  //     TableName: tableName,
  //     KeyConditionExpression: 'CUSTOMER_ID = :i',
  //     // ExpressionAttributeValues: [(':i': ['2'])]
  //   };
  //   this.dynamodb.query(params, function(err, data) {
  //     if (err) {
  //       console.log('Error', err);
  //     } else {
  //       console.log('Success', data.Items);
  //     }
  //   });
  // }

  // async getItem() {
  //   var params = {
  //     TableName: tableName,
  //     Key: {
  //       123: {},
  //     },
  //     ProjectionExpression: 'integer',
  //   };
  //   this.dynamodb.getItem(params, function(err, data) {
  //     if (err) {
  //       console.log('Error', err);
  //     } else {
  //       console.log('Success', data.Item);
  //     }
  //   });
  // }

  async putItem(data) {
    const getType = type => {
      switch (type) {
        case 'string':
          return 'S';
        case 'number':
          return 'N';
        case 'bool':
          return 'B';
        default:
          return 'S';
      }
    };

    const preparedData = Object.keys(data).reduce((acc, key) => {
      return {
        ...acc,
        [key]: { [getType(typeof data[key])]: String(data[key]) },
      };
    }, {});

    const params = {
      TableName: tableName,
      Item: {
        'exchane-rates-ukraine-bot-primary-key': { S: uuid() },
        ...preparedData,
      },
      ReturnValues: 'NONE',
    };
    try {
      await this.dynamodb.putItem(params).promise();
    } catch (e) {
      throw new Error(e);
    }
  }

  // async deleteItem() {
  //   var params = {
  //     TableName: tableName,
  //     Key: {
  //       KEY_NAME: { N: 'VALUE' },
  //     },
  //   };
  //   this.dynamodb.deleteItem(params, function(err, data) {
  //     if (err) {
  //       console.log('Error', err);
  //     } else {
  //       console.log('Success', data);
  //     }
  //   });
  // }
  // async batchGetItem() {
  //   const params = {
  //     RequestItems: {
  //       TABLE_NAME: {
  //         Keys: [
  //           { KEY_NAME: { N: 'KEY_VALUE_1' } },
  //           { KEY_NAME: { N: 'KEY_VALUE_2' } },
  //           { KEY_NAME: { N: 'KEY_VALUE_3' } },
  //         ],
  //         ProjectionExpression: 'KEY_NAME, ATTRIBUTE',
  //       },
  //     },
  //   };

  //   this.dynamodb.batchGetItem(params, (err, data) => {
  //     if (err) {
  //       console.log('Error', err);
  //     } else {
  //       data.Responses.TABLE_NAME.forEach(function(element, index, array) {
  //         console.log(element);
  //       });
  //     }
  //   });
  // }
}

module.exports = DynamoDatabase;

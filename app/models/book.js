import { DynamoDBORM } from 'node-dynamodb-orm';
import AWS from 'aws-sdk';

class Book  {
    constructor() {
        this.table = 'books';
        this.db = new AWS.DynamoDB.DocumentClient({
            region: 'ap-northeast-1',
            endpoint: 'http://host.docker.internal:8000',
            accessKeyId: 'fakeAccessKeyId',
            secretAccessKey: 'fakeSecretAccessKey'
        });

        DynamoDBORM.updateConfig({
            region: 'ap-northeast-1',
            endpoint: 'http://host.docker.internal:8000',
            accessKeyId: 'fakeAccessKeyId',
            secretAccessKey: 'fakeSecretAccessKey'
        });
        this.orm = new DynamoDBORM('book');
    }

    test() {
        console.log('test')
    }

    async tables() {
        await this.db.listTables({Limit:100}, function(err, data) {
            if (err) {
                console.log(err, err.stack); 
            } else {
                console.log(data);
            }
        });
    }
    async books() {
        const books = await this.orm.findBy({type: 'book', name: '鬼滅の刃'});
        console.log(books);
    }
    async booksssss() {
        var params = {
            TableName : 'book',
            Key: {
                'type': 'book',
                'name': '鬼滅の刃'
            }
          };
        await this.db.get(params, function(err, data) {
            if (err) {
                console.log(err, err.stack); 
            } else {
                console.log(data);
            }
        });
    }
    
    async addTitle(title, description, image, url) {
        const item = {
            category: 'book',
            cname: 'name_' + title,
            timestamp: this.now(),
            detail: {
                    title: title,
                    description: description,
                    image: image, 
                    url: url
                }
        }
        const params = {
            TableName : 'books',
            Item: item
        };
        const res = await this.query('put', params)
    }

    async addImpressions(bookID, jsonData) {
        const res = await this.put('impressions', this.uuid('impression_' + bookID + '_'), jsonData)
    }

    async addBook(object) {
        return await this.put('books', 'book_' + object.title, object)
        //return await this.put('books', this.uuid('book_'), jsonData)
    }
    
    async deleteBook(book_id) {
        return await this.query('delete', {
            TableName : this.table,
            Key: {
                'category': 'books',
                'cname': book_id
            }
        })
    }

    async books() {
        const res = await this.query('query', {
            TableName : this.table,
            KeyConditionExpression: 'category = :c AND begins_with(cname, :n)',
            ExpressionAttributeValues: {
                ':c': 'books',
                ':n': 'book_'
            }
        })
        return res

    }

    uuid(prefix = '') {
        return prefix + new Date().getTime().toString(16)  + Math.floor(100*Math.random()).toString(16)
    }
    
    async put(pk, sk, object) {
        return await this.query('put', {
            TableName : this.table,
            Item: {
                category: pk,
                cname: sk,
                timestamp: this.now(),
                detail: object
            }
        })
    }

    async query(operation, params) {
        return await this.db[operation](params, (err, data) => {
            if (err) {
                console.log(err, err.stack)
                return null
            } else {
                return data
            }
        }).promise()
    }

    
    now() {
        const date = new Date()
        let format = 'YYYY/MM/DD hh:mm:ss'
        format = format.replace(/YYYY/g, date.getFullYear())
        format = format.replace(/MM/g, ('0' + (date.getMonth() + 1)).slice(-2))
        format = format.replace(/DD/g, ('0' + date.getDate()).slice(-2))
        format = format.replace(/hh/g, ('0' + date.getHours()).slice(-2))
        format = format.replace(/mm/g, ('0' + date.getMinutes()).slice(-2))
        format = format.replace(/ss/g, ('0' + date.getSeconds()).slice(-2))
        return format;
    }
}

export const BookModel = new Book()
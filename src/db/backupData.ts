const url = require('url');
const MongoClient = require('mongodb').MongoClient;

const sourceUrl = '';
const targetUrl = '';
const collections = ['users', 'transactions', 'chapters', 'comics', 'genres'];

async function backupData(collectionName) {
    const sourceClient = new MongoClient(sourceUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    try {
        await sourceClient.connect();
        const coll = sourceClient.db('prod').collection(collectionName);
        const cursor = coll.find();
        let data = [];
        await cursor.forEach((e) => {
            data.push(e);
        });

        await clone(data, collectionName);
    } finally {
        await sourceClient.close();
    }
}

async function clone(data, collectionName) {
    // console.log(data);
    const targetClient = new MongoClient(targetUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    try {
        await targetClient.connect();
        const coll = targetClient.db('prod').collection(collectionName);
        await coll.insertMany(data);
    } finally {
        await targetClient.close();
    }
}

collections.map(async (collectionName) => await backupData(collectionName));

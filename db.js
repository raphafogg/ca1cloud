const uri = process.env.MONGO_URI;
const MongoClient = require('mongodb').MongoClient;
const MONGO_OPTIONS = {useUnifiedTopology: true, useNewUrlParser: true};
const DB_NAME = 'bug-tracker';





module.exports = ()=>{
    const get = (collectionName, query={}) =>{
        return new Promise((resolve, reject)=>{
            MongoClient.connect(uri, MONGO_OPTIONS, (err, client)=> {
                if (err){
                    
                    return reject('CAN NOT CONNECT');
                }
                const db = client.db(DB_NAME);
                const collection = db.collection(collectionName);
                collection.find(query).toArray((err, docs)=>{
                    if (err){
                        console.log(err);
                        return reject('FIND FUNCTION FAILED');
                    }
                    resolve(docs);
                    client.close();
                });
            });
        });
    };





    const add = (collectionName, entry) =>{
        return new Promise((resolve, reject)=>{
            MongoClient.connect(uri, MONGO_OPTIONS, (err, client)=>{
                if (err){
                    console.log(err);
                    return reject('CAN NOT CONNECT');
                }
                const db = client.db(DB_NAME);
                const collection = db.collection(collectionName);
                collection.insertOne(entry, (err, results)=>{
                    if (err){
                        console.log(err);
                        return reject('ADD HAS FAILED');
                    }                    
                    resolve(results);
                    client.close();
                });
            });
        });
    };






    const count = (collectionName) =>{
        return new Promise((resolve, reject)=>{
            MongoClient.connect(uri, MONGO_OPTIONS, (err, client)=>{
                if (err){
                    console.log(err);
                    return reject('CAN NOT CONNECT');
                }
                const db = client.db(DB_NAME);
                const collection = db.collection(collectionName);
                collection.countDocuments({}, (err, results)=>{
                    if (err){
                        console.log(err);
                        return reject('COUNT HAS FAILED');
                    }
                    resolve(results);
                    client.close();
                });
            });
        });
    };
    




    const update = (collectionName, pipeline) =>{
        return new Promise((resolve, reject)=>{
            MongoClient.connect(uri, MONGO_OPTIONS, (err, client)=>{
                if (err){
                    console.log(err);
                    return reject('CAN NOT CONNECT');
                }
                const db = client.db(DB_NAME);
                const collection = db.collection(collectionName);
                collection.updateOne(pipeline[0], pipeline[1], (err, results)=>{
                    if (err){
                        console.log(err);
                        return reject('UPDATE HAS FAILED');
                    }
                    resolve(results);
                    client.close();
                });
            });
        });
    };





    const aggregate = (collectionName, pipeline=[]) =>{
        return new Promise((resolve, reject)=>{
            MongoClient.connect(uri, MONGO_OPTIONS, (err, client)=> {
                if (err){
                    console.log(err);
                    return reject('CAN NOT CONNECT');
                }
                const db = client.db(DB_NAME);
                const collection = db.collection(collectionName);
                collection.aggregate(pipeline).toArray((err, docs)=>{
                    if (err){
                        console.log(err);
                        return reject('CAN NOT AGGREGATE');
                    }
                    resolve(docs);
                    client.close();
                });
            });
        });
    };




    return {
        get,
        add,
        count,
        update,
        aggregate
    };
};
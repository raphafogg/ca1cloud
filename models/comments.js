const { ObjectID } = require('mongodb');

const db = require ('../db')();
const ObejectID = require('mongodb').ObjectID;
const COLLECTION = 'issues';

module.exports = () =>{
    const getEveryCommIs = async (isNumero) =>{
        const PIPELINE = [
            {$match: {"isNumero": isNumero}},
            {$project: {
                comments: 1,
                _id: 0,
                isNumero: 1

            }}
        ]

        const getComm = await db.aggregate(COLLECTION, PIPELINE);
        return getComm;       
    };

    const getOneComm = async (commID)=>{
        const PIPELINE = [
                {$match: {'comments_id': ObjectID(commID)}},
                {$project: {
                    comments: {$filter: {
                        input: '$comments',
                        as: 'comment',
                        cond: {$eq: ['$$comment._id', ObjectID(commID)]}
                    }},
                    _id: 0,
                    isNumero: 1,

                }}
        ]

        const comments = await db.aggregate(COLLECTION, PIPELINE);
        return comments;
    }

       

    
    const addC = async(isNumero, text, author)=>{
        const PIPELINE = [{sNome: isNumero}, {$push:{comments:{
            _id: new ObjectID(),
            text: text,
            author: author,
        }   
    
    }}]
        const results = await db.update(COLLECTION, PIPELINE);
        return results.results;

    };
    return {
        getEveryCommIs,
        getOneComm,
        addC,
    };
};

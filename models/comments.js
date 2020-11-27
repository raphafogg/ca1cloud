const { ObjectID } = require('mongodb');

const db = require('../db')();
const ObejectID = require('mongodb').ObjectID;
const COLLECTION = 'issues';

module.exports = () => {
    const getEveryCommIs = async (isNumero) => {
        try {
            const PIPELINE = [
                { $match: { "isNumero": isNumero } },
                {
                    $project: {
                        comments: 1,
                        _id: 0,
                        isNumero: 1

                    }
                }
            ]

            const comments = await db.aggregate(COLLECTION, PIPELINE);
            return {comments};
        } catch (err) {
            return { error: err }
        }
    };

    const getOneComm = async (commID) => {
        try {
            const PIPELINE = [
                { $match: { 'comments_id': ObjectID(commID) } },
                {
                    $project: {
                        comments: {
                            $filter: {
                                input: '$comments',
                                as: 'comment',
                                cond: { $eq: ['$$comment._id', ObjectID(commID)] }
                            }
                        },
                        _id: 0,
                        isNumero: 1,

                    }
                }
            ]

            const comments = await db.aggregate(COLLECTION, PIPELINE);
            return {comments};
        } catch (err) {
            return { error: err }
        }
    }




    const addC = async (isNumero, text, author) => {
        try{
        if (!isNumero || !text || !author) {
            return {
                error: "At least on of the fields is missing"
            }
        }
        const PIPELINE = [{ sNome: isNumero }, {
            $push: {
                comments: {
                    _id: new ObjectID(),
                    text: text,
                    author: author,
                }

            }
        }]
        const results = await db.update(COLLECTION, PIPELINE);
        return {results};
    }catch(err){
        return {error:err}
    }
    };
    return {
        getEveryCommIs,
        getOneComm,
        addC,
    };
};

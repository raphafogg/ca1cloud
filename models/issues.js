const db = require('../db')();
const ObjectID = require('mongodb').ObjectID;
const COLLECTION = 'issues';
module.exports = () => {
    const get = async (isNumero = null) => {
        try {
            if (!isNumero) {
                const issues = await db.get(COLLECTION);
                return {issues};
            }
            const issues = await db.get(COLLECTION, { isNumero })
            return {issues};
        } catch (err) {
            return { error: err }
        }
    };
    const getBpID = async (isNumero) => {
        try {
            let expression = new RegExp(isNumero);
            const byProject = await db.get(COLLECTION, { isNumero: expression });
            return {byProject};
        } catch (err) {
            return { error: err }
        }

    }
    const add = async (sNome, title, description, status, project_id) => {
        try {
            if (!sNome || !title || !status || !description || !project_id) {
                return {
                    error: "At least on of the fields is missing"
                }
            }
            const counter = await db.count(COLLECTION);
            const results = await db.add(COLLECTION, {
                sNome: `${sNome}-${counter + 1}`,
                title: title,
                description: description,
                status: status,
                project_id: new ObjectID(project_id),
                comments: []

            });
            return {results};
        } catch (err) {
            return { error: err }
        }

    };
    return {
        get,
        add,
        getBpID,
    };

};
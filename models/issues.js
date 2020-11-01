const db = require ('../db')();
const ObjectID = require('mongodb').ObjectID;
const COLLECTION = 'issues';
module.exports = () =>{
    const get = async (isNumero=null) =>{
        if(!isNumero){
            const allIs = await db.get(COLLECTION);
            return allIs;
        }
        const singleIs = await db.get(COLLECTION, {isNumero})
        return singleIs;

    };
    const getBpID = async (isNumero) =>{
        let expression = new RegExp(isNumero);
        const byProject = await db.get(COLLECTION, {isNumero: expression});
        return byProject;


    }
    const add = async(sNome, title, description, status, project_id)=>{
        const counter = await db.count(COLLECTION);
        const results = await db.add(COLLECTION, {
            sNome: `${sNome}-${counter+1}`,
            title: title,
            description: description,
            status: status,
            project_id: new ObjectID(project_id),
            comments: []

        });
        return results.results;

    };
    return {
        get,
        add,
        getBpID,
    };

};
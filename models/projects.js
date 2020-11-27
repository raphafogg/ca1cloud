const db = require('../db')();

const COLLECTION = 'projects';
module.exports = () =>{
    const get = async (slug=null) =>{
        try{
        if(!slug){
            const slugs = await db.get(COLLECTION);
            return {slugs};
        }
        const slugs = await db.get(COLLECTION, {slug})
        return {slugs};
    }catch(err){
        return {error:err}
    }

    };
    const add = async(slug, name, description)=>{
        try{
        if(!name || !slug || !description ){
            return {
                error: "At least on of the fields is missing"
            }
        }

        const projects = await db.get('projects', {slug} );

        if(projects.length > 0){
            return{
                error: "project already exists"
            }
        }
        const results = await db.add(COLLECTION, {
            slug: slug,
            name: name,
            description: description,
        });
        return {results};
    }catch(err){
        return {error:err}
    }

    };
    return {
        get,
        add,
    };

};
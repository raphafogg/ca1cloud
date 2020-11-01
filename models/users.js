const db = require ('../db')();
const COLLECTION = 'users';
module.exports = () =>{
    const get = async (email=null) =>{
        if(!email){
            const allUsers = await db.get(COLLECTION);
            return allUsers;
        }
        const singleUser = await db.get(COLLECTION, {email})
        return singleUser;

    };
    const add = async(name, email, usertype, key)=>{
        const results = await db.add(COLLECTION, {
            name: name,
            email: email,
            usertype: usertype,
            key: key,
        });
        return results.results;

    };

    const getByPass = async (key) => {
        if(!key){
            console.log('No key found.')
            return null;
        }

        const users = await db.get(COLLECTION, {key});
        if (users.length !==1) {
            console.log('That is a bad key, Harry.')
        }
        return users[0];
    }
    



    return {
        get,
        add,
        getByPass,
    };

};
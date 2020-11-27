const db = require ('../db')();
const COLLECTION = 'users';
const nodemailer = require("nodemailer");
const dbEmail = process.env.EMAIL;
const dbPass = process.env.PASSWORD;

module.exports = () =>{
    const get = async (email=null) =>{        try {
        if(!email){
            const user = await db.get(COLLECTION);
            return {user};
        }
        const user = await db.get(COLLECTION, {email})
        return {user};

    }catch(err){        console.log(err);        return {error:err,};
    }
    }





    const add = async(name, email, usertype, key)=>{
        //nodemail
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            host: "smtp.gmail.com",
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
              user: dbEmail, // generated ethereal user
              pass: dbPass, // generated ethereal password
            },
            tls:{
                rejectUnauthorized: false,
            }
          });
        
          // send mail with defined transport object
          let info = await transporter.sendMail({
            from: 'raphacaetanoti@gmail.com', // sender address
            to: email, // list of receivers
            subject: 'Hello ✔', // Subject line
            text: 'Welcome to Tracker 2.0', // plain text body
            html: '<b>Hello world?</b>', // html body
          });
        
          console.log("Message sent: %s", info.messageId);






        try {        if(!name || !email || !usertype || !key ){
            return {
                error: "At least one of the fields is missing."
            }
        }
        const user = await db.get('users', {email} );

        if(user.length > 0){
            return{
                error: "User already exists."
            }
        }
        const results = await db.add(COLLECTION, {
            name: name,
            email: email,
            usertype: usertype,
            key: key,
        });
        return {results};
    
}catch(err){    console.log(err);    return { error:err,};
}
};





    const getByPass = async (key) => {        if(!key){
            console.log('No key found.')
            return null;
        }
        try {
        const users = await db.get(COLLECTION, {key});
        if (users.length !==1) {
            console.log('That is a bad key, Harry.')
        }
        return users[0];
        
    }catch (err){
        console.log(err);
        return { error:err,};
    }
}
    



    return {
        get,
        add,
        getByPass,
    };

};
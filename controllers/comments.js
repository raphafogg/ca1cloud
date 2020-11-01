const comments = require ('../models/comments')();
module.exports = () => {

    const getEveryone = async (req, res)=>{
        res.json(await comments.getEveryCommIs(req.params.isNumero))
    }

    const getComm = async (req, res)=>{
        res.json(await comments.getOnecomm(req.params.commID));
    }
   
    const postComm = async (req, res) => {
        let isNumero = req.params.isNumero;
        let text = req.body.text;
        let author = req.body.author;
        

        const results = await comments.addC(isNumero, text, author);
        res.json(results);
    };
    return {
        
        postComm,
        getEveryone,
        getComm
    };
    
};  
const comment = require ('../models/comments')();
module.exports = () => {

    const getEveryone = async (req, res)=>{
        let {comments, error} = await comment.getEveryCommIs(req.params.isNumero);
        
        if (error){
            res.status(500).json({
                error, 
            })
        }
        res.json(comments)
    }

    const getComm = async (req, res)=>{
        const { comments, error} = await comment.getOnecomm(req.params.commID);
       
        if (error){
            res.status(500).json({
                error, 
            })
        }
        res.json(comments);
    }
   
    const postComm = async (req, res) => {
        let isNumero = req.params.isNumero;
        let text = req.body.text;
        let author = req.body.author;
        const {results, error} = await comment.addC(isNumero, text, author);
        if (error){
            res.status(500).json({
                error, 
            })
        }
        res.json(results);
    };
    return {
        
        postComm,
        getEveryone,
        getComm
    };
    
};  
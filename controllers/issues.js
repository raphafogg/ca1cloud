const issues = require ('../models/issues')();
module.exports = () => {
    const getControl = async(req, res)=> {
        res.json(await issues.get())
    };
    const getByIs = async(req, res) =>{
        res.json(await issues.get(req.params.slug));
    };
    const getByPr = async(req, res) =>{
        res.json(await issues.get(req.params.slug));
    };




    const postController = async (req, res) => {
        let sNome = req.params.sNome;
        let title = req.body.title;
        let description = req.body.description;
        let status = req.body.status;
        let project_id = req.body.project_id;

        const results = await issues.add(sNome, title, description, status, project_id);
        res.json(results);
    };
    return {
        getControl,
        postController,
        getByIs,
        getByPr,
    };
    
};  
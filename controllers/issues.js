const issue = require ('../models/issues')();
module.exports = () => {
    const getControl = async(req, res)=> {
        const {issues, error} = await issue.get();
        if (error){
            res.status(500).json({
                error, 
            })
        }
        res.json(issues)
    };
    const getByIs = async(req, res) =>{
        const {issues, error} = await issue.get(req.params.slug);
        if (error){
            res.status(500).json({
                error, 
            })
        }
        res.json(issues);
    };
    const getByPr = async(req, res) =>{
        const {byProject, error} = await issue.getBpID(req.params.slug);
        if (error){
            res.status(500).json({
                error, 
            })
        }
        res.json(byProject);
        
    };

    const postController = async (req, res) => {
        let sNome = req.params.sNome;
        let title = req.body.title;
        let description = req.body.description;
        let status = req.body.status;
        let project_id = req.body.project_id;

        const {results, error} = await issue.add(sNome, title, description, status, project_id);
        if (error){
            res.status(500).json({
                error, 
            })
        }
        res.json(results);
    };
    return {
        getControl,
        postController,
        getByIs,
        getByPr,
    };
    
};  
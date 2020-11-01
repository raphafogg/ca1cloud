const projects = require ('../models/projects')();
module.exports = () => {
    const getControl = async(req, res)=> {
        res.json(await projects.get())
    };
    const getBs = async(req, res) =>{
        res.json(await projects.get(req.params.slug));
    };
    const postController = async (req, res) => {
        let slug = req.body.slug;
        let name = req.body.name;
        let description = req.body.description;
        const results = await projects.add(slug, name, description);
        res.json(results);
    };
    return {
        getBs,
        getControl,
        postController,
    };
    
};  
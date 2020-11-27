const projects = require ('../models/projects')();
module.exports = () => {
    const getControl = async(req, res)=> {
        const {slugs, error} = await projects.get();
        if (error){
            res.status(500).json({
                error, 
            })
        }
        res.json(slugs)
    };
    const getBs = async(req, res) =>{
        const {slugs, error} = await projects.get(req.params.slug);
        if (error){
            res.status(500).json({
                error, 
            })
        }
        res.json(slugs)
    };
    const postController = async (req, res) => {
        let slug = req.body.slug;
        let name = req.body.name;
        let description = req.body.description;
        const {results, error} = await projects.add(slug, name, description);
        if (error){
            res.status(500).json({
                error, 
            })
        }
        res.json(results);
    };
    return {
        getBs,
        getControl,
        postController,
    };
    
};  
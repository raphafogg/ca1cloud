const express = require('express');
const bodyParser = require('body-parser');
const users = require('./controllers/users')();
const app = (module.exports = express());
const port = process.env.PORT || 3000;
const hostname = '0.0.0.0';
const projects = require('./controllers/projects')();
const issues = require('./controllers/issues')();
const comments = require(`./controllers/comments`)();
const usersModel = require ('./models/users')();

//consts

app.use(async (req, res, next) =>{
    const failedMessage = {
        error: 'Not authenticated',
        message: 'Access denied',
        code: 'lol',
            }

    const supKey = req.headers['x-api-key'];
    const cleintIp = req.headers['x-forwarded-for'] || req.connection.remoteAdress;
    if (!supKey) {
    console.log('Failed: no key provided');
    new Date(), cleintIp;
    failedMessage.code = '01';
return res.status(401).json(failedMessage);
}

const user = await usersModel.getByPass(supKey);

if(!user){
    failedMessage.code='02';
    return res.status(401).json(failedMessage);

}

next();


})



app.use(bodyParser.json());

// users routers

app.get(`/users`, users.getControl);
app.get(`/users/:email`, users.getByEmail);
app.post('./users', users.postController);

// projects routers

app.get(`/projects`, projects.getControl);
app.get(`/projects/:slug`, projects.getBs);
app.post(`/projects`, projects.postController);

// issues routers

app.get('/issues', issues.getControl);
app.get('/issues/:slug', issues.getByIs);
app.get(`/projects/:slug/issues`, issues.getByPr);
app.post('/projects/:sNome/issues', issues.postController);

// // comments routers

app.get(`/issues/:isNumero/comments/:commID`, comments.getComm);
app.get(`/issues/:isNumero/comments`,comments.getEveryone);
app.post(`/issues/:isNumero/comments`,comments.postComm);

app.get('/', (req, res)=>{
    res.send('Hello world');
})

app.listen(port, hostname, ()=>{
    console.log(`App listening at http://${hostname}:${port}`);
});
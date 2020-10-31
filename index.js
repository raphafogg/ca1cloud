const express = require('express');
const bodyParser = require('body-parser');
const users = require('./controllers/users')();
const app = (module.exports = express());
const port = process.env.PORT || 3000;
const hostname = '0.0.0.0';

app.use(bodyParser.json());

app.get(`/users`, users.getControl);
app.get(`/users/:email`, users.getByEmail);
app.post('./users', users.postController);



app.get('/', (req, res)=>{
    res.send('Hello world');
})

app.listen(port, hostname, ()=>{
    console.log(`App listening at http://${hostname}:${port}`);
});
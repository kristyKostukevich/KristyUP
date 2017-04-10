let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let articleMapper = require(__dirname+'/server/db/data-mapper/article-mapper');
let tagsMapper = require(__dirname+'/server/db/data-mapper/tags-mapper');
let userMapper = require(__dirname+'/server/db/data-mapper/user-mapper');
app.use(express.static('public'));

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.get('/articles', (req, res) => {
  res.send(JSON.stringify(articleMapper.getArticles()));
});

app.get('/article/:id',  (req, res) =>{
    let id = req.params.id;
    res.send(JSON.stringify(articleMapper.getArticleById(id)));
});
app.post('/articles',  (req, res)=> {
  articleMapper.addArticle((req.body));
  res.json(req.body);
});
app.put('/articles', (req, res)=> {
    articleMapper.deleteArticle(req.body.id);
    articleMapper.addArticle((req.body));
    res.json(req.body);
});
app.put('/articles/:id',  (req, res)=> {
    articleMapper.deleteArticle(req.params.id);
    articleMapper.addArticle((req.body));
    res.json(req.body);
});

app.delete('/article/:id',  (req, res)=> {
    let id = req.params.id;
    articleMapper.deleteArticle(id);
    res.json({removeId: id});
});
app.get('/tags', (req, res) => {
    res.send(JSON.stringify(tagsMapper.getTags()));
});
app.post('/tags',  (req, res)=> {
    tagsMapper.addTag((req.body));
    res.json(req.body);
});
app.get('/user', (req, res) => {
    res.send(JSON.stringify(userMapper.getUser()));
});
app.post('/user',(req, res)=> {
    userMapper.addUser(req.body);
    res.json(req.body);
});
app.delete('/user',  (req, res)=> {

    userMapper.deleteUser();
    res.end;
});
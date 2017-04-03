var express = require('express');
var app = express();
var bodyParser = require('body-parser');
let articleMapper = require(__dirname+'/server/db/data-mapper/article-mapper');

app.use(express.static('public'));

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.get('/articles', (req, res) => {
  res.send(JSON.stringify(articleMapper.getArticles()));
});

app.get('/article/:id', function (req, res) {
    let id = req.params.id;
    res.send(JSON.stringify(articleMapper.getArticleById(id)));
});
app.post('/articles', function (req, res) {
  articleMapper.addArticle((req.body));
  res.json(req.body);
});
app.put('/articles', function (req, res) {
    articleMapper.deleteArticle(req.body.id);
    articleMapper.addArticle((req.body));
    res.json(req.body);
});
app.put('/articles/:id', function (req, res) {
    articleMapper.deleteArticle(req.params.id);
    articleMapper.addArticle((req.body));
    res.json(req.body);
});

app.delete('/article/:id', function (req, res) {
    let id = req.params.id;
    articleMapper.deleteArticle(id);
    res.json({removeId: id});
});
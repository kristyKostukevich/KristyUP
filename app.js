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


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

let cookieParser = require('cookie-parser');
let passport = require('passport');
let expressSession = require('express-session');

// let LocalStrategy = require('passport-local').Strategy;

app.use(expressSession({secret: 'mySecretKey'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

let LocalStrategy   = require('passport-local').Strategy;

passport.use(new LocalStrategy({
        passReqToCallback : true
    },
    function(req, username, password, done) {
        let user = userMapper.getUserByName(username)[0];
        if (!user) {
            console.log('User Not Found with username '+username);
            return done(null, false);
        }
        if (user.password != password) {
            console.log('Invalid Password');
            return done(null, false);
        }
        return done(null, user);
    }));




app.post('/login', passport.authenticate('local'), (req, res) => {
    res.sendStatus(200);
});






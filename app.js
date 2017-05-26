let express = require('express');

let app = express();

let bodyParser = require('body-parser');


app.use(express.static('public'));

let mongoClient = require("mongodb").MongoClient;

let url = "mongodb://localhost:27017/usersdb";


app.listen(3000, function () {
    console.log('Example app listening on port 3000!')

});




app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let cookieParser = require('cookie-parser');
let passport = require('passport');
let expressSession = require('express-session');



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


passport.use(new LocalStrategy({  passReqToCallback : true },
    function(req, username, password, done) {
        mongoClient.connect(url, function (err, db) {
            db.collection("users").find({user:username,password:password}).toArray(function (err, results) {
                if(results.length == 0)  return done(null, false);
                else return done(null,{user:username, password:password});
                db.close();
            });
        });
    }));

app.post('/login', passport.authenticate('local'), (req, res) => {
    res.sendStatus(200);
});

app.use((req, res, next) => {
    if (req.isAuthenticated()) { next(); }
});



app.get('/articles', (req, res) => {
    mongoClient.connect(url, function (err, db) {
        let articles = db.collection("articles");
        if (err) {
            return console.log(err);
        }
        articles.find().toArray(function (err, results) {
            res.send(JSON.stringify(results));
            //console.log(results);
            db.close();
        });


    });
});
app.get('/article/:id',  (req, res) =>{
    let id = req.params.id;
    mongoClient.connect(url, function (err, db) {
        let articles = db.collection("articles");
        articles.find({id: id}).toArray(function (err, results) {
            res.send(JSON.stringify(results));
            db.close();
        });
    });
});
app.post('/articles',  (req, res)=> {

    mongoClient.connect(url, function (err, db) {
    let articles = db.collection("articles");
        articles.insertOne(req.body, function(err, result){
            db.close();
        });
    });
  res.json(req.body);
});
app.put('/articles', (req, res)=> {
    // articleMapper.deleteArticle(req.body.id);
    // articleMapper.addArticle((req.body));

    mongoClient.connect(url, function (err, db) {
        let articles = db.collection("articles");
        articles.findOneAndUpdate(
            {id: req.body.id},
            {
                $set: {
                    title: req.body.title,
                    summary: req.body.summary,
                    content: req.body.content
                }
            },
            function (err, result) {
                res.json(req.body);
                db.close();
            }
        );
    });


});
app.put('/articles/:id',  (req, res)=> {

    mongoClient.connect(url, function (err, db) {
        let articles = db.collection("articles");
        articles.findOneAndUpdate(
            {id: req.params.id},
            {
                $set: {
                    title: req.body.title,
                    summary: req.body.summary,
                    content: req.body.content
                }
            },
            function (err, result) {
                res.json(true);
                db.close();
            }
        );
    });

    res.json(req.body);
});
app.delete('/article/:id',  (req, res)=> {


    mongoClient.connect(url, function (err, db) {
        let articles = db.collection("articles");
        articles.deleteOne({id: req.params.id}, function(err, result) {
            res.json({removeId: req.params.id});
            db.close();
        });
    });


});

app.get('/tags', (req, res) => {

    mongoClient.connect(url, function (err, db) {
        let articles = db.collection("tags");
        if (err) {
            return console.log(err);
        }
        articles.find().toArray(function (err, results) {
            res.send(JSON.stringify(results));

            db.close();
        });


    });
});
app.post('/tags',  (req, res)=> {

    mongoClient.connect(url, function (err, db) {
        let articles = db.collection("tags");
        articles.insertOne(req.body, function(err, result){
            db.close();
        });
    });
    res.json(req.body);
});
app.get('/user', (req, res) => {

    mongoClient.connect(url, function (err, db) {
        let articles = db.collection("user");
        if (err) {
            return console.log(err);
        }
        articles.find().toArray(function (err, results) {
            res.send(JSON.stringify(results));

            db.close();
        });


    });
});
app.post('/user',(req, res)=> {

    mongoClient.connect(url, function (err, db) {
        let articles = db.collection("user");
        articles.insertOne(req.body, function(err, result){
            db.close();
        });
    });
    res.json(req.body);
});
app.delete('/user',  (req, res)=> {


    mongoClient.connect(url, function (err, db) {
        let articles = db.collection("user");
        articles.drop();
            res.end;
            db.close();

    });
});


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////







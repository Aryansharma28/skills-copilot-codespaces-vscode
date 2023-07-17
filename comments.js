//create web server
var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })

//set view engine
app.set('view engine', 'ejs');

//load static files
app.use(express.static('public'));

//load comments
var comments = require('./comments.json');

//load comments page
app.get('/comments', function(req, res) {
    res.render('comments', { comments: comments });
});

//load new comment page
app.get('/newcomment', function(req, res) {
    res.render('newcomment');
});

//add new comment
app.post('/newcomment', urlencodedParser, function(req, res) {
    if (req.body.comment != '') {
        comments.push(req.body);
        var json = JSON.stringify(comments);
        fs.writeFile('./comments.json', json, 'utf8', function() {});
    }
    res.redirect('/comments');
});

//delete comment
app.get('/deletecomment/:id', function(req, res) {
    if (req.params.id != '') {
        comments.splice(req.params.id, 1);
        var json = JSON.stringify(comments);
        fs.writeFile('./comments.json', json, 'utf8', function() {});
    }
    res.redirect('/comments');
});

//load edit comment page
app.get('/editcomment/:id', function(req, res) {
    if (req.params.id != '') {
        res.render('editcomment', { comment: comments[req.params.id], id: req.params.id });
    }
});

//edit comment
app.post('/editcomment/:id', urlencodedParser, function(req, res) {
    if (req.body.comment != '') {
        comments[req.params.id] = req.body;
        var json = JSON.stringify(comments);
        fs.writeFile('./comments.json', json, 'utf8', function() {});
    }
    res.redirect('/comments');
});

//server listener
app.listen(3000, function() {
    console.log('listening on port 3000');
});
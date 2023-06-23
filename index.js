var express = require('express');
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
var path = require('path')

var app = express();
var sqlite3 = require('sqlite3');
var db = new sqlite3.Database('crud.db');


const arr = [];
app.use(express.static(path.join(__dirname, 'public')));

// set the view engine to ejs
app.set('view engine', 'ejs');

// CREATE //
app.post('/insert', jsonParser, function(req, res) {
    try{
        db.run("INSERT INTO Foo (name, description, status) "+
        "VALUES ('"+req.body.name+"', '"+req.body.description+"','"+req.body.status+"')");
        res.status(202).send(req.body)
    } catch (error) {
        res.status(422).send('error inserting: '+error)
    }
});

// READ //
app.get('/', jsonParser, function(req, res) {
    db.all("SELECT * FROM Foo", function(err, row) {
        res.render('main.ejs', {row});
    });
});

// UPDATE //
app.put('/edit/:id', jsonParser, function(req,res) {
    try{
      db.run("UPDATE Foo SET "+
      " name = '"+req.body.name+"', " +
      " description = '"+req.body.description+"', " +
      " status = '"+req.body.status+"', " +
      " timestamp = '"+req.body.date+"' " +
      " WHERE id = "+req.params.id+";");
      res.status(202).send(req.body)
    }catch(error){
      res.status(422).send('error updating: '+error)
    }
  })

// DELETE //
app.delete('/delete/:id', jsonParser,  function(req, res) {
    try{
        db.run("DELETE FROM Foo where id = "+req.params.id+" ");
        res.status(202).send(req.params.id)
    } catch (error) {
        res.status(422).send('error deleting: '+error)
    }
});


app.listen(8080);
console.log('Server is listening on port 8080');
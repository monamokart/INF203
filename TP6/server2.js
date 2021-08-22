const express = require("express");
const morgan = require("morgan");
const fs = require('fs');
const port = process.argv[2];
const app  = express();

var db = fs.readFileSync("db.json");
var db_array = JSON.parse(db);


app.listen(port, () => console.log('Example app listening on port'+ port));

app.get('/', (req, res) => res.send('Hi'));

app.get('/end', function (req, res) {
  res.send("The server will stop now");
  process.exit(0);
  });


app.get('/reload',  (req, res) => {
  db = fs.readFileSync("db.json");
  db_array = JSON.parse(db);
  res.type("text/plain");
  res.send("db.json reloaded");
});

app.get('/nbpapers', (req, res) => {
  res.type("text/plain");
  res.send((new Number(db_array.length)).toString());
  });

app.get('/byautor/:name', (req, res)=>{

  var author = req.params.name;
  var count = 0;
  for (val of db_array){
    if (val.authors.join(" ").includes(author)){count++}
  }
  res.type("text/plain");
  res.send((new Number(count)).toString());
})

app.get('/paper_from/:name', (req, res)=>{
  var array_descriptor=[];
  var author = req.params.name;
  for (val of db_array){
    if (val.authors.join(" ").includes(author)){
      array_descriptor.push(val);
    }
  }
  res.type("application/json");
  res.send(JSON.stringify(array_descriptor));
})

app.get('/tt/:name', (req, res)=>{
  var array_title=[];
  var author = req.params.name;
  for (val of db_array){
    if (val.authors.join(" ").includes(author)){
      array_title.push(val.title);
    }
  }
  res.type("application/json");
  res.send(JSON.stringify(array_title));
})

app.get('/reference/:key', (req, res)=>{
  var key_id = req.params.key;
  var descriptor={};
  for (val of db_array){
    if (val.key==key_id){
      descriptor = val;
    }
  }
  if (descriptor!={}){
    res.type("application/json");
    res.send(JSON.stringify(descriptor));
  }
  else {
    res.sendStatus(404);
  }
})

app.delete('/reference/:key', (req, res)=>{
  var key_id = req.params.key;
  var index = undefined;
  for (var i in db_array){
    if (db_array[i].key==key_id){
      var index=i;
    }
  }
  if (index!=undefined){
    db_array.splice(index, 1)
    res.type("application/json");
    res.send(JSON.stringify(db_array));
  }
  else {
    res.sendStatus(404);
  }
})
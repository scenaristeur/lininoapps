//https://github.com/levelgraph/levelgraph
var level = require("level");
//var level = require("level-browserify");
var levelgraph = require("levelgraph");


function spog(name, mode, demo) { // name,  demo or not, n3 or not,
  this.dbName = name || "smagBoose";
  this.db = levelgraph(level("data/"+this.dbName));
}

spog.prototype.foo = function () {
  // whatever
  console.log("fou");
}

spog.prototype.getName = function () {
  // whatever
  return this.dbName;
}
spog.prototype.populate = function () {
  var t1 = { subject: "David", predicate: "type", object: "SpogUser" };
  var t2 = { subject: "Smag0", predicate: "type", object: "Projet" };
  var t3 = { subject: "SmagYun", predicate: "type", object: "Projet" };
  var t4 = { subject: "David", predicate: "developpeurDe", object: "Smag0" };
  var t5 = { subject: "David", predicate: "developpeurDe", object: "SmagYun" };
  var t4 = { subject: "LesBricodeurs", predicate: "hasPart", object: "David" };
  var t5 = { subject: "SmagYun", predicate: "hasDeveloppeur", object: "David" };
  var t6 = { subject: "SpogUser", predicate: "subClassOf", object: "Personne" };
  var t7 = { subject: "LesBricodeurs", predicate: "type", object: "Association" };
  this.db.put([t1, t2, t3, t4, t5, t6, t7],  function(err) {
    // do something after the triples are inserted
    console.log("la base est populatée ;-)");
  });
}





module.exports = spog;
/*
//https://github.com/levelgraph/levelgraph
var level = require("level-browserify");
var levelgraph = require("levelgraph");
//var levelgraphN3 = levelgraphN3 = require('levelgraph-n3'); pour Import / Export Turtle

// just use this in the browser with the provided bundle
var db = levelgraph(level("data/testyourdb"));

//console.log(db);

//Inserting a triple in the database is extremely easy:

var triple = { subject: "David", predicate: "type", object: "Personne" };
db.put(triple, function(err) {
console.log("0, triplet ajouté");
// do something after the triple is inserted
});

var triple = { subject: "David", predicate: "developpeurDe", object: "Smag0", "graphe": "Projet" };
db.put(triple, function() {
db.get({ subject: "David" }, function(err, list) {
console.log("1");
console.log(list);
});
});

//Retrieving it through pattern-matching is extremely easy:

db.get({ subject: "David" }, function(err, list) {
console.log("2");
console.log(list);
});


db.get({ predicate: "type", object:"Personne" }, function(err, list) {
console.log("3");
console.log(list);
});

//It even supports a Stream interface:

var stream = db.getStream({ predicate: "b" });
stream.on("data", function(data) {
console.log("4");
console.log(data);
});


db.get({ subject: "a" }, function(err, list) {
console.log("5");
console.log(list);

});
*/

/* this.db = levelgraphN3(levelgraph(level("data/"+this.dbName)));

console.log(this.db);
var turtleIn = "@prefix c: <http://example.org/cartoons#>.\n" +
"c:Tom a c:Cat.\n" +
"c:Jerry a c:Mouse;\n" +
"        c:smarterThan c:Tom;\n" +
"        c:place \"fantasy\".";

this.db.n3.put(turtleIn, function(err) {
// do something after the triple is inserted

});

this.db.n3.get({ subject: "http://example.org/cartoons#Tom" }, function(err, turtle) {
// turtle is "<http://example.org/cartoons#Tom> a <http://example.org/cartoons#Cat> .\n";
console.log(turtle);
});
*/

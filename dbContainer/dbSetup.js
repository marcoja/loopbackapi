//Creates server wide administrative user;
use admin
var documentUser = {
  user: "dbAdmin",
  pwd:"lala1234",
  roles:[{role:"root", db:"admin"}]
};
db.createUser(documentUser);


//Create a new database for the application
//Create a new database wise adm inistrative user
use appdb;
db.createCollection("test")
//Create a database administrative user for the application
var documentUser = {
  user: "appAdmin",
  pwd: "lala1234",
  roles: [
    {role:"clusterAdmin",db:"admin"},
    {role:"dbAdmin", db:"appdb"},
    "readWrite"
  ]
};

var documentWriteConcern = {
  w: "majority",
  wtimeout:5000
};
db.createUser(documentUser, documentWriteConcern);

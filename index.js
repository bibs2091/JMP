//require needed modules
const express = require("express");
const expressEdge = require("express-edge");
const bodyParser = require("body-parser");
const session = require("express-session");

//connect to the database
const db = require("./config/database");
db.authenticate()
    .then(() => {
        console.log("Database connected");
    })
    .catch(error => {
        console.log(error.message)
    });
//synchronize database 
db.sync({ forced: true }).then(() => {
    console.log("database synchronized ");
});

//import controllers
const homeController = require("./controllers/home");

//create the express app
const app = express();

//sessions

//body parser configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//set up public files directory
app.use(express.static("public"));
//set up views directory
app.use(expressEdge);
app.set("views", __dirname + "/views");

//handling get requests
app.get("/", homeController);

//handling post requests

//listen to requests
const port = 3000 || process.env.PORT;
app.listen(port, () => {
    console.log("server listening to port " + port);
});
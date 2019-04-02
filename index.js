//require needed modules
const express = require("express");
const expressEdge = require("express-edge");
const bodyParser = require("body-parser");
const session = require("express-session");
const expressValidator = require("express-validator");
const flash = require("connect-flash");

//require routes
const auth = require("./routes/auth");
const profile = require("./routes/profile");
const home = require("./routes/home");

//environment variables
const {
	SESS_LifeTime = 10800000, // 3 hours
	NODE_ENV = "developement",
	SESS_NAME = "sid",
	SESS_SECRET = "blabla random string", // this must be refactored to a config file with all the keys
} = process.env;

const IN_PROD = NODE_ENV === "production"; // true if we are in production

//connect to the database
const db = require("./config/database");
db.authenticate()
	.then(() => {
		console.log("Database connected");
	})
	.catch(error => {
		console.log(error.message);
	});
//synchronize database
db.sync({ forced: true }).then(() => {
	console.log("database synchronized ");
});

//create the express app
const app = express();

//sessions
app.use(
	session({
		name: SESS_NAME,
		resave: false, // this will prevent from saving to the sess_store eventho the sess isn't modified
		secret: SESS_SECRET,
		saveUninitialized: false, // dont store the new sessions with no data
		cookie: {
			maxAge: SESS_LifeTime,
			sameSite: true, // protect against csrf
			secure: IN_PROD,
		},
	})
);

app.use(flash());
//use express validator
app.use(expressValidator());

//body parser configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//set up public files directory
app.use(express.static("public"));
//set up views directory
app.use(expressEdge);
app.set("views", __dirname + "/views");

//use routes
app.use("/auth", auth);
app.use("/profile", profile);
app.use("/", home);

//listen to requests
const port = 3000 || process.env.PORT;
app.listen(port, () => {
	console.log("server listening to port " + port);
});

//require needed modules
const express = require("express");
const expressEdge = require("express-edge");
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
const uuid = require("uuid");
const flash = require("flash");

const redisClient = require("redis").createClient();
const RedisStore = require("connect-redis")(session);

//redis options object ,,, TODO: refactore to config/
const options = {
	host: "localhost",
	client: redisClient,
	// port: 6379,
};

//require routes
const auth = require("./routes/auth");
const profile = require("./routes/profile");
const home = require("./routes/home");

//environment variables
const {
	SESS_LifeTime = 10800000, // 3 hours
	NODE_ENV = "developement",
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

//set up public files directory
app.use(express.static("public"));
//set up views directory
app.use(expressEdge);
app.set("views", __dirname + "/views");
//body parser configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//sessions
app.use(
	session({
		store: new RedisStore(options),

		resave: false, // this will prevent from saving to the sess_store eventho the sess isn't modified
		secret: SESS_SECRET,
		saveUninitialized: false, // dont store the new sessions with no data
		cookie: {
			maxAge: SESS_LifeTime,
			sameSite: true, // protect against csrf
			// secure: IN_PROD,
		},
	})
);
//flash
app.use(flash());

//passport init
app.use(passport.initialize());
app.use(passport.session());

//use routes
app.use("/auth", auth);
app.use("/profile", profile);
app.use("/", home);

//listen to requests
const port = 3000 || process.env.PORT;
app.listen(port, () => {
	console.log("server listening to port " + port);
});

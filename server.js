require("dotenv").config();
const express = require("express");
const app = express();
const session = require("express-session");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const passport = require("passport");
const flash = require("connect-flash");

// Passport config
require("./config/passport")(passport);

// Middlewares
app.use(express.static(__dirname + "/public/"));
app.use(morgan("dev")); // log every request
app.use(cookieParser());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.set("view engine", "ejs");

// Session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Routes
app.use("/", require("./routes/auth")(passport));
const protectedRoutes = require("./routes/protected");
app.use("/", protectedRoutes);

// ✅ Add Home Routes here
const homeRoutes = require("./routes/Home");
app.use("/home", homeRoutes); // now /home works

// Server listen
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});

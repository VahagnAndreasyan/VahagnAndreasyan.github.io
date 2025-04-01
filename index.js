import express from "express";
import session from "express-session";
import path from "path";
import bcrypt from "bcrypt";
import passport from "passport";
import passportLocal from "passport-local";
import dotenv from "dotenv";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Load environment variables from .env file
dotenv.config();

// Get the current directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let users = []; // In-memory users array for testing

const app = express();

// Session setup with security improvements
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false, 
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === "production", 
    httpOnly: true, 
    maxAge: 1000 * 60 * 60 // 1 hour session expiry
  }
}));

// Middleware for parsing JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Passport initialization
app.use(passport.initialize());
app.use(passport.session());

// Passport strategy setup
passport.use(new passportLocal.Strategy({
  usernameField: "email"
}, async (email, password, done) => {
  const user = users.find((user) => user.email === email);

  if (!user) {
    console.log("Incorrect email: ", email);
    return done(null, false, { message: "Incorrect email" });
  }

  const isValidPassword = await bcrypt.compare(password, user.password);

  if (isValidPassword) {
    console.log("User authenticated: ", email);
    return done(null, user);
  } else {
    console.log("Incorrect password for email: ", email);
    return done(null, false, { message: "Incorrect password" });
  }
}));

// Serialize and Deserialize user
passport.serializeUser((user, done) => {
  console.log("Serializing user: ", user);
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  const user = users.find((user) => user.id === id);
  console.log("Deserializing user: ", user);
  done(null, user);
});

// Routes

// Home route (Landing page with buttons)
app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "public/app.html"));
});

// Register route
app.get("/register", checkNotAuthentication, (req, res) => {
  res.sendFile(path.resolve(__dirname, "public/register.html"));
});

// Handle Register POST
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  // Check if the user already exists
  if (users.some(user => user.email === email)) {
    console.log("User already exists: ", email);
    return res.status(400).send("User already exists");
  }

  // Hash the password and save the user to the "database"
  const hashedPwd = await bcrypt.hash(password, 10);
  const newUser = {
    id: `${Date.now()}_${Math.random()}`,
    name,
    email,
    password: hashedPwd
  };
  users.push(newUser);

  console.log("New user registered: ", newUser); // Debugging line
  res.redirect("/login");
});

// Login route
app.get("/login", checkNotAuthentication, (req, res) => {
  res.sendFile(path.resolve(__dirname, "public/login.html"));
});

// Handle Login POST
app.post("/login", passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login"
}));

// Logout route
app.get("/logout", (req, res, next) => {
  req.logout(function(err) {
    if (err) {
      return next(err);
    }
    req.session.destroy(() => {
      res.redirect("/login");
    });
  });
});

// Authentication middleware to protect certain routes
function checkAuthentication(req, res, next) {
  if (!req.isAuthenticated()) {
    return res.redirect("/login");
  }
  next();
}

// Middleware to prevent authenticated users from accessing login/register pages
function checkNotAuthentication(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/"); // Redirect to home if already logged in
  }
  next();
}

// Serve static files (like HTML pages, images, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Start the server
app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running...");
});

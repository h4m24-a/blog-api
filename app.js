const express = require('express');  //  import express
require('dotenv').config();
const PORT = process.env.PORT;
const errorHandler = require('./middleware/error');
const notFound = require('./middleware/notFound');
const cors = require('cors')
const cookieParser = require('cookie-parser');
const passport = require('passport');
let path = require('path');
const jwtAuthentication = require('./middleware/jwtAuthentication');
const checkAdmin = require('./middleware/checkAdmin');
const app = express();


// Serve static files
app.use(express.static('public'))   // 'public' is my static folder.

// Body parser middleware
app.use(express.json());  // submit raw json
app.use(express.urlencoded({ extended: true }));  // takes in an object - replicates web form and sends form data.
app.use(cors( {
  origin: 'http://localhost:3000'
}));  // enables Cross-Origin Resource Sharing for all incoming requests.


// Middlewares for cookies
app.use(cookieParser());


// Routers
let postsRouter = require('./routes/api/postsRouter');
let commentsRouter = require('./routes/api/commentsRouter');
let authRouter = require('./auth/authRoutes')
let adminProtectedRouter = require('./auth/authProtectedRoutes')


// specifying views folder where the templates are stored '/views/ and templating engine to ejs.
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// Initialize Passport
app.use(passport.initialize());


// Get name of user after authentication
app.use((req, res, next) => {
  res.locals.currentUser = req.user;    // currentUser now available in every ejs file
  next();
})


// Adding route-handling code to the request handling chain. This will define particular routes for the different parts of the site

// Public (unauthenticated) routes
app.use('/api/auth', authRouter);


// Protected user routes (requires valid JWT)
app.use('/api/posts', jwtAuthentication, postsRouter);
app.use('/api/posts/:postId/comments', jwtAuthentication, commentsRouter);      // Mounts comment routes on this base path, all routes in commentsRouter are relative to this path


// Admin only routes (requires valid JWT & admin role)
app.use('/api/admin', jwtAuthentication, checkAdmin, adminProtectedRouter);



// Catch all errors - on routes/endpoints that don't exist.
app.use(notFound);


// Error handler - order in which functions declare matter - errorhandler is below  the routes
app.use(errorHandler);


app.listen(3000, () => {
  console.log('Server listening on PORT 3000')
})
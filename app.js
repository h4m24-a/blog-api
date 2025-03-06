const express = require('express');  //  import express
require('dotenv').config();
const PORT = process.env.PORT;
const errorHandler = require('./middleware/error');
const notFound = require('./middleware/notFound');
let path = require('path');
const app = express();


// Serve static files
app.use(express.static('public'))   // 'public' is my static folder.

// Body parser middleware
app.use(express.json());  // submit raw json
app.use(express.urlencoded({ extended: true }));  // takes in an object - replicates web form and sends form data.



// Routers
let indexRouter = require('./routes/index');
let postsRouter = require('./routes/postsRouter');
let commentsRouter = require('./routes/commentsRouter');


// specifying views folder where the templates are stored '/views/ and templating engine to ejs.
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



// Adding route-handling code to the request handling chain. This will define particular routes for the different parts of the site
app.use('/', indexRouter);
app.use('/posts', postsRouter);
app.use('/comments', commentsRouter);




// Catch all errors - on routes/endpoints that don't exist.
app.use(notFound);


// Error handler - order in which functions declare matter - errorhandler is below  the routes
app.use(errorHandler);


app.listen(3000, () => {
  console.log('Server listening on PORT 3000')
})
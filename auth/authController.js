const db = require("../prisma/queries");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const JWT_REFRESH_SECRET_KEY = process.env.JWT_REFRESH_SECRET_KEY;

// Render Sign Up form (GET)
// async function getSignUp(req, res) {
//   try {
//     res.render("signup_form", { errorUser: null }); // errorUser intially set to null, helps display the error message
//   } catch (error) {
//     console.error("Error displaying sign up form", error);
//     res.status(500).send("Server Error");
//   }
// }



// Render Login page (GET)
// async function getLogin(req, res) {
//   try {
//     res.render("login_form");
//   } catch (error) {
//     console.error("Error displaying login form", error);
//     res.status(500).send("Server Error");
//   }
// }





// Sign-up user - Add User to Database - (POST)
async function signUpPost(req, res, next) {

  const username = req.body.username; // Get username from form
  const password = req.body.password; // Get password from form

  const existingUsername = await db.findUserByUsername(username);
  if (existingUsername) {
    return res.status(409).json({ error: 'Username already exists'});
  }

  try {
    // Hash password and insert user
    bcrypt.hash(password, 10, async (error, hashedPassword) => {
      if (error) {
        return next(error);
      }

      await db.insertUser(username, hashedPassword); // call db the function that inserts the username & hashed password obtained from form in the db
    });

   

    return res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Signup error', error)
    return res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
}



// Log in user - (POST)
async function logInUserPost(req, res) {

  const { username, password } = req.body;    // Get username and password from form
  try {
    const user = await db.findUserByUsername(username)

    
    if (!user) return res.status(401).json({ message: 'Incorrect username' });    // If username don't match
  
  
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: 'Incorrect password' })    // If passwords don't match!
  

    const payload = {
      id: user.id,
      role: user.role
    }

    const accessToken = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: '30m' });      // If login is succesfull, generate a JWT using payload and secret key.

    const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET_KEY, { expiresIn: '7d' });


    // Storing refresh token in db
    await db.storeRefreshToken(user.id, refreshToken)

    // Set refresh token as HTTP-Only cookie
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: false,                       // Only send over HTTPS. Set to true in production
      maxAge: 7 * 24 * 60 * 60 * 1000     // 7 days in ms
    })

    res.json({ message: 'Login succesfull', accessToken })    // Send JWT to client

  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error })

  }
}



// Log out user - (GET)
async function getSignOut(req, res) {
  try {
    
  } catch (error) {
    
  }
  
}

module.exports = {
  // getSignUp,
  // getLogin,
  signUpPost,
  logInUserPost
};

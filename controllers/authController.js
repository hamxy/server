const User = require("../models/User");
const authErrors = require("../errors/authErrors");
const jwt = require("jsonwebtoken");


 // Create JWT
const maxAge = 60 * 60 * 24 * 1 // 1 day in seconds
const createToken = (id) => {
    return jwt.sign(
        { id }, 
        process.env.JWT_SECRET, 
        {expiresIn: maxAge}
    );
}

/**
 * Signup POST route handles user registering
 * Take email & password from the request body
 * Try to create a new user and save it into a database
 * Try to create JWT and put it into a cookie (login user after registering)
 * 
 * Catch error and send error messages in json
 * 
 * 
 * @param {Object} req 
 * @param {Object} res 
 */
module.exports.signup_post = async (req, res) => {
    const { email, password, name, surname, favourites } = req.body;
    try {
        const user = await User.create({ email, password, name, surname, favourites });
        const token = createToken(user._id)
        res.cookie("jwt", token, {httpOnly: true, maxAge: maxAge * 1000 });
        res.status(201).json({ user: user._id });
    } 
    catch (err) {
        const errors = authErrors(err);
        res.status(400).json({ errors });
    }
}

/**
 * login POST handles user loging in
 * Take email & password from the request body
 * Try to find user in the database (static User.login)
 * Try to create JWT and put it into a cookie
 * 
 * @param {Object} req 
 * @param {Object} res 
 */
module.exports.login_post = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.login(email, password);
        const token = createToken(user._id)
        res.cookie("jwt", token, {httpOnly: true, maxAge: maxAge * 1000 }); // time in ms
        res.status(200).json({ user: user._id });
    }
    catch (err){
        console.log(err);
        res.status(400).send(err.message);
    }
}

/**
 * logout GET handles user login out
 * Clear jwt cookie
 * Send a message
 * 
 * @param {Object} req 
 * @param {Object} res 
 */
module.exports.logout_get = (req, res) => {
    res.clearCookie('jwt').status(200).send('Logged out');
}

// iceland: fuel wednesday: 26L (£1.9/L), 8400 isk
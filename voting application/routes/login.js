const express = require('express');
const router = express.Router();
const { handleUserSignup, handleUserLogin } = require('../controllers/user')
const { homePageEnterAnyUser, signupLogic, loginLogic } = require('../controllers/login')


// homePage
router.get('/', homePageEnterAnyUser)


// create a new user
router.get("/signup", signupLogic)
router.post('/signup', handleUserSignup);

// view candidates
router.get("/candidates", homePageEnterAnyUser);

// login user
router.get("/login", loginLogic)
router.post('/login', handleUserLogin);




module.exports= router;
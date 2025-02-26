const express = require('express');
const router = express.Router();
const { showHomePage, UserProfile, allUsersProfile, UpdateUserProfile } = require('../controllers/user')
const { viewAllCandidate } = require('../controllers/admin')



router.get('/', showHomePage);


// allUsersProfile
router.get('/profile', allUsersProfile);


// userProfile ---------> use authentication
router.get('/profile/:id', UserProfile);


// update profile
router.put('/profile/update/:id', UpdateUserProfile);


// view all candidate
router.get('/viewAllCandidates', viewAllCandidate);

// vote
router.post('/vote')

module.exports= router;
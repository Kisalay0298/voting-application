const express = require('express');
const router = express.Router();
const { restrictToLoginUserOnly } = require('../middleware/auth')
const { seeAllVoters, renderToVote, submitVotes, voteAnalysis } = require('../controllers/voters')




router.get('/', seeAllVoters)
router.get('/vote', restrictToLoginUserOnly, renderToVote)
router.post("/vote", restrictToLoginUserOnly, submitVotes)
router.get("/vote/analysis", restrictToLoginUserOnly, voteAnalysis)

// router.get("/signup", renderSignupToVote)






module.exports = router;
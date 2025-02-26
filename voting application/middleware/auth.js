const { getVoter } = require('../services/auth');

async function restrictToLoginUserOnly(req, res, next){
    const voterId = req.cookies?.uid;

    if(!voterId){
        return res.redirect('/login');
    }
    const voter = getVoter(voterId)

    if(!voter){
        return res.redirect('/login')
    }
    req.voter = voter;

    next();
}


async function restrictToAdminOnly(req, res, next){
    const voterId = req.cookies?.uid;

    if (!voterId) {
        return res.redirect('/login');
    }

    const voter = getVoter(voterId);

    if (!voter || !voter.role) {
        // Clear the invalid cookie
        res.clearCookie('uid');
        return res.redirect('/login');
    }

    if (voter.role !== "admin") {
        return res.status(403).json({ message: "Access denied. Admins only." });
    }

    req.voter = voter;  // Attach voter data to the request
    next();
}


module.exports = {
    restrictToLoginUserOnly,
    restrictToAdminOnly
}
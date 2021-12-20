const checkUserAuth = (req, res) => {
    res.status(200).json({login:true, userData:req.user});
}

module.exports = checkUserAuth;
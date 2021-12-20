const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");

const checkLogin = async (req, res, next) => {
  try {
    //jws token verifecation check
    const token = req.signedCookies;
    //google token verifecation check
    const { tokenId } = req.body;
    if (tokenId) {
      //google token verifecation check
      const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
      const googleVerifyToken = await client.verifyIdToken({
        idToken: tokenId,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      const { name, email, picture } = googleVerifyToken.getPayload();
      if (Object.keys(googleVerifyToken.getPayload()).length > 0) {
        req.user = { name, email, avatar: picture };
        next();
      } else {
        res.status(500).json({ error: { msg: "Please login!1" } });
      }
    } else if (token) {
      //jws token verifecation check
      const checkToken = await jwt.verify(token.blog, process.env.JWT_SECRETE);
      if (Object.keys(checkToken).length > 0) {
        req.user = checkToken;
        next();
      } else {
        res.status(401).json({ error: { msg: "Please login!2" } });
      }
    } else {
      res.status(401).json({ error: { msg: "Please login!3" } });
    }
  } catch (err) {
    res.status(401).json({ error: { msg: "Please login!4" } });
  }
};

module.exports = checkLogin;

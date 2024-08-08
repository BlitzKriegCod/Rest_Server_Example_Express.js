const JWT = require('jsonwebtoken');
const User = require('../models/user.model');

module.exports.ValidateJWT = async (req, res, next) => {
    let tk = req.header('Authorization');
   

    if (!tk) {
        return res.status(401).json({
            msg: "Token Unexpected"
        });
    }

    try {
        const { uid } = JWT.verify(tk, process.env.SECRETKEY);
        req.uid = uid;
        
        const user = await User.findById(uid);
        if (!user) {
            return res.status(401).json({
                msg: "User not exist"
            });
        }

        req.user = user;
        
        next();
    } catch (error) {
        return res.status(401).json({
            msg: 'Token invalid'
        });
    }
};
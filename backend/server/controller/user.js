const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//interlan import 
const User = require('../models/user');

const getUser = (req, res) => {
    res.send('get user successfull');
}

const createUser = async (req, res) => {
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    let newUser;
    if (req.files && req.files.length > 0) {
        newUser = await new User({
            name: req.body.name,
            email:req.body.email,
            userAvatar: req.files[0].filename,
            password: hashPassword
        })
    } else{
        newUser = await new User({
            name: req.body.name,
            email:req.body.email,
            userAvatar: null,
            password: hashPassword
        })
    }  
    try{
        const result = await newUser.save();
        res.status(200).json({msg: "Signup successfull.", avatar: {filename: req.files[0].filename}});
    } catch(err){
        res.status(500).json({error:{msg:"Please try again"}})
    }
}

const loginUser = async (req, res) => {
    try{
        const findUser = await User.findOne({email: req.body.email});
        if (findUser && findUser._id) {
            const validationPasswordCheck = await bcrypt.compare(req.body.password, findUser.password);

            if (validationPasswordCheck) {
                const userInfo = {
                    id: findUser._id,
                    name: findUser.name,
                    avatar: findUser.userAvatar ? findUser.userAvatar : null
                }
                
                const token = jwt.sign(userInfo, process.env.JWT_SECRETE, {expiresIn: process.env.JWT_EXPIRE })

                // res.cookie(process.env.COOKIE_NAME, token, {
                //     maxAge: process.env.JWT_EXPIRE,
                //     httpOnly: true,
                //     signed:true 
                // })

                res.cookie(process.env.COOKIE_NAME, token, {
                    maxAge: process.env.JWT_EXPIRE,
                    httpOnly: true,
                    signed: true
                })

                res.status(200).json(userInfo);
            } else {
                res.status(401).json({error:{msg:"Authintication Faild!"}})
            }
        } else {
            res.status(401).json({error:{msg:"Authintication Faild!"}})
        }
    }catch(err) {
        res.status(500).json({error:{msg:err.message}})
    }
}

const logoutUser = (req, res) => {
    console.log('click here');
    res.clearCookie(process.env.COOKIE_NAME);
    res.status(200).json({msg: 'logout successfull!'})
}

module.exports = {getUser, createUser, loginUser, logoutUser};
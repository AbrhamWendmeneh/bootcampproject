const express=require('express')
const signUpModel=require('../models/signUpModel')
const bcryptval=require('bcrypt')
const jwtauth=require('jsonwebtoken')
const {signUp,Login}= require('../controllers/authControllers')
const router = express.Router();
const User = require('../models/signUpModel');



router.post('/signUp',signUp)
router.post('/login',Login)




module.exports = router;

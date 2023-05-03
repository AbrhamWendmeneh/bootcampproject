

const signUpModel = require("../models/signUpModel");
const bcryptval =require('bcrypt');
const jwtauth = require('jsonwebtoken')



// const signUpModel=(req,res)=>{
//     res.json('this is working')
// }

// const registerUser=(req,res)=>{
//     try {
//         const {name,email,password}=req.body
//     } catch (error) {
        
//     }
// }


// module.exports={
//  signUpModel,   
 
// }
// 
const signUp = async(req,res)=>{
    const {name,email,password}= req.body

    try {
        const user = await signUpModel.findOne({email});
        if(user){
            res.status(400).json({
                success: false,
                message:'The email address is already in use'
            });
        } else{
            const salt = await bcryptval.genSalt(); // in this case I want to use the default val
            const hashedPassword = await bcryptval.hash(password,salt);
            const newUser = await signUpModel.create({
                name,
                email,
                password: hashedPassword,
            });
            res.status(200).json({
                success: true,
                data: newUser
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong. Please try again later.'
        });
    }
}

const Login= async(req,res)=>{
    const {email,password}=req.body
    try {
        const user= await signUpModel.findOne({email})
        if (user){
            if(await bcryptval.compare(password,user.password)){
                res.status(200).json(
                    {email,password,'id':user._id}
                );
            
            }
            else{
                res.status(402).json({
                    message:'invalid credential'
                })
            }
        }
        else{
            res.status(401).json({
                message:'user does not exist '
            })
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports= { signUp,Login }

import nodemailer from "nodemailer";
import crypto from "crypto";
import jsonwebtoken from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import adminsModel from "../models/adminsModel.js";
import { config } from "../config.js";
const registerAdminController = {}

registerAdminController.register= async (req, res) => {
    try {
        const {name, lastName, email, password, isVerfified, loginAttempts, timeOut}  = req.body;
        const existAdmin = await adminsModel.findOne({email})
        if(existAdmin){
            return res.status(400).json({message: "Admin already exits"})
        }
        const passwordHash = await bcryptjs.hash(password, 10);
        const newAdmin = adminsModel({
            name, 
            lastName, 
            email, 
            password : passwordHash , 
            isVerfified : isVerfified || false, 
            loginAttempts, 
            timeOut
        })
await newAdmin.save();
const verificationCode = crypto.randomBytes(3).toString("hex")
const tokenCode = jsonwebtoken.sign(
    {email, verificationCode}, config.JWT.secret, {expiresIn: "15m"});
    res.cookie("verificationTokenCookie", tokenCode, {maxAge : 15*60*1000})

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth : { user: config.email.user_email,
            pass :  config.email.user_password
        }
    })
    const mailOptions = {
        from : config.email.user_email,
        to : email,
        subject : "Verification account ", text: "" + verificationCode + ""
     }
     transporter.sendMail(mailOptions,(error,info) => {
        if(error){ console.log ("error" + error)
            return res.status(500).json({message: "error"})
        }
        res.status(200).json({message:"email send"})
     });
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal server error"})        
    }
};

registerAdminController.verifyCode = async (req, res) => {
    try {
        const { verificationCodeRequest } = req.body;
        const token = req.cookies.verificationCookie;
        const decoded = jsonwebtoken.verify(token, config.JWT.secret)
        const {email, verificationCode: storedCode} = decoded;

        if (verificationCodeRequest !== storedCode){
            return res.status(400).json({message: "Invalid Code"})
        }

        const admin = await adminsModel.findOne({email});
        isVerfified = true;
        await admin.save();
        res.clearCookie("verificationTokenCookie")
        res.json({message : "Email verified successfully"})

    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal server error" + error })        
    }
};

export default registerAdminController;

















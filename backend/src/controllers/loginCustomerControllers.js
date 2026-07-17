import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import customersModel from "../models/customersModel.js";
import { config } from "../config.js";

const loginCustomer = {};
loginCustomer.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userFound = await customersModel.findOne({email});
        if (!userFound){
            return res.status(404).json({message: "Customer not found"})
        }
        if(userFound.timeOut && userFound.timeOut > Date.now()){
            return res.status(403).json({message: "Bloqued Account"})
        }
        const isMatch = await bcrypt.compare(password
            , userFound.password);
            if(!isMatch){
                userFound.loginAttempts = (userFound.loginAttempts || 0) + 1;
            
                if(userFound.loginAttempts >= 5){
                    userFound.timeOut=Date.now()+15*60*1000;
                    userFound.loginAttempts=0;
                    await userFound.save();
                    return res.status(403).json ({message: "BloquedAccount"})
                }
                await userFound.save();
                return res.status(403).json({message: "Contraseña Incorrecta"})
            }
            userFound.loginAttempts = 0
            userFound.timeOut = null
            await userFound.save();

            //Token
            const Token = jsonwebtoken.sign(
                {id: userFound._id, userType : "customer"},
                config.JWT.secret,
                {expiresIn : "30d"}
            );
            res.cookie("authCookie", "token");
            return res.status(200).json({message: "Login correctly"})

    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal server error"})        
    }
};
export default loginCustomer;








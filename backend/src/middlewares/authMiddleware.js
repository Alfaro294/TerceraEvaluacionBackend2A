import jsonwebtoken from "jsonwebtoken";
import { config } from "dotenv";
import { decode } from "node:punycode";

export const validateAuthCookie = (allowedTypes = []) => {
    return (req, res, next) => {
        try {
            const {authCookie} = req.cookies;
            if(!authCookie){
                return res.status(401).json({message : "Access denied"})
            } next()
        } catch (error) {
             console.log("error" + error)
        return res.status(500).json({message: "Internal server error"}) 
        }
    }
}


















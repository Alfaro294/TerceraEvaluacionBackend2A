/* Campos: name, lastName, email, password, isVerfified, loginAttempts, timeOut */

import mongoose, {Schema, model} from "mongoose";

const customerSchema = new Schema({
    name : { type : String},
    lastName : {type : String},
    email : {type: String},
    password : { type : String},
    isVerified : { type : Boolean},
    loginAttempts : { type : Number },
    timeOut : { type : Date},

},
    {timestamps : true,
        strict : false
    })

    export default model ("Customers", customerSchema)








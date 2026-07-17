/* Campos : customerId, quantity, purchaseDate, total, paymentStatus,
transactionId */

import mongoose, {Schema, model} from "mongoose";

const ticketsSchema = new Schema({
    customerId : { type : String},
    quantity : {type : Number},
    purchaseDate : {type: Date},
    total : { type : String},
    paymentStatus : { type : Boolean},
    transactionId : { type:String  },

},
    {timestamps : true,
        strict : false
    })

    export default model ("Tickets", ticketsSchema)














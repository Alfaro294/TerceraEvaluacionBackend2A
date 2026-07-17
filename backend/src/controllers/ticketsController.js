import ticketsModel from "../models/ticketsModel.js";

const ticketsController = {};

// SELECT 
ticketsController.getTickets = async (req, res) => {
    try {
        const tickets = await ticketsModel.find();
        return res.status(200).json(tickets)
    } catch (error) {        
        console.log("error" + error)
        return res.status(500).json({message: "Internal server error"}) 
    }
};

// CREATE
ticketsController.insertTickets = async (req, res) => {
    try {
        const {customerId, quantity, purchaseDate, total, paymentStatus,
transactionId} = req.body
const newTickets = new ticketsModel({customerId, quantity, purchaseDate, total, paymentStatus,
transactionId})
await newTickets.save()
res.json({message : "Tickets saved"})
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal server error" + error }) 
    }
}

// DELETE
ticketsController.deleteTickers = async (req, res) => {
    try {
        const deletedTickets = await ticketsModel.findByIdAndDelete(req.params.id)
        if(!deletedTickets){
            return res.status(404).json({message : "Tickets not found"})
        }
        return res.status(200).json({message: "Tickets deleted"})
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal server error"}) 
    }
}

// UPDATE
ticketsController.updateTickets = async (req, res) => {
    try {
        const {customerId, quantity, purchaseDate, total, paymentStatus,
transactionId} = req.body;
const updatedTickets = await ticketsModel.findByIdAndUpdate(req.params.id,{customerId, quantity, purchaseDate, total, paymentStatus,
transactionId}, {new: true});
if(!updatedTickets){
    return res.status(404).sjon({message: "Tickets not found"})
}
    return res.status(200).json({message: "Tickets Updated"})

    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal server error"}) 
    }
}
export default ticketsController;

























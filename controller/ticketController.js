import Ticket from "../models/Ticket.js";

class ticketsCtrl{
    getAllTickets = async(req,res,next)=>{
        let tickets;
        try{
            tickets = await Ticket.find();
        }catch(err){
            console.log(err)
        }
        if(!tickets){
            return res.status(200).json({message: "No tickets found"})
        }
        return res.status(200).json({message: tickets})
    }
    getTicketByUser = async(req,res,next)=>{
        let tickets;
        try{
            const id = req.params.id;
            tickets = await Ticket.find({userId: id});
        }catch(err){
            console.log(err)
        }
        if(!tickets){
            return res.status(200).json({message: "No tickets found"})
        }
        return res.status(200).json({message: tickets})
    }
}

export default new ticketsCtrl;


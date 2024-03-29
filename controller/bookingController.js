import { createSignature, showError } from "../lib/index.js";
import Booking from "../models/Booking.js";
import Seat from "../models/Seat.js";
import Ticket from "../models/Ticket.js";
import Showtime from "../models/Showtime.js";
// import User from "../models/User.js";
import mongoose from "mongoose";

class BookingCtrl {
  getAllBookings = async (req, res, next) => {
    let bookings;
    try {
      bookings = await Booking.find();
    } catch (err) {
      console.log(err);
    }
    if (!bookings) {
      return res.json({ message: "Bookings not found" });
    }
    return res.json({ message: bookings });
  };

  createOrder = async (req, res, next) => {
    try {
      // console.log(req.body);
      const { data } = req.body;
      const amount = data.amount;
      const movieId = data.movieId;
      const uuid = performance.now();
      // return res.json({amount,movieId,uuid})
      const id = `${uuid}`.replace(".", "-");
      // return res.json({id})

      const signature = createSignature(
        `total_amount=${amount},transaction_uuid=${id},product_code=EPAYTEST`
        // total_amount=100,transaction_uuid=11-201-13,product_code=EPAYTEST
      );
      // return res.json({message: signature})

      // return res.json({amount,movieId,uuid,signature})

      const formData = {
        amount: amount,
        failure_url: "http://localhost:3000/failure",
        product_delivery_charge: "0",
        product_service_charge: "0",
        product_code: "EPAYTEST",
        signature: signature,
        signed_field_names: "total_amount,transaction_uuid,product_code",
        success_url: `http://localhost:3000/${movieId}/success`,
        tax_amount: "0",
        total_amount: amount,
        transaction_uuid: id,
        // selectedSeats:
      };

      return res.json({
        message: "Order Created",
        formData,
        uuid,
      });
    } catch (err) {
      return res.status(400).json({
        message: err.message,
      });
    }
  };

  createBooking = async (req, res, next) => {
    const {
      seatNumber,
      showtimeId,
      movieId,
      showtime,
      showDate,
      userId,
      uuid,
    } = req.body;
    // movieId = movieId.id;
    const user = userId;
    const movieid = movieId.id;

    let isSeats, showtimeDetails;
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      let i = true;
      //   const alreadyExists = await Booking.findOne({uuid:uuid});

      //   console.log("is already exists xata: ",alreadyExists,uuid);

      //   if (!alreadyExists) {

      console.log("1st chalyo kati choti");

      if (i) {
        console.log("2nd chalyo kati choti");
        if (!seatNumber || seatNumber.length === 0) {
          return res.status(400).json({
            message: "No seats provided for booking",
          });
        }
        // const show = await Showtime.findOne({movieId})
        isSeats = await Seat.findOne({ showtimeId: showtimeId });

        // showtimeDetails = await Showtime.findById(showtimeId);

        // return res.json({findingSeatsare: isSeats,movieId,showtimeId})
        if (!isSeats) {
          return res
            .status(404)
            .json({ message: "Seats not found for the provided showtimeId" });
        }

        for (let j = 0; j < seatNumber.length; j++) {
          const seatExists = isSeats.seatNumber.includes(seatNumber[j]);
          if (seatExists) {
            const index = isSeats.seatNumber.indexOf(seatNumber[j]);
            isSeats.seatNumber.splice(index, 1);
          } else {
            return res.json({ message: "You refreshed the page" });
          }
        }
        // return res.json({message:"Everything upto here is working perfectly",movie: movieId});
        // return res.json({message: "inside controller the seatnumbers are: ", seatNumbers:seatNumber, showtime: showtimeId, movieIdchaiyohohai:movieId})
        //creating a booking
        const createBooking = await Booking.create({
          userId: user,
          movieId: movieid,
          showtimeId,
          bookedSeat: seatNumber,
          uuid: uuid,
        });
        // return res.json({message:createBooking,message:"Booking samma chalirako xa hai"})
        console.log("3rd chalyo kati choti");

        // when booking is created successfully then making updates
        if (createBooking) {
          // await Seat.updateMany(
          //     { showtimeId, seatNumber: { $in: seatNumber } },
          //     { $set: { status: "Booked" } }
          // );
          try {
            await Seat.findOneAndUpdate(
              { _id: isSeats._id },
              { $pull: { seatNumber: { $in: seatNumber } } }
            );
            // return res.json({ message: "Seats booked successfully" });
          } catch (error) {
            return res
              .status(500)
              .json({ message: "Error updating seats", error: error.message });
          }

          // showDate:{
          //     type:String,
          //     required:true,
          // },
          // selectedSeats:{
          //     type:[Number],
          //     required:true,
          // },
          // movieId:{
          //     type: mongoose.Types.ObjectId,
          //     ref:'Movie',
          //     required:true
          // },
          // showtime:{
          //     type:String,
          //     required:true,
          // }

          // const exactShowtime = sessionStorage.getItem("showTime")

        console.log("4rd chalyo kati choti");


          let tickets;
          tickets = await Ticket.create({
            userId: user,
            bookingId: createBooking._id,
            selectedSeats: seatNumber,
            movieId: movieid,
            showtimeId: showtimeId,
            showtime: showtime,
            showDate: showDate,
          });
          // console.log("The generated tickets is: ",tickets);
        console.log("5th chalyo kati choti");

          await session.commitTransaction();
          return res.status(201).json({
            message: "Booking created successfully",
            tickets,
            uuid,
          });
        }
      }
      console.log("6th chalyo kati choti");

      i = false;
    } catch (err) {
      await session.abortTransaction();
      return res.status(400).json({
        message: err.message,
      });
    } finally {
      session.endSession();
    }
  };

  showBookings = async (req, res, next) => {
    try {
      const bookings = await Booking.aggregate([
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "user",
          },
        },
        {
          $lookup: {
            from: "movies",
            localField: "movieId",
            foreignField: "_id",
            as: "movie",
          },
        },
        {
          $lookup: {
            from: "showtimes",
            localField: "showtimeId",
            foreignField: "_id",
            as: "showtime",
          },
        },
      ]).exec();
      return res.json({ message: "Bookings are:", bookings });
      res.send(bookings);
    } catch (err) {
      showError(err, next);
    }
  };

  showBookingsById = async (req, res, next) => {
    try {
      const bookings = await Booking.find({ userId: req.params.id });
      return res.json({ message: "Bookings are:", bookings });
    } catch (err) {
      showError(err, next);
    }
  };

  deleteBooking = async (req, res, next) => {
    const id = req.params.id;
    let booking;
    try {
      booking = await Booking.findByIdAndDelete(id);
    } catch (err) {
      return next(new Error("Problem while deleting"));
    }
    if (!booking) {
      return res.status(404).json({ message: "No booking found" });
    }
    return res.status(500).json({ message: "Deleted Successfully" });
  };
  deleteUserBooking = async (req, res, next) => {
    // const id = req.params.id;
    // console.log("user id: ",userId);
    const userId = req.params.id;
    // console.log("UserId ",userId)
    // return;
    let booking;
    try {
      booking = await Booking.deleteMany({ userId: userId });
    } catch (err) {
      // return next(new Error('Problem while deleting'))
      console.log(err);
    }
    if (!booking) {
      return res.status(404).json({ message: "No booking found" });
      // console.log("Not deleted");
    }
    return res.status(200).json({ message: "Deleted Successfully" });
    // return console.log("Delete sucessfully");
  };
}
export default new BookingCtrl();

const {User,Book} = require("../models");
const { ErrorHandler } = require('../middleware/errors');
const jv = require("../utils/validation");

module.exports = {
    createBook: async (req,res,next) => {
        try {
            // Extract relevant data after validating the body
            const body = await jv.createBookSchema.validateAsync(req.body);
            const {title,author,summary} = body;

            // Get the currently authenticated user
            const user = req.user;

            // Create the book
            const book = await Book.create({
                title,
                author,
                summary,
                uploadedBy: user._id
            });

            const data = {
                book
            }

            // Send a success response
            return res.status(200).json({success:true,message:"Book Created Successfully",data});
        }catch(err){
            next(err);
        }
    },
    getAllBooks: async (req,res,next) => {
        try {
            const books = await Book.find().populate("uploadedBy");
            const data = {
                books
            }
            return res.status(200).json({success:true,message:"Fetched All Books",data});
        }catch(err){
            next(err);
        }
    },
    getBook: async (req,res,next) => {
        try {
            const id = req.params.id;

            const book = await Book.findById(id).populate("uploadedBy");
            if(!book)
                return next(new ErrorHandler(404,"Book Not Found"));

            const data = {
                book
            }
            return res.status(200).json({success:true,message:"Fetched Book",data});
        } catch (err) {
            next(err);
        }
    },
    updateBook: async (req,res,next) => {
        try{
            // Extract the book ID and currently authenticated user
            const id = req.params.id;
            const user = req.user;

            const body = await jv.updateBookSchema.validateAsync(req.body);

             // Find and update the book based on ID and uploader
            const updatedBook = await Book.findOneAndUpdate({
                _id:id,
                uploadedBy:user._id
            },body,{new:true});

            // If no book is found returns 404
            // Handles the case when the user is not the uploader
            if(!updatedBook)
                return next(new ErrorHandler(404,"Book Not Found"));

            const data = {
                updatedBook
            }
            return res.status(200).json({success:true,message:"Book Updated Successfully",data});
        }catch(err){
            next(err);
        }
    },
    deleteBook: async (req,res,next) => {
        try{
            // Extract the book ID and currently authenticated user
            const id = req.params.id;
            const user = req.user;

            const deletedBook = await Book.findOneAndDelete({
                _id:id,
                uploadedBy:user._id
            });

            // If no book is found returns 404
            // Handles the case when the user is not the uploader
            if(!deletedBook)
                return next(new ErrorHandler(404,"Book Not Found"));

            const data = {
                deletedBook
            }
            return res.status(200).json({success:true,message:"Book Deleted Successfully",data});
        }catch(err){
            next(err);
        }
    }
}
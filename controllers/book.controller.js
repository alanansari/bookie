const {User,Book} = require("../models");
const { ErrorHandler } = require('../middleware/errors');
const jv = require("../utils/validation");

module.exports = {
    createBook: async (req,res,next) => {
        try {
            const body = await jv.createBookSchema.validateAsync(req.body);
            const {title,author,summary} = body;
            const user = req.user;
            const book = await Book.create({
                title,
                author,
                summary,
                uploadedBy: user._id
            });
            const data = {
                book
            }
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
        const id = req.params.id;
        const user = req.user;

        const body = await jv.updateBookSchema.validateAsync(req.body);

        const updatedBook = await Book.findOneAndUpdate({
            _id:id,
            uploadedBy:user._id
        },body,{new:true});

        if(!updatedBook)
            return next(new ErrorHandler(404,"Book Not Found"));

        const data = {
            updatedBook
        }
        return res.status(200).json({success:true,message:"Book Updated Successfully",data});
    },
    deleteBook: async (req,res,next) => {
        const id = req.params.id;
        const user = req.user;

        const deletedBook = await Book.findOneAndDelete({
            _id:id,
            uploadedBy:user._id
        });

        if(!deletedBook)
            return next(new ErrorHandler(404,"Book Not Found"));

        const data = {
            deletedBook
        }
        return res.status(200).json({success:true,message:"Book Deleted Successfully",data});
    }
}
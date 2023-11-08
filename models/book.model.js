const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");

const bookSchema = mongoose.Schema({
    title:{
        type:String,
        required: true
    },
    author:{
        type:String,
        required: true
    },
    summary:{
        type:String,
        required: true
    },
});

const bookModel = mongoose.model("book",bookSchema);

module.exports = bookModel;
    

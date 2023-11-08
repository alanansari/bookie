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
    },
    uploadedBy:{
        type: ObjectId,
        ref: "user"
    }
});

const bookModel = mongoose.model("book",bookSchema);

module.exports = bookModel;
    

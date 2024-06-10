const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
    name:{      //User-name
        type: String,
        required: true,     //Mandatory Attribute
    },
     surname:{
        type: String,
        required: true,
    },
     email:{
        type: String,
        required: true,
    },
    issuedBook:{
        type: mongoose.Schema.Types.ObjectId,       //It has a Relationship with the "Book-model" 
        ref: "Book",        //Reference to Book Table   -   book-model.js-JS28
        required: false,        //Not a Mandatory Attribute
    },
     returnDate:{
        type: String,
        required: false,        //Not a Mandatory Attribute - If Book not Issued, no Return Date
    },
     subscriptionType:{
        type: String,
        required: true,
    },
    subscriptionDate:{
        type: String,
        required: true,
    },
}, 
{
    timestamps: true,
})

module.exports = mongoose.model("User", userSchema)
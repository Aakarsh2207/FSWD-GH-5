const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bookSchema = new Schema({     //ID field will be automatically generated over here from our MOngoDB - ID will be in Hexa-decimal format       ...//Creating mannual ID field will create Errors
    name: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    
    price: {
        type: String,
        required: true,
    },
    publisher: {
        type: String,
        required: true,
    }
}, 
{
    timestamps: true,
})

module.exports = mongoose.model("Book", bookSchema)
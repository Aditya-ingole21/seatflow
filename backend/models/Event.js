const moongoose = require('mongoose');

const eventSchema = new moongoose.Schema({
    title:{
        type: String,
        required: true,
        trim: true

    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    date: {
        type: Date,
        required: true
    },
    location:  {    
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        trim: true
    },price:{
        type: Number,
        required: true,
        min: 0
    },
    capacity:{
        type: Number,
        required: true,
        min: 1
    },
    bookedSeats: {
        type: Number,
        default: 0, 
    },
    createdBy: {
        type: moongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
}, {
    timestamps: true
});

module.exports = moongoose.model('Event', eventSchema);
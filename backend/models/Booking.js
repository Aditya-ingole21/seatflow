const moongoose = require('mongoose');

const bookingSchema = new moongoose.Schema({
    event: {
        type: moongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true
    },
    user: {
        type: moongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true

},
    seats: {
        type: Number,
        required: true,
        min: 1
    },
    totalPrice: {
        type: Number,
        required: true, 
        min: 0
    },
    status: {
        type: String,
        enum: ['booked', 'cancelled'],
        default: 'booked'
    }
}, {
    timestamps: true
});

module.exports = moongoose.model('Booking', bookingSchema);
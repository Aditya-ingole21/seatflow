const Booking = require('../models/Booking');
const Event = require('../models/Event');

// book tickets for an event
const bookEvent = async (req, res, next) => {
    try {
        const { eventId, quantity } = req.body;

        if (!eventId || !quantity) {
            return res.status(400).json({
                success: false,
                message: 'Please provide eventId and quantity'
            });
        }

        if (quantity < 1) {
            return res.status(400).json({
                success: false,
                message: 'Quantity must be at least 1'
            });
        }

        // check if the event exists
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({
                success: false,
                message: 'Event not found'
            });
        }

        // check if enough seats are available
        const availableSeats = event.capacity - event.bookedCount;
        if (quantity > availableSeats) {
            return res.status(400).json({
                success: false,
                message: `Only ${availableSeats} seat(s) are available for this event`
            });
        }

        // check if user already booked this event
        const alreadyBooked = await Booking.findOne({
            user: req.user._id,
            event: eventId,
            status: 'confirmed'
        });

        if (alreadyBooked) {
            return res.status(400).json({
                success: false,
                message: 'You have already booked this event'
            });
        }

        const totalPrice = event.price * quantity;

        // create the booking
        const booking = await Booking.create({
            user: req.user._id,
            event: eventId,
            quantity,
            totalPrice,
            status: 'confirmed'
        });

        // increase the bookedCount on the event
        await Event.findByIdAndUpdate(eventId, { $inc: { bookedCount: quantity } });

        // populate event and user info before sending response
        await booking.populate('event', 'title date location price category');
        await booking.populate('user', 'name email');

        res.status(201).json({
            success: true,
            message: 'Booking confirmed!',
            data: booking
        });

    } catch (error) {
        next(error);
    }
};

// get all bookings of the logged in user
const getMyBookings = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        let filter = { user: req.user._id };

        // optionally filter by status
        if (req.query.status) {
            filter.status = req.query.status;
        }

        const bookings = await Booking.find(filter)
            .populate('event', 'title date location price category capacity bookedCount')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const total = await Booking.countDocuments(filter);

        res.status(200).json({
            success: true,
            data: bookings,
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit)
            }
        });

    } catch (error) {
        next(error);
    }
};

// cancel a booking
const cancelBooking = async (req, res, next) => {
    try {
        const booking = await Booking.findById(req.params.id);

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: 'Booking not found'
            });
        }

        // make sure only the person who booked can cancel it
        if (booking.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: 'You are not allowed to cancel this booking'
            });
        }

        if (booking.status === 'cancelled') {
            return res.status(400).json({
                success: false,
                message: 'This booking is already cancelled'
            });
        }

        // cancel the booking
        booking.status = 'cancelled';
        await booking.save();

        // free up the seats on the event
        await Event.findByIdAndUpdate(booking.event, { $inc: { bookedCount: -booking.quantity } });

        res.status(200).json({
            success: true,
            message: 'Booking cancelled successfully'
        });

    } catch (error) {
        next(error);
    }
};

module.exports = { bookEvent, getMyBookings, cancelBooking };

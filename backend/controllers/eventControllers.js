const Event = require('../models/Event');

// create a new event - only admins can do this
const createEvent = async (req, res, next) => {
    try {
        const { title, description, date, category, location, price, capacity } = req.body;

        // make sure all fields are provided
        if (!title || !description || !date || !category || !location || price === undefined || !capacity) {
            return res.status(400).json({
                success: false,
                message: 'Please fill in all the required fields'
            });
        }

        const event = await Event.create({
            title,
            description,
            date,
            category,
            location,
            price,
            capacity,
            createdBy: req.user._id
        });

        res.status(201).json({
            success: true,
            data: event
        });

    } catch (error) {
        next(error);
    }
};

// get all events with optional filters and pagination
const getEvents = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 9;
        const skip = (page - 1) * limit;

        // build the filter object based on query params
        let filter = {};

        if (req.query.category) {
            filter.category = req.query.category;
        }

        if (req.query.date) {
            filter.date = { $gte: new Date(req.query.date) };
        }

        if (req.query.search) {
            filter.title = { $regex: req.query.search, $options: 'i' };
        }

        // handle sorting
        let sort = { date: 1 }; // default sort by date ascending

        if (req.query.sort === 'date_desc') sort = { date: -1 };
        else if (req.query.sort === 'price_asc') sort = { price: 1 };
        else if (req.query.sort === 'price_desc') sort = { price: -1 };

        const events = await Event.find(filter)
            .populate('createdBy', 'name email')
            .sort(sort)
            .skip(skip)
            .limit(limit);

        const total = await Event.countDocuments(filter);
        const totalPages = Math.ceil(total / limit);

        res.status(200).json({
            success: true,
            data: events,
            pagination: {
                total,
                page,
                limit,
                totalPages,
                hasNextPage: page < totalPages,
                hasPrevPage: page > 1
            }
        });

    } catch (error) {
        next(error);
    }
};

// get a single event by id
const getEventById = async (req, res, next) => {
    try {
        const event = await Event.findById(req.params.id).populate('createdBy', 'name email');

        if (!event) {
            return res.status(404).json({
                success: false,
                message: 'Event not found'
            });
        }

        // include virtual field remainingSeats in response
        const eventData = event.toObject({ virtuals: true });

        res.status(200).json({
            success: true,
            data: eventData
        });

    } catch (error) {
        next(error);
    }
};

// update an event
const updateEvent = async (req, res, next) => {
    try {
        const event = await Event.findById(req.params.id);

        if (!event) {
            return res.status(404).json({
                success: false,
                message: 'Event not found'
            });
        }

        // dont let admin reduce capacity below already booked seats
        if (req.body.capacity && req.body.capacity < event.bookedCount) {
            return res.status(400).json({
                success: false,
                message: `Cannot reduce capacity below ${event.bookedCount} (already booked seats)`
            });
        }

        // update only the fields that were sent
        if (req.body.title) event.title = req.body.title;
        if (req.body.description) event.description = req.body.description;
        if (req.body.date) event.date = req.body.date;
        if (req.body.category) event.category = req.body.category;
        if (req.body.location) event.location = req.body.location;
        if (req.body.price !== undefined) event.price = req.body.price;
        if (req.body.capacity) event.capacity = req.body.capacity;

        const updatedEvent = await event.save();

        res.status(200).json({
            success: true,
            data: updatedEvent
        });

    } catch (error) {
        next(error);
    }
};

// delete an event
const deleteEvent = async (req, res, next) => {
    try {
        const event = await Event.findById(req.params.id);

        if (!event) {
            return res.status(404).json({
                success: false,
                message: 'Event not found'
            });
        }

        await event.deleteOne();

        res.status(200).json({
            success: true,
            message: 'Event deleted successfully'
        });

    } catch (error) {
        next(error);
    }
};

module.exports = { createEvent, getEvents, getEventById, updateEvent, deleteEvent };

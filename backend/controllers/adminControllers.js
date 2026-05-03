const Booking = require('../models/Booking');
const Event = require('../models/Event');
const User = require('../models/User');

// get all bookings - for admin dashboard
const getAllBookings = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 15;
        const skip = (page - 1) * limit;

        let filter = {};

        if (req.query.status) {
            filter.status = req.query.status;
        }

        if (req.query.eventId) {
            filter.event = req.query.eventId;
        }

        const bookings = await Booking.find(filter)
            .populate('user', 'name email')
            .populate('event', 'title date category location price')
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

// get stats for admin dashboard
const getDashboardStats = async (req, res, next) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalEvents = await Event.countDocuments();
        const totalBookings = await Booking.countDocuments({ status: 'confirmed' });
        const cancelledBookings = await Booking.countDocuments({ status: 'cancelled' });

        // calculate total revenue from confirmed bookings
        const revenueData = await Booking.aggregate([
            { $match: { status: 'confirmed' } },
            { $group: { _id: null, total: { $sum: '$totalPrice' } } }
        ]);

        const totalRevenue = revenueData.length > 0 ? revenueData[0].total : 0;

        // get 5 most recent bookings
        const recentBookings = await Booking.find({ status: 'confirmed' })
            .populate('user', 'name email')
            .populate('event', 'title date')
            .sort({ createdAt: -1 })
            .limit(5);

        // upcoming events
        const upcomingEvents = await Event.find({ date: { $gte: new Date() } })
            .sort({ date: 1 })
            .limit(5)
            .select('title date category capacity bookedCount');

        res.status(200).json({
            success: true,
            data: {
                totalUsers,
                totalEvents,
                totalBookings,
                cancelledBookings,
                totalRevenue,
                recentBookings,
                upcomingEvents
            }
        });

    } catch (error) {
        next(error);
    }
};

// get all users - admin only
const getAllUsers = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 15;
        const skip = (page - 1) * limit;

        const users = await User.find()
            .select('-password')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const total = await User.countDocuments();

        res.status(200).json({
            success: true,
            data: users,
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

module.exports = { getAllBookings, getDashboardStats, getAllUsers };

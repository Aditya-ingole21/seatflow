import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Users, Share2, Heart, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

const EventDetails = () => {
  const { id } = useParams();
  const [ticketCount, setTicketCount] = useState(1);
  const [isBooked, setIsBooked] = useState(false);

  // Mock data for demonstration
  const event = {
    id,
    title: 'Neon Night Music Festival',
    description: 'Experience the ultimate fusion of electronic music and visual arts. Join us for a night of unforgettable performances by world-renowned DJs, immersive light shows, and an electric atmosphere that will keep you dancing until dawn. This year features expanded stages, VIP lounges, and interactive art installations.',
    date: 'Oct 24, 2026',
    time: '8:00 PM - 3:00 AM',
    location: 'Staples Center, Los Angeles, CA',
    price: 85,
    img: 'https://images.unsplash.com/photo-1540039155732-61ee01b29a4c?auto=format&fit=crop&q=80',
    category: 'Music',
    organizer: 'Rhythm & Beats Co.',
    capacity: 5000,
    availableSeats: 420
  };

  const handleBooking = (e) => {
    e.preventDefault();
    setIsBooked(true);
    // In a real app, this would make an API call to the backend
  };

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Link to="/events" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" /> Back to Events
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-3xl overflow-hidden h-[400px] relative border border-white/10"
            >
              <img src={event.img} alt={event.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 flex gap-3">
                <span className="glass px-4 py-2 rounded-full text-sm font-bold backdrop-blur-md">
                  {event.category}
                </span>
                <button className="glass p-2 rounded-full hover:bg-white/20 transition-colors backdrop-blur-md">
                  <Heart className="w-5 h-5" />
                </button>
                <button className="glass p-2 rounded-full hover:bg-white/20 transition-colors backdrop-blur-md">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{event.title}</h1>
              <p className="text-gray-400 text-lg mb-8">Organized by <span className="text-white font-medium">{event.organizer}</span></p>

              <h2 className="text-2xl font-bold mb-4 border-b border-white/10 pb-2">About this event</h2>
              <p className="text-gray-300 leading-relaxed whitespace-pre-line mb-8">
                {event.description}
              </p>
            </motion.div>
          </div>

          {/* Sidebar / Booking Card */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="glass-card p-6 rounded-3xl sticky top-28 border border-white/10 shadow-2xl">
              
              {!isBooked ? (
                <>
                  <div className="text-3xl font-bold text-gradient mb-6">${event.price} <span className="text-lg text-gray-400 font-normal">/ ticket</span></div>

                  <div className="space-y-4 mb-8">
                    <div className="flex items-start gap-4">
                      <div className="bg-white/5 p-3 rounded-xl"><Calendar className="w-6 h-6 text-accent-blue" /></div>
                      <div>
                        <p className="font-bold">{event.date}</p>
                        <p className="text-gray-400 text-sm">Add to calendar</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="bg-white/5 p-3 rounded-xl"><Clock className="w-6 h-6 text-accent-blue" /></div>
                      <div>
                        <p className="font-bold">{event.time}</p>
                        <p className="text-gray-400 text-sm">PST Timezone</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="bg-white/5 p-3 rounded-xl"><MapPin className="w-6 h-6 text-accent-blue" /></div>
                      <div>
                        <p className="font-bold leading-tight">{event.location}</p>
                        <a href="#" className="text-accent-blue text-sm hover:underline">View on map</a>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-white/10 pt-6 mb-6">
                    <div className="flex justify-between items-center mb-4">
                      <span className="font-medium">Quantity</span>
                      <div className="flex items-center gap-4 glass rounded-xl px-4 py-2">
                        <button 
                          onClick={() => setTicketCount(Math.max(1, ticketCount - 1))}
                          className="text-gray-400 hover:text-white transition-colors text-xl font-bold"
                        >-</button>
                        <span className="font-bold text-lg w-4 text-center">{ticketCount}</span>
                        <button 
                          onClick={() => setTicketCount(Math.min(10, ticketCount + 1))}
                          className="text-gray-400 hover:text-white transition-colors text-xl font-bold"
                        >+</button>
                      </div>
                    </div>
                    <div className="flex justify-between items-center mb-6 text-gray-400 text-sm">
                      <span className="flex items-center gap-1"><Users className="w-4 h-4" /> {event.availableSeats} spots left</span>
                      <span>Max 10 per order</span>
                    </div>

                    <div className="flex justify-between items-center font-bold text-lg mb-6">
                      <span>Total:</span>
                      <span className="text-2xl">${event.price * ticketCount}</span>
                    </div>

                    <button 
                      onClick={handleBooking}
                      className="glow-button w-full py-4 rounded-xl bg-white text-black font-bold text-lg hover:scale-[1.02] transition-transform"
                    >
                      Book Tickets
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-center py-8">
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6"
                  >
                    <CheckCircle2 className="w-10 h-10 text-green-400" />
                  </motion.div>
                  <h3 className="text-2xl font-bold mb-2">Booking Confirmed!</h3>
                  <p className="text-gray-400 mb-8">
                    You've successfully booked {ticketCount} ticket(s) for {event.title}. Check your email for the tickets.
                  </p>
                  <Link to="/dashboard" className="glass w-full block py-3 rounded-xl font-bold hover:bg-white/10 transition-colors">
                    View My Tickets
                  </Link>
                </div>
              )}

            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default EventDetails;

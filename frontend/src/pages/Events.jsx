import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, MapPin, Calendar, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const dummyEvents = [
  { id: 1, title: 'Neon Night Music Festival', date: 'Oct 24, 2026', time: '8:00 PM', location: 'Los Angeles, CA', price: 85, img: 'https://images.unsplash.com/photo-1540039155732-61ee01b29a4c?auto=format&fit=crop&q=80', category: 'Music' },
  { id: 2, title: 'Global Tech Summit 2026', date: 'Nov 12, 2026', time: '9:00 AM', location: 'San Francisco, CA', price: 299, img: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80', category: 'Technology' },
  { id: 3, title: 'Digital Art Exhibition', date: 'Oct 30, 2026', time: '10:00 AM', location: 'New York, NY', price: 45, img: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80', category: 'Art' },
  { id: 4, title: 'Startup Pitch Night', date: 'Dec 05, 2026', time: '6:30 PM', location: 'Austin, TX', price: 25, img: 'https://images.unsplash.com/photo-1559223607-a43c990c692c?auto=format&fit=crop&q=80', category: 'Business' },
  { id: 5, title: 'Food & Wine Tasting', date: 'Nov 20, 2026', time: '7:00 PM', location: 'Chicago, IL', price: 120, img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80', category: 'Food' },
  { id: 6, title: 'Indie Rock Concert', date: 'Oct 28, 2026', time: '9:00 PM', location: 'Seattle, WA', price: 55, img: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&q=80', category: 'Music' },
];

const categories = ['All', 'Music', 'Technology', 'Art', 'Business', 'Food'];

const Events = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredEvents = dummyEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          event.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'All' || event.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Search */}
        <div className="mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Discover <span className="text-gradient">Events</span>
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col md:flex-row gap-4"
          >
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search events, locations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-11 pr-4 py-4 glass-card rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-blue transition-all"
              />
            </div>
            <button className="glass flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-medium hover:bg-white/10 transition-colors">
              <Filter className="w-5 h-5" />
              Filters
            </button>
          </motion.div>
        </div>

        {/* Categories */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex overflow-x-auto pb-4 mb-8 gap-3 hide-scrollbar"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full whitespace-nowrap font-medium transition-all ${
                activeCategory === cat 
                  ? 'bg-gradient-primary text-white shadow-lg' 
                  : 'glass text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((event, idx) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="glass-card rounded-2xl overflow-hidden group border border-white/5 flex flex-col h-full"
            >
              <div className="relative h-48 overflow-hidden shrink-0">
                <div className="absolute top-4 left-4 z-10 glass px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md">
                  {event.category}
                </div>
                <div className="absolute top-4 right-4 z-10 glass px-3 py-1 rounded-full text-xs font-bold text-accent-blue backdrop-blur-md">
                  ${event.price}
                </div>
                <img 
                  src={event.img} 
                  alt={event.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent"></div>
              </div>
              
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold mb-4 group-hover:text-accent-blue transition-colors line-clamp-2">{event.title}</h3>
                
                <div className="space-y-2 mb-6 flex-grow">
                  <div className="flex items-center gap-3 text-gray-400 text-sm">
                    <Calendar className="w-4 h-4 text-accent-purple" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-400 text-sm">
                    <Clock className="w-4 h-4 text-accent-purple" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-400 text-sm">
                    <MapPin className="w-4 h-4 text-accent-purple" />
                    <span className="truncate">{event.location}</span>
                  </div>
                </div>
                
                <Link to={`/events/${event.id}`} className="w-full text-center py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold transition-colors mt-auto border border-white/10 group-hover:border-accent-blue/50">
                  View Details
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full glass mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold mb-2">No events found</h3>
            <p className="text-gray-400">Try adjusting your search or filters to find what you're looking for.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;

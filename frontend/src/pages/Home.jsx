import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Star, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-32">
        {/* Background Decorative Elements */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full mix-blend-screen filter blur-[100px] animate-pulse-slow"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full mix-blend-screen filter blur-[100px] animate-pulse-slow" style={{ animationDelay: '2s' }}></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-8"
            >
              <Star className="w-4 h-4 text-yellow-400" />
              <span className="text-sm font-medium text-gray-300">The Premium Event Experience</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8"
            >
              Discover & Book <br />
              <span className="text-gradient">Unforgettable Events</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto"
            >
              Experience seamless ticketing with SeatFlow. Find concerts, tech conferences, and exclusive meetups happening near you.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link to="/events" className="glow-button flex items-center justify-center gap-2 bg-white text-black px-8 py-4 rounded-xl font-bold text-lg transition-transform hover:scale-105">
                Explore Events <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/register" className="flex items-center justify-center gap-2 glass px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-colors">
                Host an Event
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Dashboard Mockup floating element */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20 max-w-5xl mx-auto px-4 relative z-10 animate-float"
        >
          <div className="glass-card rounded-2xl p-2 md:p-4 border border-white/10 shadow-2xl">
            <div className="bg-gray-900 rounded-xl overflow-hidden aspect-[16/9] relative border border-white/5">
              {/* Abstract visual representing dashboard/events */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80')] opacity-40 bg-cover bg-center mix-blend-overlay"></div>
                <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#050505] to-transparent"></div>
                
                {/* Mock UI Elements */}
                <div className="absolute top-4 left-4 right-4 flex justify-between items-center opacity-80">
                  <div className="h-6 w-24 bg-white/20 rounded backdrop-blur"></div>
                  <div className="flex gap-2">
                    <div className="h-6 w-6 bg-white/20 rounded-full backdrop-blur"></div>
                    <div className="h-6 w-6 bg-white/20 rounded-full backdrop-blur"></div>
                  </div>
                </div>
                
                <div className="absolute bottom-8 left-8 right-8 flex gap-4 opacity-90">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex-1 h-32 glass rounded-lg border border-white/10 p-4 transform transition-transform hover:-translate-y-2">
                      <div className="h-4 w-1/2 bg-white/20 rounded mb-4"></div>
                      <div className="h-3 w-3/4 bg-white/10 rounded mb-2"></div>
                      <div className="h-3 w-2/3 bg-white/10 rounded"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Featured Section */}
      <section className="py-20 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center gap-3">
                <TrendingUp className="text-accent-purple" /> 
                Trending Now
              </h2>
              <p className="text-gray-400">The most anticipated events this week</p>
            </div>
            <Link to="/events" className="hidden md:flex text-accent-blue hover:text-white transition-colors items-center gap-1 font-medium">
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Dummy Featured Events */}
            {[
              { title: 'Neon Night Music Festival', date: 'Oct 24, 2026', price: '$85', img: 'https://images.unsplash.com/photo-1540039155732-61ee01b29a4c?auto=format&fit=crop&q=80', tag: 'Music' },
              { title: 'Global Tech Summit 2026', date: 'Nov 12, 2026', price: '$299', img: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80', tag: 'Technology' },
              { title: 'Digital Art Exhibition', date: 'Oct 30, 2026', price: '$45', img: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80', tag: 'Art' },
            ].map((event, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="glass-card rounded-2xl overflow-hidden group cursor-pointer border border-white/5 hover:border-accent-purple/50"
              >
                <div className="relative h-48 overflow-hidden">
                  <div className="absolute top-4 left-4 z-10 glass px-3 py-1 rounded-full text-xs font-semibold">
                    {event.tag}
                  </div>
                  <img 
                    src={event.img} 
                    alt={event.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111] to-transparent"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-accent-blue transition-colors">{event.title}</h3>
                  <div className="flex items-center gap-2 text-gray-400 mb-4 text-sm">
                    <Calendar className="w-4 h-4" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-white/10">
                    <span className="text-xl font-bold text-white">{event.price}</span>
                    <button className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-sm font-semibold transition-colors">
                      Book Now
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-10 text-center md:hidden">
            <Link to="/events" className="inline-flex text-accent-blue hover:text-white transition-colors items-center gap-1 font-medium">
              View all events <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

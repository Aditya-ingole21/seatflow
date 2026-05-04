import { useState } from 'react';
import { motion } from 'framer-motion';
import { Ticket, Calendar, MapPin, User, Settings, LogOut, Download } from 'lucide-react';
import { Link } from 'react-router-dom';

const mockTickets = [
  {
    id: 'TKT-8492-2026',
    eventName: 'Neon Night Music Festival',
    date: 'Oct 24, 2026',
    time: '8:00 PM',
    location: 'Staples Center, Los Angeles, CA',
    quantity: 2,
    status: 'Upcoming',
    img: 'https://images.unsplash.com/photo-1540039155732-61ee01b29a4c?auto=format&fit=crop&q=80'
  },
  {
    id: 'TKT-3214-2026',
    eventName: 'Global Tech Summit 2026',
    date: 'Nov 12, 2026',
    time: '9:00 AM',
    location: 'Moscone Center, San Francisco, CA',
    quantity: 1,
    status: 'Upcoming',
    img: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80'
  },
  {
    id: 'TKT-1092-2025',
    eventName: 'Winter Jazz Festival',
    date: 'Dec 15, 2025',
    time: '7:30 PM',
    location: 'Blue Note, New York, NY',
    quantity: 2,
    status: 'Past',
    img: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80'
  }
];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('upcoming');

  const filteredTickets = mockTickets.filter(
    tkt => activeTab === 'upcoming' ? tkt.status === 'Upcoming' : tkt.status === 'Past'
  );

  return (
    <div className="min-h-screen pt-28 pb-20 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row gap-8">
        
        {/* Sidebar */}
        <div className="md:w-64 shrink-0">
          <div className="glass-card rounded-2xl p-6 border border-white/10 sticky top-28">
            <div className="flex flex-col items-center mb-8">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-accent-blue to-accent-purple p-1 mb-4">
                <div className="w-full h-full bg-[#111] rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-gray-300" />
                </div>
              </div>
              <h2 className="text-xl font-bold">Alex Johnson</h2>
              <p className="text-gray-400 text-sm">alex.j@example.com</p>
            </div>

            <nav className="space-y-2">
              <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/10 text-white font-medium transition-colors">
                <Ticket className="w-5 h-5" /> My Tickets
              </a>
              <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
                <Settings className="w-5 h-5" /> Settings
              </a>
              <Link to="/" className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-400/10 transition-colors mt-8">
                <LogOut className="w-5 h-5" /> Sign Out
              </Link>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-8">My Tickets</h1>
          
          {/* Tabs */}
          <div className="flex gap-4 mb-8 border-b border-white/10 pb-4">
            <button 
              onClick={() => setActiveTab('upcoming')}
              className={`font-medium pb-4 -mb-[17px] border-b-2 transition-colors ${activeTab === 'upcoming' ? 'border-accent-blue text-white' : 'border-transparent text-gray-400 hover:text-gray-200'}`}
            >
              Upcoming Events
            </button>
            <button 
              onClick={() => setActiveTab('past')}
              className={`font-medium pb-4 -mb-[17px] border-b-2 transition-colors ${activeTab === 'past' ? 'border-accent-blue text-white' : 'border-transparent text-gray-400 hover:text-gray-200'}`}
            >
              Past Events
            </button>
          </div>

          {/* Ticket List */}
          <div className="space-y-6">
            {filteredTickets.map((ticket, idx) => (
              <motion.div 
                key={ticket.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="glass-card rounded-2xl overflow-hidden border border-white/5 flex flex-col sm:flex-row relative group"
              >
                {/* Visual tearing effect for ticket */}
                <div className="hidden sm:block absolute left-[220px] top-0 bottom-0 w-[2px] border-l-2 border-dashed border-white/20 z-10"></div>
                
                {/* Semi-circles for ticket punch effect */}
                <div className="hidden sm:block absolute left-[210px] -top-3 w-6 h-6 rounded-full bg-[#050505] z-10 border border-white/5 border-t-0"></div>
                <div className="hidden sm:block absolute left-[210px] -bottom-3 w-6 h-6 rounded-full bg-[#050505] z-10 border border-white/5 border-b-0"></div>

                <div className="sm:w-[220px] h-48 sm:h-auto shrink-0 relative">
                  <img src={ticket.img} alt={ticket.eventName} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors"></div>
                </div>
                
                <div className="p-6 flex-1 flex flex-col justify-between ml-0 sm:ml-4">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold">{ticket.eventName}</h3>
                      <span className="glass px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap">
                        {ticket.quantity} {ticket.quantity > 1 ? 'Tickets' : 'Ticket'}
                      </span>
                    </div>
                    
                    <div className="space-y-2 mb-6">
                      <div className="flex items-center gap-2 text-gray-400 text-sm">
                        <Calendar className="w-4 h-4 text-accent-purple" />
                        <span>{ticket.date} • {ticket.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-400 text-sm">
                        <MapPin className="w-4 h-4 text-accent-purple" />
                        <span className="truncate">{ticket.location}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mt-auto">
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Booking ID</p>
                      <p className="font-mono text-sm">{ticket.id}</p>
                    </div>
                    
                    {activeTab === 'upcoming' && (
                      <button className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-xl transition-colors text-sm font-medium border border-white/10">
                        <Download className="w-4 h-4" /> Download Ticket
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}

            {filteredTickets.length === 0 && (
              <div className="text-center py-16 glass-card rounded-2xl border border-white/5">
                <Ticket className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-medium mb-2">No tickets found</h3>
                <p className="text-gray-400 mb-6">You don't have any {activeTab} events.</p>
                <Link to="/events" className="glow-button inline-flex items-center justify-center bg-white text-black px-6 py-3 rounded-xl font-bold transition-transform hover:scale-105">
                  Browse Events
                </Link>
              </div>
            )}
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Dashboard;

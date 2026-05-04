import { Ticket, Twitter, Github, Linkedin, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-[#050505] pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4 group inline-flex">
              <div className="bg-gradient-primary p-2 rounded-lg">
                <Ticket className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gradient">SeatFlow</span>
            </Link>
            <p className="text-gray-400 max-w-sm mb-6">
              The premium platform for discovering and booking the most exclusive events, conferences, and festivals around the world.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 glass rounded-full hover:bg-white/10 transition-colors text-gray-400 hover:text-white">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 glass rounded-full hover:bg-white/10 transition-colors text-gray-400 hover:text-white">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 glass rounded-full hover:bg-white/10 transition-colors text-gray-400 hover:text-white">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 glass rounded-full hover:bg-white/10 transition-colors text-gray-400 hover:text-white">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-bold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/events" className="text-gray-400 hover:text-accent-blue transition-colors text-sm">All Events</Link></li>
              <li><Link to="/dashboard" className="text-gray-400 hover:text-accent-blue transition-colors text-sm">Dashboard</Link></li>
              <li><Link to="/register" className="text-gray-400 hover:text-accent-blue transition-colors text-sm">Host an Event</Link></li>
              <li><Link to="/login" className="text-gray-400 hover:text-accent-blue transition-colors text-sm">Sign In</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4">Legal</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-accent-blue transition-colors text-sm">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-accent-blue transition-colors text-sm">Terms of Service</a></li>
              <li><a href="#" className="text-gray-400 hover:text-accent-blue transition-colors text-sm">Cookie Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-accent-blue transition-colors text-sm">Support</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} SeatFlow. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            Made with <span className="text-red-500">❤</span> for Event Goers
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

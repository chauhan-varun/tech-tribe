import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(false);
  const location = useLocation();

  // Initial load animation with delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50); // Increased threshold for better visual effect
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial scroll position
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Events', path: '/events' },
    { name: 'Team', path: '/team' },
    { name: 'Founders', path: '/founders' },
    { name: 'Organizations', path: '/organizations' },
    { name: 'About', path: '/about' },
  ];

  const variants = {
    hidden: { 
      opacity: 0,
      y: -20,
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.07
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.header 
      initial="hidden"
      animate={visible ? "visible" : "hidden"}
      variants={variants}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'shadow-xl py-3 border-b border-gray-800/50' 
          : 'py-5'
      }`}
      style={{
        backdropFilter: scrolled ? 'blur(20px)' : 'blur(16px)',
        backgroundColor: scrolled ? 'rgba(0, 0, 0, 0.15)' : 'rgba(0, 0, 0, 0.1)'
      }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <motion.div 
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              className="flex items-center"
            >
              <img 
                src="https://techtribecheck.netlify.app/lovable-uploads/21ef0c51-1eeb-42ba-8098-a0318aa2c3b7.png" 
                alt="Tech Tribe Logo" 
                className="h-10 w-auto mr-2" 
              />
              <span className="text-2xl font-bold text-white">
                <span className="text-primary-500">Tech</span>Tribe
              </span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.name}
                variants={itemVariants}
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <NavLink 
                  to={link.path}
                  className={({ isActive }) => `
                    relative font-medium nav-link hover:text-white transition-colors
                    ${isActive ? 'text-primary-500 font-semibold' : ''}
                    after:content-[''] after:absolute after:bottom-[-6px] after:left-0
                    after:h-[2px] after:bg-primary-500 after:transition-all after:duration-300
                    ${isActive ? 'after:w-full' : 'after:w-0 hover:after:w-full'}
                  `}
                >
                  {link.name}
                </NavLink>
              </motion.div>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <motion.div 
            className="md:hidden"
            variants={itemVariants}
          >
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-primary-500 p-2 rounded-md focus:outline-none transition-colors"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </motion.div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden border-t border-gray-800/20 z-50 shadow-xl"
            style={{
              backdropFilter: 'blur(16px)',
              backgroundColor: 'rgba(0, 0, 0, 0.1)'
            }}
          >
            <div className="container mx-auto px-4 py-3">
              <nav className="flex flex-col space-y-4 py-3">
                {navLinks.map((link) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <NavLink
                      to={link.path}
                      className={({ isActive }) => `
                        block py-2 px-4 ${
                          isActive 
                            ? 'text-primary-500 font-semibold bg-white/5 rounded-md' 
                            : 'nav-link hover:text-white hover:bg-white/5 rounded-md'
                        }
                      `}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.name}
                    </NavLink>
                  </motion.div>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;

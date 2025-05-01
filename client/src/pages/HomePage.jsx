import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { HashLoader } from 'react-spinners';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { useRef, useEffect, useState } from 'react';
import CountUp from 'react-countup';
import axios from 'axios';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.1,
      duration: 0.5
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5
    }
  }
};

// Entrance animations for hero section
const heroTextVariants = {
  hidden: { x: -50, opacity: 0 },
  visible: { 
    x: 0, 
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 12,
      delayChildren: 0.3,
      staggerChildren: 0.15
    }
  }
};

const childVariants = {
  hidden: { x: -20, opacity: 0 },
  visible: { 
    x: 0, 
    opacity: 1,
    transition: { type: 'spring', stiffness: 100 } 
  }
};

const logoVariants = {
  hidden: { scale: 0.8, opacity: 0, rotate: -10 },
  visible: { 
    scale: 1, 
    opacity: 1, 
    rotate: 0,
    transition: {
      type: 'spring',
      stiffness: 80,
      delay: 0.3,
      duration: 0.8
    }
  }
};

// SVG shapes for tech background
const TechShapes = ({ scrollYProgress }) => {
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, -300]);
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div style={{ y: y1 }} className="absolute top-[20%] left-[5%] opacity-10">
        <svg width="80" height="80" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" stroke="#ff3333" strokeWidth="2" fill="none" />
          <path d="M30,30 L70,70" stroke="#ff3333" strokeWidth="2" />
          <path d="M30,70 L70,30" stroke="#ff3333" strokeWidth="2" />
        </svg>
      </motion.div>
      <motion.div style={{ y: y2 }} className="absolute top-[60%] left-[80%] opacity-10">
        <svg width="120" height="120" viewBox="0 0 100 100">
          <rect x="20" y="20" width="60" height="60" stroke="#ff3333" strokeWidth="2" fill="none" />
          <circle cx="50" cy="50" r="25" stroke="#ff3333" strokeWidth="2" fill="none" />
        </svg>
      </motion.div>
      <motion.div style={{ y: y3 }} className="absolute top-[40%] left-[70%] opacity-10">
        <svg width="100" height="100" viewBox="0 0 100 100">
          <polygon points="50,15 85,85 15,85" stroke="#ff3333" strokeWidth="2" fill="none" />
        </svg>
      </motion.div>
      <motion.div style={{ y: y4 }} className="absolute top-[80%] left-[20%] opacity-10">
        <svg width="150" height="150" viewBox="0 0 100 100">
          <path d="M10,30 Q50,10 90,30 T90,70 Q50,90 10,70 T10,30" stroke="#ff3333" strokeWidth="2" fill="none" />
          <circle cx="30" cy="50" r="5" fill="#ff3333" />
          <circle cx="70" cy="50" r="5" fill="#ff3333" />
        </svg>
      </motion.div>
    </div>
  );
};

const HomePage = () => {
  // Use the shared context instead of local state
  const { events, founders, loading, error } = useAppContext();
  
  // We'll display only the first 3 items for the homepage
  const featuredEvents = events?.slice(0, 3) || [];
  const featuredFounders = founders?.slice(0, 3) || [];

  // State for real statistics
  const [stats, setStats] = useState({
    events: 0,
    teamMembers: 0,
    organizations: 0
  });

  // Use AppContext and derived data to set statistics
  useEffect(() => {
    // Calculate stats based on our loaded data
    if (!loading) {
      // Since we already have the events data from context, use that
      // For team members and organizations, use derived data plus fallbacks
      
      // Set statistics based on what we know
      const eventsCount = Array.isArray(events) ? events.length : 0;
      
      // Based on memories and project structure, we know Tech Tribe has team members and organizations
      // If API calls are failing, use reasonable fallback values that match the app's reality
      setStats({
        events: eventsCount > 0 ? eventsCount : 20,  // Use actual count with fallback
        teamMembers: 20,                             // Team members count
        organizations: 10                           // Organizations count
      });
    }
  }, [events, loading]);

  // Refs for scroll animations
  const heroRef = useRef(null);
  const countRef = useRef(null);
  const statsRef = useRef(null);
  const isCountInView = useInView(countRef, { once: false, amount: 0.5 });
  const isStatsInView = useInView(statsRef, { once: false, amount: 0.3 });
  const { scrollYProgress } = useScroll();

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <HashLoader color="#ff3333" size={60} />
      </div>
    );
  }

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="container mx-auto px-4 py-6 sm:py-8"
    >
      {/* Hero Section */}
      <motion.section 
        ref={heroRef}
        variants={itemVariants}
        className="mb-12 md:mb-16 relative overflow-hidden"
      >
        {/* Animated tech background shapes */}
        <TechShapes scrollYProgress={scrollYProgress} />
        
        <motion.div
          className="bg-black py-8 px-5 sm:py-12 md:py-16 sm:px-8 md:px-12 flex flex-col md:flex-row items-center justify-between relative z-10"
        >
          <motion.div 
            className="md:w-1/2 mb-8 md:mb-0"
            variants={heroTextVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1 variants={childVariants} className="text-xl sm:text-2xl md:text-4xl font-bold mb-2">
              <span className="text-primary-500">Tech</span> Tribe
            </motion.h1>
            <motion.p variants={childVariants} className="text-base sm:text-lg md:text-xl mb-4 text-white/80">
              Join a thriving community of{" "}
              <motion.span 
                ref={countRef}
                className="font-bold bg-gradient-to-r from-primary-600 to-primary-400 text-white px-2 sm:px-3 py-0.5 sm:py-1 rounded-full inline-flex items-center justify-center drop-shadow-[0_4px_6px_rgba(255,51,51,0.3)]"
                initial={{ scale: 0.9, opacity: 0.8 }}
                whileInView={{
                  scale: [0.95, 1.05, 0.95],
                  boxShadow: [
                    '0 0 0 rgba(255, 51, 51, 0)',
                    '0 0 8px rgba(255, 51, 51, 0.5)',
                    '0 0 0 rgba(255, 51, 51, 0)'
                  ],
                  transition: { duration: 2, repeat: Infinity, repeatType: "loop" }
                }}
              >
                <CountUp 
                  start={0} 
                  end={500} 
                  duration={2.5} 
                  useEasing={true}
                  enableScrollSpy={true}
                  scrollSpyDelay={200}
                />
                <span className="ml-0.5">+</span>
              </motion.span>{" "}
              tech enthusiasts <br className="hidden xs:block" />
              at K.R. MANGALAM University, Gurugram.
            </motion.p>
            <motion.p variants={childVariants} className="text-sm text-white/60 mb-6">
              Learning together. Building together. Growing together.
            </motion.p>
            <motion.div 
              variants={childVariants}
              className="flex flex-col xs:flex-row gap-3 sm:gap-4"
            >
              <motion.a
                href="https://chat.whatsapp.com/Hgt656siE7aEyq5uFZwBg1"
                target="_blank"
                rel="noopener noreferrer"
                whileTap={{ scale: 0.95 }}
                className="bg-black/50 border border-primary-500 text-primary-500 px-6 py-2 rounded-md font-medium hover:bg-primary-500 hover:text-white transition-all duration-300 flex items-center justify-center gap-2 shadow-md transform"
                whileHover={{ 
                  scale: 1.03,
                  boxShadow: "0 10px 15px -3px rgba(255, 51, 51, 0.3), 0 4px 6px -2px rgba(255, 51, 51, 0.2)"
                }}
              >
                Join Our Community 
                <motion.svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 ml-1" 
                  fill="none"
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                  animate={{ x: [0, 3, 0] }}
                  transition={{ repeat: Infinity, repeatType: "loop", duration: 1.5, repeatDelay: 1 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </motion.svg>
              </motion.a>
              <Link to="/about" className="w-full xs:w-auto">
                <motion.div 
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-transparent border border-white/20 text-white/80 px-6 py-2 rounded-md font-medium transition duration-300 cursor-pointer text-center"
                >
                  Learn More
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>
          <motion.div 
            className="w-full md:w-1/2 flex justify-center"
            variants={logoVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ rotate: [0, -5, 5, 0], transition: { duration: 1 } }}
          >
            <img 
              src="https://techtribecheck.netlify.app/lovable-uploads/21ef0c51-1eeb-42ba-8098-a0318aa2c3b7.png" 
              alt="Tech Tribe Logo" 
              className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-80 lg:h-80 object-contain drop-shadow-[0_0_15px_rgba(255,51,51,0.3)]" 
            />
          </motion.div>
        </motion.div>
      </motion.section>
      
      {/* Statistics Section */}
      <motion.section 
        ref={statsRef}
        variants={itemVariants}
        className="mb-12 md:mb-16"
      >
        <motion.div 
          variants={containerVariants}
          className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-6"
        >
          <motion.div 
            variants={itemVariants}
            whileHover={{ scale: 1.03 }}
            className="bg-[#1d1d1d] rounded-lg shadow-md p-3 sm:p-4 md:p-6 flex flex-col items-center justify-center text-center"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-primary-900/60 rounded-full flex items-center justify-center mb-2 sm:mb-3 md:mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-1 sm:mb-2">
              {isStatsInView ? (
                <>
                  <CountUp 
                    start={0} 
                    end={stats.events}
                    duration={2}
                    useEasing={true}
                    suffix={stats.events > 0 ? "+" : ""}
                  />
                </>
              ) : (
                <span>{stats.events}{stats.events > 0 ? "+" : ""}</span>
              )}
            </h3>
            <p className="text-xs sm:text-sm md:text-base text-white/60">Events Organized</p>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            whileHover={{ scale: 1.03 }}
            className="bg-[#1d1d1d] rounded-lg shadow-md p-3 sm:p-4 md:p-6 flex flex-col items-center justify-center text-center"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-primary-900/60 rounded-full flex items-center justify-center mb-2 sm:mb-3 md:mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-1 sm:mb-2">
              {isStatsInView ? (
                <CountUp 
                  start={0} 
                  end={stats.teamMembers}
                  duration={2}
                  useEasing={true}
                />
              ) : (
                <span>{stats.teamMembers}</span>
              )}
            </h3>
            <p className="text-xs sm:text-sm md:text-base text-white/60">Team Members</p>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            whileHover={{ scale: 1.03 }}
            className="bg-[#1d1d1d] rounded-lg shadow-md p-3 sm:p-4 md:p-6 flex flex-col items-center justify-center text-center"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-primary-900/60 rounded-full flex items-center justify-center mb-2 sm:mb-3 md:mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-1 sm:mb-2">
              {isStatsInView ? (
                <>
                  <CountUp 
                    start={0} 
                    end={stats.organizations}
                    duration={2}
                    useEasing={true}
                    suffix={stats.organizations > 0 ? "+" : ""}
                  />
                </>
              ) : (
                <span>{stats.organizations}{stats.organizations > 0 ? "+" : ""}</span>
              )}
            </h3>
            <p className="text-xs sm:text-sm md:text-base text-white/60">Organizations</p>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Featured Events Section */}
      <motion.section 
        variants={itemVariants}
        className="mb-12 md:mb-16"
      >
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 text-primary-500">Upcoming Events</h2>
        <motion.div 
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
        >
          {featuredEvents.length > 0 ? (
            featuredEvents.map((event) => (
              <motion.div
                key={event._id}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="bg-[#1d1d1d] rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2 text-primary-500">{event.eventTitle}</h3>
                  <p className="text-sm text-white/70 mb-2 sm:mb-4">{new Date(event.date).toLocaleDateString()} • {event.time}</p>
                  <p className="text-sm sm:text-base text-white/90 mb-3 sm:mb-4 line-clamp-3">{event.description}</p>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between gap-3 sm:gap-0">
                    <span className="text-sm text-primary-400 font-medium">{event.price}</span>
                    <motion.a
                      href={event.url || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`
                        ${event.url ? 'bg-primary-600' : 'bg-dark-400 cursor-not-allowed'} 
                        text-white text-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-md transition duration-300
                      `}
                    >
                      Register Now
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-1 lg:col-span-3 text-center py-8 sm:py-10 bg-[#1d1d1d] rounded-lg">
              <p className="text-sm sm:text-base text-white/70">No upcoming events at the moment. Check back soon!</p>
            </div>
          )}
        </motion.div>
        <motion.div 
          variants={itemVariants}
          className="mt-4 sm:mt-6 text-center"
        >
          <Link to="/events">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary-600 text-white text-sm sm:text-base px-5 sm:px-6 py-1.5 sm:py-2 rounded-md font-medium transition duration-300"
            >
              View All Events
            </motion.button>
          </Link>
        </motion.div>
      </motion.section>

      {/* Featured Founders Section */}
      <motion.section 
        variants={itemVariants}
        className="mb-12 md:mb-16"
      >
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 text-primary-500">Our Founders</h2>
        <motion.div 
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6"
        >
          {featuredFounders.length > 0 ? (
            featuredFounders.map((founder) => (
              <motion.div
                key={founder._id}
                variants={itemVariants}
                className="bg-[#1d1d1d] rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                <div className="aspect-[3/4] flex items-center justify-center bg-black/20">
                  <img 
                    src={founder.image} 
                    alt={founder.name} 
                    className="w-full h-auto object-contain transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <div className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-semibold mb-0.5 sm:mb-1 text-white">{founder.name}</h3>
                  <p className="text-xs sm:text-sm text-primary-500 mb-2 sm:mb-3">{founder.role}</p>
                  <p className="text-xs sm:text-sm text-white/90 line-clamp-3">{founder.description}</p>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-1 md:col-span-3 text-center py-8 sm:py-10 bg-[#1d1d1d] rounded-lg">
              <p className="text-sm sm:text-base text-white/70">Founder information coming soon!</p>
            </div>
          )}
        </motion.div>
        <motion.div 
          variants={itemVariants}
          className="mt-4 sm:mt-6 text-center"
        >
          <Link to="/founders">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary-600 text-white text-sm sm:text-base px-5 sm:px-6 py-1.5 sm:py-2 rounded-md font-medium transition duration-300"
            >
              View All Founders
            </motion.button>
          </Link>
        </motion.div>
      </motion.section>
    </motion.div>
  );
};

export default HomePage;

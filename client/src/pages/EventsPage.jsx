import { motion } from 'framer-motion';
import { HashLoader } from 'react-spinners';
import { format } from 'date-fns';
import { useAppContext } from '../context/AppContext';

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

const EventsPage = () => {
  // Use the shared context instead of local state
  const { events, loading, error, refreshEvents } = useAppContext();

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <HashLoader color="#ff3333" size={60} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-primary-500 mb-4">{error}</h2>
        <button 
          onClick={() => window.location.reload()} 
          className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-2 rounded-lg"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="container mx-auto px-4 py-8"
    >
      {/* Hero Section */}
      <motion.section 
        variants={itemVariants}
        className="mb-12"
      >
        <motion.div
          className="bg-[#181818] rounded-2xl p-8 md:p-12 shadow-md text-white"
        >
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Tech Tribe Events</h1>
          <p className="text-lg md:text-xl mb-6">
            Join our upcoming workshops, meetups, hackathons, and conferences
          </p>
        </motion.div>
      </motion.section>

      {/* Events Section */}
      <motion.section
        variants={itemVariants}
      >
        <motion.div 
          variants={itemVariants}
          className="mb-8 flex flex-wrap items-center justify-between"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-primary-500">Upcoming Events</h2>
          <div className="flex space-x-2 mt-4 sm:mt-0">
            {/* Filter buttons could be added here */}
          </div>
        </motion.div>

        {events.length === 0 ? (
          <motion.div 
            variants={itemVariants}
            className="text-center py-12 bg-[#1d1d1d] rounded-lg"
          >
            <h3 className="text-xl text-white/80">No events scheduled at the moment.</h3>
            <p className="mt-2 text-white/60">Check back soon for upcoming events!</p>
          </motion.div>
        ) : (
          <motion.div 
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {events.map((event, index) => (
              <motion.div
                key={event._id}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="bg-[#1d1d1d] rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3 sm:mb-4">
                    <div>
                      <h3 className="text-lg sm:text-xl font-semibold text-primary-500">{event.eventTitle}</h3>
                      <p className="text-primary-400 text-sm mt-1">
                        {format(new Date(event.date), 'MMMM dd, yyyy')} • {event.time}
                      </p>
                    </div>
                    <span className="bg-primary-900 text-primary-200 text-xs sm:text-sm font-medium px-2 sm:px-3 py-1 rounded-full border border-primary-700 mt-2 sm:mt-0 self-start">
                      {event.price}
                    </span>
                  </div>

                  <p className="text-white/80 text-sm mb-4 sm:mb-6 line-clamp-3">{event.description}</p>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
                    <div className="flex items-center text-white/70 text-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="truncate">{event.location}</span>
                    </div>
                    <motion.a
                      href={event.url || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`
                        ${event.url ? 'bg-primary-500 hover:bg-primary-600' : 'bg-dark-200 cursor-not-allowed'} 
                        text-white px-4 py-2 rounded-lg transition duration-300
                      `}
                    >
                      Register Now
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </motion.section>
    </motion.div>
  );
};

export default EventsPage;

import { motion } from 'framer-motion';
import { HashLoader } from 'react-spinners';
import { useAppContext } from '../context/AppContext';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
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

const FoundersPage = () => {
  // Use the shared context instead of local state
  const { founders, loading, error, refreshFounders } = useAppContext();

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
          className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg"
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
          className="bg-[#181818] rounded-2xl p-8 md:p-12 shadow-md text-white text-center"
        >
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Meet Our Founders</h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto">
            The visionaries who created Tech Tribe and lead our growing community
          </p>
        </motion.div>
      </motion.section>

      {/* Founders Grid Section */}
      <motion.section 
        variants={itemVariants}
      >
        {founders.length === 0 ? (
          <motion.div 
            variants={itemVariants}
            className="text-center py-12 bg-[#1d1d1d] rounded-lg"
          >
            <h3 className="text-xl text-white/80">No founder information available.</h3>
            <p className="mt-2 text-white/60">Check back soon for updates!</p>
          </motion.div>
        ) : (
          <motion.div 
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {founders.map((founder, index) => (
              <motion.div
                key={founder._id}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="bg-[#1d1d1d] rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="relative overflow-hidden group">
                  <div className="aspect-[3/4] flex items-center justify-center bg-black/20">
                    <img 
                      src={founder.image} 
                      alt={founder.name} 
                      className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <p className="text-white text-sm">
                        {founder.description}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white">{founder.name}</h3>
                  <p className="text-primary-500 mt-1">{founder.role}</p>
                  
                  <div className="mt-6 flex space-x-4">
                    <motion.a 
                      href="#" 
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="text-white/70 hover:text-primary-500"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    </motion.a>
                    <motion.a 
                      href="#" 
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="text-white/70 hover:text-primary-500"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                      </svg>
                    </motion.a>
                    <motion.a 
                      href="#" 
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="text-white/70 hover:text-primary-500"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.21c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z" clipRule="evenodd" />
                      </svg>
                    </motion.a>
                    <motion.a 
                      href="#" 
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="text-white/70 hover:text-primary-500"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
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

export default FoundersPage;

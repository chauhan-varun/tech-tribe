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

const TeamPage = () => {
  // Use the shared context instead of local state
  const { teamMembers, loading, error, refreshTeamMembers } = useAppContext();

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
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Meet Our Team</h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto">
            The dedicated professionals behind Tech Tribe who make our community thrive
          </p>
        </motion.div>
      </motion.section>

      {/* Team Grid Section */}
      <motion.section 
        variants={itemVariants}
        className="mb-16"
      >
        {teamMembers.length === 0 ? (
          <motion.div 
            variants={itemVariants}
            className="text-center py-12 bg-[#1d1d1d] rounded-lg"
          >
            <h3 className="text-xl text-white/80">No team members available at the moment.</h3>
            <p className="mt-2 text-white/60">Check back soon for updates!</p>
          </motion.div>
        ) : (
          <motion.div 
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {teamMembers.map((member, index) => (
              <motion.div
                key={member._id}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="bg-[#1d1d1d] rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                <div className="relative">
                  <img 
                    src={member.image} 
                    alt={member.teamName} 
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 w-full p-4 flex space-x-3 justify-center">
                      <motion.a 
                        href="#" 
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        className="text-white hover:text-primary-400 transition-colors"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                        </svg>
                      </motion.a>
                      <motion.a 
                        href="#" 
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        className="text-white hover:text-blue-400 transition-colors"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                        </svg>
                      </motion.a>
                    </div>
                  </div>
                </div>
                <div className="p-5 text-center">
                  <h3 className="text-lg font-semibold text-white">{member.teamName}</h3>
                  <p className="text-primary-500 mt-1">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </motion.section>

      {/* Join the Team Section */}
      
    </motion.div>
  );
};

export default TeamPage;

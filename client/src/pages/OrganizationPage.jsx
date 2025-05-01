import { motion } from 'framer-motion';
import { HashLoader } from 'react-spinners';
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

const OrganizationPage = () => {
  // Use the shared context instead of local state
  const { organizations, loading, error, refreshOrganizations } = useAppContext();

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
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Partner Organizations</h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto">
            Meet the organizations that collaborate with Tech Tribe to create a thriving tech ecosystem
          </p>
        </motion.div>
      </motion.section>

      {/* Organizations List */}
      <motion.section
        variants={itemVariants}
      >
        {organizations.length === 0 ? (
          <motion.div 
            variants={itemVariants}
            className="text-center py-12 bg-[#1d1d1d] rounded-lg"
          >
            <h3 className="text-xl text-white/80">No organizations available at the moment.</h3>
            <p className="mt-2 text-white/60">Check back soon for updates!</p>
          </motion.div>
        ) : (
          <motion.div 
            variants={containerVariants}
            className="space-y-8"
          >
            {organizations.map((org, index) => (
              <motion.div
                key={org._id}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="bg-[#1d1d1d] rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                <div className="md:flex">
                  <div className="md:w-1/4 lg:w-1/5 h-48 md:h-auto relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/10"></div>
                    <img 
                      src={org.image} 
                      alt={org.title} 
                      className="w-full h-full object-contain md:object-cover"
                    />
                  </div>
                  <div className="md:w-3/4 lg:w-4/5 p-5 md:p-6">
                    <h2 className="text-xl font-bold text-white mb-3">{org.title}</h2>
                    <p className="text-white/80 text-sm mb-4 line-clamp-3 md:line-clamp-none">{org.description}</p>
                    <div className="flex space-x-4">
                      <motion.a
                        href="#"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center text-primary-500 hover:text-primary-400"
                      >
                        
                      </motion.a>
                      <motion.a
                        href="#"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center text-primary-500 hover:text-primary-400"
                      >
                    
                      </motion.a>
                    </div>
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

export default OrganizationPage;

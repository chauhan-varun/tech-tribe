import { motion } from 'framer-motion';

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

const AboutPage = () => {
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
          <h1 className="text-3xl md:text-5xl font-bold mb-4">About Tech Tribe</h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto">
            Empowering the next generation of tech innovators through community, learning, and leadership.
          </p>
        </motion.div>
      </motion.section>

      {/* Our Story Section */}
      <motion.section 
        variants={itemVariants}
        className="mb-16"
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-primary-500">Our Story</h2>
          <div className="bg-[#181818] rounded-lg shadow-md p-6 md:p-8">
            <p className="text-white/80 mb-4">
              Tech Tribe was founded in 2024 with a simple mission: to create a supportive community for tech enthusiasts, 
              professionals, and aspiring developers. What started as a small meetup group has grown into a thriving 
              ecosystem of innovators, mentors, and learners.
            </p>
            <p className="text-white/80 mb-4">
              Our community spans across various domains including software development, data science, artificial intelligence, 
              cybersecurity, and entrepreneurship. We believe in the power of collaboration and knowledge sharing to drive 
              technological advancement.
            </p>
            <p className="text-white/80">
              Today, Tech Tribe hosts regular events, workshops, hackathons, and networking sessions that bring together 
              individuals who are passionate about technology and its potential to solve real-world problems.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Our Mission & Vision Section */}
      <section className="mb-16">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="bg-[#1d1d1d] rounded-lg shadow-md p-6 relative overflow-hidden"
            >
              <div className="absolute top-3 left-3 w-10 h-10 bg-primary-900/60 rounded-full flex items-center justify-center text-primary-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="pl-12">
                <h3 className="text-xl font-semibold mb-4 text-primary-500">Our Mission</h3>
                <p className="text-white/80">
                  To foster a collaborative environment where technology enthusiasts can learn, share knowledge, 
                  and grow together. We aim to bridge the gap between academic learning and industry requirements 
                  by providing practical experiences and mentorship opportunities.
                </p>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="bg-[#1d1d1d] rounded-lg shadow-md p-6 relative overflow-hidden"
            >
              <div className="absolute top-3 left-3 w-10 h-10 bg-primary-900/60 rounded-full flex items-center justify-center text-primary-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div className="pl-12">
                <h3 className="text-xl font-semibold mb-4 text-primary-500">Our Vision</h3>
                <p className="text-white/80">
                  To become the leading tech community that nurtures innovation, promotes diversity in tech, 
                  and creates meaningful impact through technology solutions. We envision a future where everyone 
                  has access to the resources and support needed to thrive in the digital economy.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.5 }}
        className="mb-16"
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-primary-500">Our Core Values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { 
                title: "Technical Workshops", 
                description: "Hands-on sessions covering cutting-edge technologies, programming languages, and development tools.",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                )
              },
              { 
                title: "Hackathons", 
                description: "Competitive coding events where teams collaborate to solve real-world problems through innovative solutions.",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                )
              },
              { 
                title: "Networking", 
                description: "Connect with industry professionals and fellow tech enthusiasts to build meaningful relationships.",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                )
              },
              { 
                title: "Learning Resources", 
                description: "Access to curated learning materials, tutorials, and practice problems for continuous skill development.",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                )
              },
              { 
                title: "Project Collaborations", 
                description: "Find teammates for side projects, hackathons, or research initiatives within our community.",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
                )
              },
              { 
                title: "Industry Connections", 
                description: "Opportunities to connect with leading companies, explore career paths, and discover prospective roles.",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                )
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="bg-[#1d1d1d] rounded-lg shadow-md p-6 relative overflow-hidden"
              >
                <div className="absolute top-3 left-3 w-10 h-10 bg-primary-900/60 rounded-full flex items-center justify-center text-primary-500">
                  {value.icon}
                </div>
                <div className="pl-12">
                  <h3 className="text-lg font-semibold mb-2 text-primary-500">{value.title}</h3>
                  <p className="text-white/80">{value.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Join Us Section */}
      <section>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="bg-[#181818] rounded-2xl p-6 sm:p-8 md:p-12 shadow-md text-center max-w-4xl mx-auto"
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 text-primary-500">Our Community</h2>
          <p className="text-white/80 text-sm sm:text-base mb-6 sm:mb-8">
            Whether you're a seasoned professional or just starting out in tech, there's a place for you in our community.
            Join us to learn, connect, and grow together.
          </p>
          <motion.a 
            href="https://chat.whatsapp.com/I6YpsX5z3GP6oKlGGw26ka"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ 
              scale: 1.05, 
              boxShadow: "0 10px 25px -5px rgba(255, 51, 51, 0.4)"
            }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-primary-600 to-primary-500 text-white px-10 py-4 rounded-lg font-semibold shadow-lg transition duration-300 inline-flex items-center justify-center space-x-2 hover:from-primary-500 hover:to-primary-600 transform hover:-translate-y-1"
          >
            <span>Join us on Whatsapp</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.a>
        </motion.div>
      </section>
    </motion.div>
  );
};

export default AboutPage;

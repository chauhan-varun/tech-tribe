import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { getOrganizations, getTeamMembers, getEvents, getFounders } from '../utils/api';

// Hero Section Styles
const HeroSection = styled.section`
  height: 90vh;
  display: flex;
  align-items: center;
  position: relative;
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.9)), url('/hero-bg.jpg');
  background-size: cover;
  background-position: center;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 150px;
    background: linear-gradient(to top, var(--primary-color), transparent);
  }
`;

const HeroContent = styled.div`
  text-align: center;
  z-index: 10;
  max-width: 800px;
  margin: 0 auto;
  padding: 0 20px;
  
  h1 {
    font-size: 3.5rem;
    margin-bottom: 1.5rem;
    font-weight: 700;
    
    span {
      color: var(--accent-color);
    }
  }
  
  p {
    font-size: 1.2rem;
    margin-bottom: 2.5rem;
    color: rgba(255, 255, 255, 0.8);
  }
  
  .cta-buttons {
    display: flex;
    gap: 1rem;
    justify-content: center;
    
    @media (max-width: 768px) {
      flex-direction: column;
      align-items: center;
    }
  }
  
  .secondary-btn {
    background-color: transparent;
    border: 2px solid var(--accent-color);
    
    &:hover {
      background-color: var(--accent-color);
    }
  }
`;

// About Section Styles
const AboutSection = styled.section`
  padding: 100px 0;
`;

const AboutGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const AboutImage = styled.div`
  img {
    width: 100%;
    border-radius: 10px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  }
`;

const AboutContent = styled.div`
  h2 {
    font-size: 2.5rem;
    margin-bottom: 1.5rem;
    
    span {
      color: var(--accent-color);
    }
  }
  
  p {
    margin-bottom: 1.5rem;
    color: rgba(255, 255, 255, 0.8);
  }
  
  .about-stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    margin-top: 2rem;
    
    .stat {
      text-align: center;
      padding: 1.5rem;
      background-color: var(--card-bg);
      border-radius: 8px;
      
      .number {
        font-size: 2.5rem;
        font-weight: 700;
        color: var(--accent-color);
      }
      
      .label {
        font-size: 0.9rem;
        color: rgba(255, 255, 255, 0.7);
      }
    }
  }
`;

// Team Preview Styles
const TeamPreview = styled.section`
  padding: 100px 0;
  background-color: var(--secondary-bg);
`;

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const TeamCard = styled.div`
  background-color: var(--card-bg);
  border-radius: 10px;
  overflow: hidden;
  transition: var(--transition);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
  }
  
  .image-container {
    height: 250px;
    overflow: hidden;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: var(--transition);
    }
  }
  
  &:hover .image-container img {
    transform: scale(1.1);
  }
  
  .content {
    padding: 1.5rem;
    text-align: center;
    
    h3 {
      margin-bottom: 0.5rem;
    }
    
    .role {
      color: var(--accent-color);
      font-size: 0.9rem;
      margin-bottom: 1rem;
    }
  }
`;

// Events Preview Styles
const EventsPreview = styled.section`
  padding: 100px 0;
`;

const EventGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const EventCard = styled.div`
  background-color: var(--card-bg);
  border-radius: 10px;
  overflow: hidden;
  transition: var(--transition);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
  }
  
  .content {
    padding: 1.5rem;
    
    h3 {
      margin-bottom: 1rem;
    }
    
    .event-details {
      margin-bottom: 1.5rem;
      
      p {
        display: flex;
        align-items: center;
        margin-bottom: 0.7rem;
        font-size: 0.9rem;
        color: rgba(255, 255, 255, 0.8);
        
        svg {
          margin-right: 10px;
          color: var(--accent-color);
        }
      }
    }
    
    .event-description {
      margin-bottom: 1.5rem;
      color: rgba(255, 255, 255, 0.8);
      font-size: 0.9rem;
    }
    
    .price {
      display: inline-block;
      padding: 0.5rem 1rem;
      background-color: rgba(255, 0, 0, 0.2);
      color: var(--accent-color);
      border-radius: 4px;
      font-weight: 600;
      margin-bottom: 1.5rem;
    }
  }
`;

// Founders Preview Styles
const FoundersPreview = styled.section`
  padding: 100px 0;
  background-color: var(--secondary-bg);
`;

const FounderGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const FounderCard = styled.div`
  background-color: var(--card-bg);
  border-radius: 10px;
  overflow: hidden;
  transition: var(--transition);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
  }
  
  .image-container {
    height: 280px;
    overflow: hidden;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: var(--transition);
    }
  }
  
  &:hover .image-container img {
    transform: scale(1.1);
  }
  
  .content {
    padding: 1.5rem;
    
    h3 {
      margin-bottom: 0.5rem;
    }
    
    .role {
      color: var(--accent-color);
      font-size: 0.9rem;
      margin-bottom: 1rem;
    }
    
    p {
      color: rgba(255, 255, 255, 0.8);
      font-size: 0.9rem;
    }
  }
`;

// CTA Section Styles
const CtaSection = styled.section`
  padding: 80px 0;
  text-align: center;
  background: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url('/cta-bg.jpg');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  
  h2 {
    font-size: 2.5rem;
    margin-bottom: 1.5rem;
  }
  
  p {
    max-width: 600px;
    margin: 0 auto 2rem;
    color: rgba(255, 255, 255, 0.8);
  }
`;

// Home Page Component
const HomePage = () => {
  const [organization, setOrganization] = useState(null);
  const [teamMembers, setTeamMembers] = useState([]);
  const [events, setEvents] = useState([]);
  const [founders, setFounders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch all data in parallel
        const [orgsData, teamData, eventsData, foundersData] = await Promise.all([
          getOrganizations(),
          getTeamMembers(),
          getEvents(),
          getFounders(),
        ]);
        
        setOrganization(orgsData.length > 0 ? orgsData[0] : null);
        setTeamMembers(teamData.slice(0, 4)); // Show only 4 team members on home page
        setEvents(eventsData.slice(0, 3)); // Show only 3 events on home page
        setFounders(foundersData.slice(0, 3)); // Show only 3 founders on home page
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load content. Please try again later.');
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  if (loading) {
    return (
      <div className="container" style={{ padding: '100px 0', textAlign: 'center' }}>
        <h2>Loading...</h2>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="container" style={{ padding: '100px 0', textAlign: 'center' }}>
        <h2>Error</h2>
        <p>{error}</p>
      </div>
    );
  }
  
  return (
    <>
      {/* Hero Section */}
      <HeroSection>
        <HeroContent>
          <h1>Welcome to Tech<span>Tribe</span></h1>
          <p>
            Join our vibrant community of tech enthusiasts, innovators, and creators.
            Together, we build, learn, and grow in the ever-evolving world of technology.
          </p>
          <div className="cta-buttons">
            <Link to="/events" className="btn">Upcoming Events</Link>
            <Link to="/team" className="btn secondary-btn">Meet Our Team</Link>
          </div>
        </HeroContent>
      </HeroSection>
      
      {/* About Section */}
      {organization && (
        <AboutSection>
          <div className="container">
            <AboutGrid>
              <AboutImage>
                <img src={organization.image} alt={organization.title} />
              </AboutImage>
              <AboutContent>
                <h2>About <span>Us</span></h2>
                <p>{organization.description}</p>
                <div className="about-stats">
                  <div className="stat">
                    <div className="number">{teamMembers.length}+</div>
                    <div className="label">Team Members</div>
                  </div>
                  <div className="stat">
                    <div className="number">{events.length}+</div>
                    <div className="label">Events</div>
                  </div>
                  <div className="stat">
                    <div className="number">{founders.length}</div>
                    <div className="label">Founders</div>
                  </div>
                </div>
                <Link to="/about" className="btn">Learn More</Link>
              </AboutContent>
            </AboutGrid>
          </div>
        </AboutSection>
      )}
      
      {/* Team Preview Section */}
      {teamMembers.length > 0 && (
        <TeamPreview>
          <div className="container">
            <h2 className="section-title">Our Team</h2>
            <TeamGrid>
              {teamMembers.map((member) => (
                <TeamCard key={member._id}>
                  <div className="image-container">
                    <img src={member.image} alt={member.teamName} />
                  </div>
                  <div className="content">
                    <h3>{member.teamName}</h3>
                    <p className="role">{member.role}</p>
                  </div>
                </TeamCard>
              ))}
            </TeamGrid>
            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
              <Link to="/team" className="btn">View All Team Members</Link>
            </div>
          </div>
        </TeamPreview>
      )}
      
      {/* Events Preview Section */}
      {events.length > 0 && (
        <EventsPreview>
          <div className="container">
            <h2 className="section-title">Upcoming Events</h2>
            <EventGrid>
              {events.map((event) => (
                <EventCard key={event._id}>
                  <div className="content">
                    <h3>{event.eventTitle}</h3>
                    <div className="event-details">
                      <p><span role="img" aria-label="calendar">📅</span> {formatDate(event.date)}</p>
                      <p><span role="img" aria-label="time">⏰</span> {event.time}</p>
                      <p><span role="img" aria-label="location">📍</span> {event.location}</p>
                    </div>
                    <div className="price">{event.price}</div>
                    <div className="event-description">
                      <p>{event.description.length > 150 
                        ? `${event.description.substring(0, 150)}...` 
                        : event.description}</p>
                    </div>
                    <Link to={`/events/${event._id}`} className="btn">View Details</Link>
                  </div>
                </EventCard>
              ))}
            </EventGrid>
            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
              <Link to="/events" className="btn">View All Events</Link>
            </div>
          </div>
        </EventsPreview>
      )}
      
      {/* Founders Preview Section */}
      {founders.length > 0 && (
        <FoundersPreview>
          <div className="container">
            <h2 className="section-title">Our Founders</h2>
            <FounderGrid>
              {founders.map((founder) => (
                <FounderCard key={founder._id}>
                  <div className="image-container">
                    <img src={founder.image} alt={founder.name} />
                  </div>
                  <div className="content">
                    <h3>{founder.name}</h3>
                    <p className="role">{founder.role}</p>
                    {founder.description && (
                      <p>{founder.description.length > 100 
                        ? `${founder.description.substring(0, 100)}...` 
                        : founder.description}</p>
                    )}
                  </div>
                </FounderCard>
              ))}
            </FounderGrid>
            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
              <Link to="/founders" className="btn">Meet All Founders</Link>
            </div>
          </div>
        </FoundersPreview>
      )}
      
      {/* CTA Section */}
      <CtaSection>
        <div className="container">
          <h2>Ready to Join Our Community?</h2>
          <p>
            Stay updated with our latest events, workshops, and community activities.
            Join us today and be part of the tech revolution.
          </p>
          <Link to="/events" className="btn">Join Upcoming Event</Link>
        </div>
      </CtaSection>
    </>
  );
};

export default HomePage;

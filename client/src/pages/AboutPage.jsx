import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getOrganizations } from '../utils/api';

const AboutPageContainer = styled.div`
  padding: 80px 0;
`;

const Banner = styled.div`
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.9)), url('/about-banner.jpg');
  background-size: cover;
  background-position: center;
  padding: 100px 0;
  text-align: center;
  margin-bottom: 60px;
  
  h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
    
    span {
      color: var(--accent-color);
    }
  }
  
  p {
    max-width: 700px;
    margin: 0 auto;
    color: rgba(255, 255, 255, 0.8);
  }
`;

const AboutSection = styled.section`
  padding: 60px 0;
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
  
  @media (max-width: 768px) {
    grid-row: 1;
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
    line-height: 1.8;
  }
`;

const MissionSection = styled.section`
  padding: 60px 0;
  background-color: var(--secondary-bg);
`;

const MissionContent = styled.div`
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
  
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
    line-height: 1.8;
  }
`;

const ValuesSection = styled.section`
  padding: 60px 0;
`;

const ValueGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const ValueCard = styled.div`
  background-color: var(--card-bg);
  border-radius: 10px;
  padding: 2rem;
  transition: var(--transition);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
  }
  
  .icon {
    font-size: 3rem;
    color: var(--accent-color);
    margin-bottom: 1.5rem;
  }
  
  h3 {
    margin-bottom: 1rem;
    font-size: 1.5rem;
  }
  
  p {
    color: rgba(255, 255, 255, 0.8);
    line-height: 1.6;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
  
  .spinner {
    border: 5px solid rgba(255, 255, 255, 0.1);
    border-top: 5px solid var(--accent-color);
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const ErrorContainer = styled.div`
  text-align: center;
  padding: 50px 0;
  
  h2 {
    color: var(--accent-color);
    margin-bottom: 1rem;
  }
  
  p {
    margin-bottom: 2rem;
  }
`;

const AboutPage = () => {
  const [organization, setOrganization] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchOrganization = async () => {
      try {
        setLoading(true);
        const data = await getOrganizations();
        setOrganization(data.length > 0 ? data[0] : null);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching organization:', err);
        setError('Failed to load organization info. Please try again later.');
        setLoading(false);
      }
    };
    
    fetchOrganization();
  }, []);
  
  if (loading) {
    return (
      <AboutPageContainer>
        <div className="container">
          <LoadingContainer>
            <div className="spinner"></div>
          </LoadingContainer>
        </div>
      </AboutPageContainer>
    );
  }
  
  if (error || !organization) {
    return (
      <AboutPageContainer>
        <div className="container">
          <ErrorContainer>
            <h2>Oops!</h2>
            <p>{error || 'Organization information not found.'}</p>
            <button onClick={() => window.location.reload()} className="btn">Try Again</button>
          </ErrorContainer>
        </div>
      </AboutPageContainer>
    );
  }
  
  return (
    <AboutPageContainer>
      <Banner>
        <div className="container">
          <h1>About <span>Us</span></h1>
          <p>
            Learn more about our mission, values, and the story behind Tech Tribe.
          </p>
        </div>
      </Banner>
      
      <AboutSection>
        <div className="container">
          <AboutGrid>
            <AboutImage>
              <img src={organization.image} alt={organization.title} />
            </AboutImage>
            <AboutContent>
              <h2>Our <span>Story</span></h2>
              <p>{organization.description}</p>
              <p>
                Founded with a vision to create a thriving tech community, Tech Tribe has grown
                into a platform that connects innovators, learners, and industry experts.
                We believe in the power of collaboration and knowledge sharing to drive
                technological advancement and personal growth.
              </p>
            </AboutContent>
          </AboutGrid>
        </div>
      </AboutSection>
      
      <MissionSection>
        <div className="container">
          <MissionContent>
            <h2>Our <span>Mission</span></h2>
            <p>
              To foster a vibrant community that empowers individuals through technology,
              innovation, and collaboration. We strive to create an inclusive environment
              where members can learn, grow, and contribute to the ever-evolving tech landscape.
            </p>
            <p>
              Through our events, workshops, and networking opportunities, we aim to bridge
              the gap between theory and practice, connecting talented individuals with
              real-world challenges and opportunities.
            </p>
          </MissionContent>
        </div>
      </MissionSection>
      
      <ValuesSection>
        <div className="container">
          <h2 className="section-title">Our <span>Values</span></h2>
          
          <ValueGrid>
            <ValueCard>
              <div className="icon">🔍</div>
              <h3>Innovation</h3>
              <p>
                We embrace creative thinking and continuously seek new approaches to
                solve problems and drive technological advancement.
              </p>
            </ValueCard>
            
            <ValueCard>
              <div className="icon">🤝</div>
              <h3>Collaboration</h3>
              <p>
                We believe in the power of teamwork and collective intelligence to
                achieve greater outcomes than what can be accomplished individually.
              </p>
            </ValueCard>
            
            <ValueCard>
              <div className="icon">📚</div>
              <h3>Continuous Learning</h3>
              <p>
                We foster a culture of lifelong learning, encouraging our members to
                stay curious, adaptable, and open to new ideas and technologies.
              </p>
            </ValueCard>
            
            <ValueCard>
              <div className="icon">🌍</div>
              <h3>Inclusivity</h3>
              <p>
                We champion diversity and ensure that our community is accessible and
                welcoming to individuals from all backgrounds and skill levels.
              </p>
            </ValueCard>
            
            <ValueCard>
              <div className="icon">🚀</div>
              <h3>Excellence</h3>
              <p>
                We strive for the highest standards in everything we do, from the quality
                of our events to the impact of our community initiatives.
              </p>
            </ValueCard>
            
            <ValueCard>
              <div className="icon">💡</div>
              <h3>Impact</h3>
              <p>
                We are committed to making a positive difference in the tech ecosystem
                and empowering individuals to create meaningful change through technology.
              </p>
            </ValueCard>
          </ValueGrid>
        </div>
      </ValuesSection>
    </AboutPageContainer>
  );
};

export default AboutPage;

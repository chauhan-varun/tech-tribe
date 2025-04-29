import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getTeamMembers } from '../utils/api';

const TeamPageContainer = styled.div`
  padding: 80px 0;
`;

const Banner = styled.div`
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.9)), url('/team-banner.jpg');
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

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
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
    height: 300px;
    overflow: hidden;
    position: relative;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: var(--transition);
    }
    
    .overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
      opacity: 0;
      transition: var(--transition);
      display: flex;
      align-items: flex-end;
      padding: 20px;
    }
  }
  
  &:hover .image-container img {
    transform: scale(1.1);
  }
  
  &:hover .image-container .overlay {
    opacity: 1;
  }
  
  .content {
    padding: 1.5rem;
    text-align: center;
    
    h3 {
      margin-bottom: 0.5rem;
      font-size: 1.5rem;
    }
    
    .role {
      color: var(--accent-color);
      font-size: 1rem;
      margin-bottom: 1rem;
      font-weight: 500;
    }
    
    .divider {
      width: 60px;
      height: 3px;
      background-color: var(--accent-color);
      margin: 0 auto 1rem;
    }
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

const TeamPage = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        setLoading(true);
        const data = await getTeamMembers();
        setTeamMembers(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching team members:', err);
        setError('Failed to load team members. Please try again later.');
        setLoading(false);
      }
    };
    
    fetchTeamMembers();
  }, []);
  
  if (loading) {
    return (
      <TeamPageContainer>
        <div className="container">
          <LoadingContainer>
            <div className="spinner"></div>
          </LoadingContainer>
        </div>
      </TeamPageContainer>
    );
  }
  
  if (error) {
    return (
      <TeamPageContainer>
        <div className="container">
          <ErrorContainer>
            <h2>Oops!</h2>
            <p>{error}</p>
            <button onClick={() => window.location.reload()} className="btn">Try Again</button>
          </ErrorContainer>
        </div>
      </TeamPageContainer>
    );
  }
  
  return (
    <TeamPageContainer>
      <Banner>
        <div className="container">
          <h1>Our <span>Team</span></h1>
          <p>
            Meet the talented individuals who make our community thrive. Our team is 
            composed of passionate tech experts, innovators, and community builders.
          </p>
        </div>
      </Banner>
      
      <div className="container">
        <TeamGrid>
          {teamMembers.map((member) => (
            <TeamCard key={member._id}>
              <div className="image-container">
                <img src={member.image} alt={member.teamName} />
                <div className="overlay"></div>
              </div>
              <div className="content">
                <h3>{member.teamName}</h3>
                <div className="role">{member.role}</div>
                <div className="divider"></div>
              </div>
            </TeamCard>
          ))}
        </TeamGrid>
      </div>
    </TeamPageContainer>
  );
};

export default TeamPage;

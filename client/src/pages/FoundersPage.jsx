import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getFounders } from '../utils/api';
import { FaLinkedin, FaTwitter, FaGithub } from 'react-icons/fa';

const FoundersPageContainer = styled.div`
  padding: 80px 0;
`;

const Banner = styled.div`
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.9)), url('/founders-banner.jpg');
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

const FoundersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 3rem;
`;

const FounderCard = styled.div`
  background-color: var(--card-bg);
  border-radius: 15px;
  overflow: hidden;
  transition: var(--transition);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  }
  
  .image-container {
    height: 350px;
    position: relative;
    overflow: hidden;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: var(--transition);
    }
    
    .social-links {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
      padding: 20px;
      display: flex;
      justify-content: center;
      gap: 15px;
      transform: translateY(100%);
      transition: var(--transition);
      
      a {
        background-color: var(--accent-color);
        color: var(--text-color);
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: var(--transition);
        
        &:hover {
          background-color: var(--text-color);
          color: var(--accent-color);
          transform: translateY(-5px);
        }
      }
    }
  }
  
  &:hover .image-container img {
    transform: scale(1.1);
  }
  
  &:hover .image-container .social-links {
    transform: translateY(0);
  }
  
  .content {
    padding: 2rem;
    
    h3 {
      font-size: 1.5rem;
      margin-bottom: 0.5rem;
    }
    
    .role {
      color: var(--accent-color);
      font-size: 1rem;
      margin-bottom: 1rem;
      font-weight: 500;
    }
    
    .divider {
      height: 3px;
      width: 60px;
      background-color: var(--accent-color);
      margin-bottom: 1.5rem;
    }
    
    .description {
      color: rgba(255, 255, 255, 0.8);
      line-height: 1.6;
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

const FoundersPage = () => {
  const [founders, setFounders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchFounders = async () => {
      try {
        setLoading(true);
        const data = await getFounders();
        setFounders(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching founders:', err);
        setError('Failed to load founders. Please try again later.');
        setLoading(false);
      }
    };
    
    fetchFounders();
  }, []);
  
  if (loading) {
    return (
      <FoundersPageContainer>
        <div className="container">
          <LoadingContainer>
            <div className="spinner"></div>
          </LoadingContainer>
        </div>
      </FoundersPageContainer>
    );
  }
  
  if (error) {
    return (
      <FoundersPageContainer>
        <div className="container">
          <ErrorContainer>
            <h2>Oops!</h2>
            <p>{error}</p>
            <button onClick={() => window.location.reload()} className="btn">Try Again</button>
          </ErrorContainer>
        </div>
      </FoundersPageContainer>
    );
  }
  
  return (
    <FoundersPageContainer>
      <Banner>
        <div className="container">
          <h1>Our <span>Founders</span></h1>
          <p>
            Meet the visionary leaders who established Tech Tribe with a mission to 
            create a thriving community of tech innovators and enthusiasts.
          </p>
        </div>
      </Banner>
      
      <div className="container">
        <FoundersGrid>
          {founders.map((founder) => (
            <FounderCard key={founder._id}>
              <div className="image-container">
                <img src={founder.image} alt={founder.name} />
                <div className="social-links">
                  <a href="#" aria-label="LinkedIn">
                    <FaLinkedin />
                  </a>
                  <a href="#" aria-label="Twitter">
                    <FaTwitter />
                  </a>
                  <a href="#" aria-label="GitHub">
                    <FaGithub />
                  </a>
                </div>
              </div>
              <div className="content">
                <h3>{founder.name}</h3>
                <div className="role">{founder.role}</div>
                <div className="divider"></div>
                <p className="description">{founder.description}</p>
              </div>
            </FounderCard>
          ))}
        </FoundersGrid>
      </div>
    </FoundersPageContainer>
  );
};

export default FoundersPage;

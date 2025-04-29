import { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaBuilding } from 'react-icons/fa';

const OrganizationContainer = styled.section`
  padding: 4rem 0;
`;

const PageTitle = styled.h1`
  text-align: center;
  margin-bottom: 3rem;
  font-size: 2.5rem;
  
  span {
    color: var(--accent-color);
  }
`;

const OrganizationCard = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  background-color: var(--secondary-color);
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ImageContainer = styled.div`
  height: 400px;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
    
    &:hover {
      transform: scale(1.05);
    }
  }
`;

const ContentContainer = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  
  h2 {
    font-size: 2rem;
    margin-bottom: 1.5rem;
    display: flex;
    align-items: center;
    
    svg {
      margin-right: 0.8rem;
      color: var(--accent-color);
    }
  }
  
  p {
    line-height: 1.8;
    color: rgba(255, 255, 255, 0.9);
    margin-bottom: 1.5rem;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
  
  .loader {
    border: 4px solid rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    border-top: 4px solid var(--accent-color);
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
  padding: 3rem;
  border-radius: 10px;
  background-color: var(--secondary-color);
  margin-bottom: 2rem;
  
  h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: var(--danger-color);
  }
  
  p {
    margin-bottom: 1.5rem;
    color: rgba(255, 255, 255, 0.7);
  }
  
  button {
    background-color: var(--accent-color);
    color: var(--text-color);
    border: none;
    padding: 0.8rem 1.5rem;
    border-radius: 5px;
    cursor: pointer;
    font-weight: 600;
    transition: var(--transition);
    
    &:hover {
      background-color: #cc0000;
    }
  }
`;

const NoOrganizationContainer = styled.div`
  text-align: center;
  padding: 3rem;
  border-radius: 10px;
  background-color: var(--secondary-color);
  
  h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: var(--accent-color);
  }
  
  p {
    color: rgba(255, 255, 255, 0.7);
  }
`;

const OrganizationPage = () => {
  const [organization, setOrganization] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    fetchOrganization();
  }, []);
  
  const fetchOrganization = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/organizations');
      if (response.data && response.data.length > 0) {
        setOrganization(response.data[0]);
      } else {
        setOrganization(null);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching organization:', error);
      setError('Failed to fetch organization information. Please try again later.');
      setLoading(false);
      toast.error('Failed to load organization information');
    }
  };
  
  if (loading) {
    return (
      <OrganizationContainer>
        <div className="container">
          <PageTitle>Our <span>Organization</span></PageTitle>
          <LoadingContainer>
            <div className="loader"></div>
          </LoadingContainer>
        </div>
      </OrganizationContainer>
    );
  }
  
  if (error) {
    return (
      <OrganizationContainer>
        <div className="container">
          <PageTitle>Our <span>Organization</span></PageTitle>
          <ErrorContainer>
            <h3>Something went wrong</h3>
            <p>{error}</p>
            <button onClick={fetchOrganization}>Try Again</button>
          </ErrorContainer>
        </div>
      </OrganizationContainer>
    );
  }
  
  if (!organization) {
    return (
      <OrganizationContainer>
        <div className="container">
          <PageTitle>Our <span>Organization</span></PageTitle>
          <NoOrganizationContainer>
            <h3>Organization Information Coming Soon</h3>
            <p>We're currently updating our organization information. Please check back later.</p>
          </NoOrganizationContainer>
        </div>
      </OrganizationContainer>
    );
  }
  
  return (
    <OrganizationContainer>
      <div className="container">
        <PageTitle>Our <span>Organization</span></PageTitle>
        <OrganizationCard>
          <ImageContainer>
            <img src={organization.image} alt={organization.title} />
          </ImageContainer>
          <ContentContainer>
            <h2>
              <FaBuilding />
              {organization.title}
            </h2>
            <p>{organization.description}</p>
          </ContentContainer>
        </OrganizationCard>
      </div>
    </OrganizationContainer>
  );
};

export default OrganizationPage;

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { getOrganizations, deleteOrganization } from '../utils/api';
import { FaPlus, FaEdit, FaTrash, FaBuilding } from 'react-icons/fa';

const OrganizationContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  
  @media (max-width: 576px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
    
    a, button {
      width: 100%;
    }
  }
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  
  @media (max-width: 576px) {
    font-size: 1.2rem;
  }
`;

const Button = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background-color: var(--accent-color);
  color: white;
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: var(--transition);
  font-weight: 500;
  
  &:hover {
    background-color: var(--accent-hover);
  }
  
  @media (max-width: 576px) {
    padding: 0.7rem 1.2rem;
    justify-content: center;
  }
`;

const OrganizationCard = styled.div`
  background-color: var(--card-bg);
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const CardHeader = styled.div`
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  
  h2 {
    display: flex;
    align-items: center;
    font-size: 1.2rem;
    
    @media (max-width: 576px) {
      font-size: 1rem;
    }
    
    svg {
      margin-right: 0.8rem;
      color: var(--accent-color);
    }
  }
  
  .actions {
    display: flex;
    gap: 0.5rem;
  }
`;

const CardContent = styled.div`
  padding: 1.5rem;
  display: flex;
  gap: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    padding: 1rem;
    gap: 1.5rem;
  }
`;

const ImageContainer = styled.div`
  width: 300px;
  height: 200px;
  border-radius: 8px;
  overflow: hidden;
  background-color: var(--secondary-bg);
  
  @media (max-width: 992px) {
    width: 250px;
    height: 180px;
  }
  
  @media (max-width: 768px) {
    width: 100%;
    height: 200px;
  }
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const OrganizationDetails = styled.div`
  flex: 1;
  
  h3 {
    margin-bottom: 1rem;
    font-size: 1.2rem;
    
    @media (max-width: 576px) {
      font-size: 1.1rem;
      margin-bottom: 0.5rem;
    }
  }
  
  p {
    color: rgba(255, 255, 255, 0.8);
    line-height: 1.6;
    font-size: 0.95rem;
    
    @media (max-width: 576px) {
      font-size: 0.9rem;
    }
  }
`;

const ActionButton = styled.button`
  background-color: ${({ color }) => color || 'var(--accent-color)'};
  color: var(--text-color);
  border: none;
  border-radius: 4px;
  padding: 0.5rem;
  cursor: pointer;
  transition: var(--transition);
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    opacity: 0.85;
    transform: translateY(-2px);
  }
`;

const OrganizationPage = () => {
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchOrganizations();
  }, []);

  const fetchOrganizations = async () => {
    try {
      setLoading(true);
      const data = await getOrganizations();
      setOrganizations(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching organizations:', error);
      toast.error('Failed to load organizations');
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this organization?')) {
      try {
        setDeleting(true);
        await deleteOrganization(id);
        setDeleting(false);
        toast.success('Organization deleted successfully');
        fetchOrganizations();
      } catch (error) {
        console.error('Error deleting organization:', error);
        toast.error('Failed to delete organization');
        setDeleting(false);
      }
    }
  };

  return (
    <OrganizationContainer>
      <Header>
        <Title>Organizations</Title>
        <Link to="/organization/new">
          <Button>
            <FaPlus /> Add Organization
          </Button>
        </Link>
      </Header>

      {loading ? (
        <div className="text-center my-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : organizations.length === 0 ? (
        <div className="text-center my-5">
          <FaBuilding size={50} className="text-muted mb-3" />
          <h3>No Organizations Yet</h3>
          <p className="text-muted">Start by adding your first organization</p>
          <Link to="/organization/new">
            <Button>
              <FaPlus /> Add Organization
            </Button>
          </Link>
        </div>
      ) : (
        organizations.map((org) => (
          <OrganizationCard key={org._id}>
            <CardHeader>
              <h2><FaBuilding /> {org.title || org.name}</h2>
              <div className="actions">
                <Link to={`/organization/${org._id}`}>
                  <ActionButton title="Edit">
                    <FaEdit />
                  </ActionButton>
                </Link>
                <ActionButton 
                  color="var(--danger-color)" 
                  onClick={() => handleDelete(org._id)}
                  disabled={deleting}
                  title="Delete"
                >
                  <FaTrash />
                </ActionButton>
              </div>
            </CardHeader>
            <CardContent>
              <ImageContainer>
                {org.image ? (
                  <img src={org.image} alt={org.title || org.name} />
                ) : (
                  <div className="placeholder">No Image</div>
                )}
              </ImageContainer>
              <OrganizationDetails>
                <h3>About</h3>
                <p>{org.description || 'No description available'}</p>
              </OrganizationDetails>
            </CardContent>
          </OrganizationCard>
        ))
      )}
    </OrganizationContainer>
  );
};

export default OrganizationPage;

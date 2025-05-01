import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { getOrganizations, deleteOrganization } from '../utils/api';
import { FaPlus, FaEdit, FaTrash, FaBuilding } from 'react-icons/fa';

const OrganizationContainer = styled.div``;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  
  @media (max-width: 576px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;

const OrganizationCard = styled.div`
  background-color: var(--card-bg);
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
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
  }
`;

const ImageContainer = styled.div`
  width: 300px;
  height: 200px;
  border-radius: 8px;
  overflow: hidden;
  background-color: var(--secondary-bg);
  
  @media (max-width: 768px) {
    width: 100%;
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
  }
  
  p {
    color: rgba(255, 255, 255, 0.8);
    line-height: 1.6;
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
  
  &:hover {
    opacity: 0.8;
  }
  
  svg {
    font-size: 1rem;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  background-color: var(--card-bg);
  border-radius: 10px;
  margin-bottom: 2rem;
  
  h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: var(--accent-color);
  }
  
  p {
    margin-bottom: 1.5rem;
    color: rgba(255, 255, 255, 0.7);
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  
  .spinner {
    border: 4px solid rgba(255, 255, 255, 0.1);
    border-top: 4px solid var(--accent-color);
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const ConfirmationModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  
  .modal-content {
    background-color: var(--card-bg);
    border-radius: 10px;
    padding: 2rem;
    width: 100%;
    max-width: 500px;
    
    h3 {
      margin-bottom: 1rem;
      color: var(--danger-color);
    }
    
    p {
      margin-bottom: 2rem;
    }
    
    .modal-actions {
      display: flex;
      justify-content: flex-end;
      gap: 1rem;
    }
  }
`;

const OrganizationPage = () => {
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [orgToDelete, setOrgToDelete] = useState(null);
  
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
      setError('Failed to load organization information. Please try again.');
      setLoading(false);
    }
  };
  
  const handleDeleteClick = (org) => {
    setOrgToDelete(org);
    setShowDeleteModal(true);
  };
  
  const handleDeleteConfirm = async () => {
    if (!orgToDelete) return;
    
    try {
      await deleteOrganization(orgToDelete._id);
      setOrganizations(prev => prev.filter(o => o._id !== orgToDelete._id));
      toast.success('Organization deleted successfully');
      setShowDeleteModal(false);
      setOrgToDelete(null);
    } catch (error) {
      console.error('Error deleting organization:', error);
      toast.error('Failed to delete organization');
    }
  };
  
  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setOrgToDelete(null);
  };
  
  if (loading) {
    return (
      <OrganizationContainer>
        <LoadingContainer>
          <div className="spinner"></div>
        </LoadingContainer>
      </OrganizationContainer>
    );
  }
  
  if (error) {
    return (
      <OrganizationContainer>
        <EmptyState>
          <h3>Error</h3>
          <p>{error}</p>
          <button className="btn" onClick={fetchOrganizations}>Try Again</button>
        </EmptyState>
      </OrganizationContainer>
    );
  }
  
  return (
    <OrganizationContainer>
      <Header>
        <h1>Organization</h1>
        <Link to="/organization/new" className="btn">
          <FaPlus style={{ marginRight: '0.5rem' }} />
          Add Organization
        </Link>
      </Header>
      
      {organizations.length === 0 ? (
        <EmptyState>
          <h3>No Organization Information</h3>
          <p>You haven't added organization information yet.</p>
        </EmptyState>
      ) : (
        organizations.map(org => (
          <OrganizationCard key={org._id}>
            <CardHeader>
              <h2>
                <FaBuilding />
                {org.title}
              </h2>
              <div className="actions">
                <Link to={`/organization/${org._id}`}>
                  <ActionButton color="#2196f3">
                    <FaEdit />
                  </ActionButton>
                </Link>
                <ActionButton 
                  color="var(--danger-color)" 
                  onClick={() => handleDeleteClick(org)}
                >
                  <FaTrash />
                </ActionButton>
              </div>
            </CardHeader>
            <CardContent>
              <ImageContainer>
                <img src={org.image} alt={org.title} />
              </ImageContainer>
              <OrganizationDetails>
                <h3>About</h3>
                <p>{org.description}</p>
              </OrganizationDetails>
            </CardContent>
          </OrganizationCard>
        ))
      )}
      
      {showDeleteModal && (
        <ConfirmationModal>
          <div className="modal-content">
            <h3>Delete Organization</h3>
            <p>
              Are you sure you want to delete <strong>{orgToDelete?.title}</strong>?
              This action cannot be undone.
            </p>
            <div className="modal-actions">
              <button 
                className="btn secondary-btn"
                onClick={handleDeleteCancel}
              >
                Cancel
              </button>
              <button 
                className="btn btn-danger"
                onClick={handleDeleteConfirm}
              >
                Delete
              </button>
            </div>
          </div>
        </ConfirmationModal>
      )}
    </OrganizationContainer>
  );
};

export default OrganizationPage;

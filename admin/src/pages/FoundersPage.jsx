import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { getFounders, deleteFounder } from '../utils/api';
import { FaPlus, FaEdit, FaTrash, FaSearch, FaUserTie } from 'react-icons/fa';

const FoundersContainer = styled.div``;

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

const SearchBar = styled.div`
  position: relative;
  
  input {
    padding: 0.8rem 1rem;
    padding-left: 2.5rem;
    border-radius: 30px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background-color: var(--card-bg);
    color: var(--text-color);
    min-width: 240px;
    
    &:focus {
      outline: none;
      border-color: var(--accent-color);
    }
  }
  
  svg {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: rgba(255, 255, 255, 0.5);
  }
`;

const FoundersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
`;

const FounderCard = styled.div`
  background-color: var(--card-bg);
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: var(--transition);
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
  }
  
  .image-container {
    height: 250px;
    position: relative;
    overflow: hidden;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: var(--transition);
    }
    
    .actions {
      position: absolute;
      top: 10px;
      right: 10px;
      display: flex;
      gap: 0.5rem;
      opacity: 0;
      transition: var(--transition);
    }
    
    &:hover .actions {
      opacity: 1;
    }
    
    &:hover img {
      transform: scale(1.05);
    }
  }
  
  .content {
    padding: 1.5rem;
    
    h3 {
      margin-bottom: 0.5rem;
      display: flex;
      align-items: center;
      
      svg {
        margin-right: 0.5rem;
        color: var(--accent-color);
      }
    }
    
    .role {
      color: var(--accent-color);
      font-size: 0.9rem;
      margin-bottom: 1rem;
    }
    
    .description {
      color: rgba(255, 255, 255, 0.7);
      font-size: 0.9rem;
      margin-bottom: 1rem;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    
    .actions-bottom {
      display: flex;
      justify-content: flex-end;
      gap: 0.5rem;
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

const FoundersPage = () => {
  const [founders, setFounders] = useState([]);
  const [filteredFounders, setFilteredFounders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [founderToDelete, setFounderToDelete] = useState(null);
  
  useEffect(() => {
    fetchFounders();
  }, []);
  
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredFounders(founders);
    } else {
      const filtered = founders.filter(founder => 
        founder.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        founder.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (founder.description && founder.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setFilteredFounders(filtered);
    }
  }, [founders, searchTerm]);
  
  const fetchFounders = async () => {
    try {
      setLoading(true);
      const data = await getFounders();
      setFounders(data);
      setFilteredFounders(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching founders:', error);
      setError('Failed to load founders. Please try again.');
      setLoading(false);
    }
  };
  
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  
  const handleDeleteClick = (founder) => {
    setFounderToDelete(founder);
    setShowDeleteModal(true);
  };
  
  const handleDeleteConfirm = async () => {
    if (!founderToDelete) return;
    
    try {
      await deleteFounder(founderToDelete._id);
      setFounders(prev => prev.filter(f => f._id !== founderToDelete._id));
      toast.success('Founder deleted successfully');
      setShowDeleteModal(false);
      setFounderToDelete(null);
    } catch (error) {
      console.error('Error deleting founder:', error);
      toast.error('Failed to delete founder');
    }
  };
  
  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setFounderToDelete(null);
  };
  
  if (loading) {
    return (
      <FoundersContainer>
        <LoadingContainer>
          <div className="spinner"></div>
        </LoadingContainer>
      </FoundersContainer>
    );
  }
  
  if (error) {
    return (
      <FoundersContainer>
        <EmptyState>
          <h3>Error</h3>
          <p>{error}</p>
          <button className="btn" onClick={fetchFounders}>Try Again</button>
        </EmptyState>
      </FoundersContainer>
    );
  }
  
  return (
    <FoundersContainer>
      <Header>
        <h1>Founders</h1>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <SearchBar>
            <FaSearch />
            <input 
              type="text" 
              placeholder="Search founders..." 
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </SearchBar>
          <Link to="/founders/new" className="btn">
            <FaPlus style={{ marginRight: '0.5rem' }} />
            Add New
          </Link>
        </div>
      </Header>
      
      {filteredFounders.length === 0 ? (
        <EmptyState>
          <h3>No Founders Found</h3>
          <p>{searchTerm ? 'No results match your search criteria.' : 'There are no founders yet.'}</p>
          <Link to="/founders/new" className="btn">Add Founder</Link>
        </EmptyState>
      ) : (
        <FoundersGrid>
          {filteredFounders.map(founder => (
            <FounderCard key={founder._id}>
              <div className="image-container">
                <img src={founder.image} alt={founder.name} />
                <div className="actions">
                  <Link to={`/founders/${founder._id}`}>
                    <ActionButton color="#2196f3">
                      <FaEdit />
                    </ActionButton>
                  </Link>
                  <ActionButton 
                    color="var(--danger-color)" 
                    onClick={() => handleDeleteClick(founder)}
                  >
                    <FaTrash />
                  </ActionButton>
                </div>
              </div>
              <div className="content">
                <h3>
                  <FaUserTie />
                  {founder.name}
                </h3>
                <div className="role">{founder.role}</div>
                {founder.description && (
                  <div className="description">{founder.description}</div>
                )}
                <div className="actions-bottom">
                  <Link to={`/founders/${founder._id}`}>
                    <ActionButton color="#2196f3">
                      <FaEdit style={{ marginRight: '0.5rem' }} />
                      Edit
                    </ActionButton>
                  </Link>
                </div>
              </div>
            </FounderCard>
          ))}
        </FoundersGrid>
      )}
      
      {showDeleteModal && (
        <ConfirmationModal>
          <div className="modal-content">
            <h3>Delete Founder</h3>
            <p>
              Are you sure you want to delete <strong>{founderToDelete?.name}</strong>?
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
    </FoundersContainer>
  );
};

export default FoundersPage;

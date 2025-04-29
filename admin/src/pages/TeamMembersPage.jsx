import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { getTeamMembers, deleteTeamMember } from '../utils/api';
import { FaPlus, FaEdit, FaTrash, FaSearch } from 'react-icons/fa';

const TeamMembersContainer = styled.div``;

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

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    display: block;
    overflow-x: auto;
  }
`;

const Th = styled.th`
  text-align: left;
  padding: 1rem;
  background-color: var(--secondary-bg);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  font-weight: 600;
`;

const Td = styled.td`
  padding: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  vertical-align: middle;
`;

const Avatar = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Actions = styled.div`
  display: flex;
  gap: 0.5rem;
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

const TeamMembersPage = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState(null);
  
  useEffect(() => {
    fetchTeamMembers();
  }, []);
  
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredMembers(teamMembers);
    } else {
      const filtered = teamMembers.filter(member => 
        member.teamName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.role.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredMembers(filtered);
    }
  }, [teamMembers, searchTerm]);
  
  const fetchTeamMembers = async () => {
    try {
      setLoading(true);
      const data = await getTeamMembers();
      setTeamMembers(data);
      setFilteredMembers(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching team members:', error);
      setError('Failed to load team members. Please try again.');
      setLoading(false);
    }
  };
  
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  
  const handleDeleteClick = (member) => {
    setMemberToDelete(member);
    setShowDeleteModal(true);
  };
  
  const handleDeleteConfirm = async () => {
    if (!memberToDelete) return;
    
    try {
      await deleteTeamMember(memberToDelete._id);
      setTeamMembers(prev => prev.filter(m => m._id !== memberToDelete._id));
      toast.success('Team member deleted successfully');
      setShowDeleteModal(false);
      setMemberToDelete(null);
    } catch (error) {
      console.error('Error deleting team member:', error);
      toast.error('Failed to delete team member');
    }
  };
  
  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setMemberToDelete(null);
  };
  
  if (loading) {
    return (
      <TeamMembersContainer>
        <LoadingContainer>
          <div className="spinner"></div>
        </LoadingContainer>
      </TeamMembersContainer>
    );
  }
  
  if (error) {
    return (
      <TeamMembersContainer>
        <EmptyState>
          <h3>Error</h3>
          <p>{error}</p>
          <button className="btn" onClick={fetchTeamMembers}>Try Again</button>
        </EmptyState>
      </TeamMembersContainer>
    );
  }
  
  return (
    <TeamMembersContainer>
      <Header>
        <h1>Team Members</h1>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <SearchBar>
            <FaSearch />
            <input 
              type="text" 
              placeholder="Search team members..." 
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </SearchBar>
          <Link to="/team-members/new" className="btn">
            <FaPlus style={{ marginRight: '0.5rem' }} />
            Add New
          </Link>
        </div>
      </Header>
      
      {filteredMembers.length === 0 ? (
        <EmptyState>
          <h3>No Team Members Found</h3>
          <p>{searchTerm ? 'No results match your search criteria.' : 'There are no team members yet.'}</p>
          <Link to="/team-members/new" className="btn">Add Team Member</Link>
        </EmptyState>
      ) : (
        <Table>
          <thead>
            <tr>
              <Th>Image</Th>
              <Th>Name</Th>
              <Th>Role</Th>
              <Th>Actions</Th>
            </tr>
          </thead>
          <tbody>
            {filteredMembers.map(member => (
              <tr key={member._id}>
                <Td>
                  <Avatar>
                    <img src={member.image} alt={member.teamName} />
                  </Avatar>
                </Td>
                <Td>{member.teamName}</Td>
                <Td>{member.role}</Td>
                <Td>
                  <Actions>
                    <Link to={`/team-members/${member._id}`}>
                      <ActionButton color="#2196f3">
                        <FaEdit />
                      </ActionButton>
                    </Link>
                    <ActionButton 
                      color="var(--danger-color)" 
                      onClick={() => handleDeleteClick(member)}
                    >
                      <FaTrash />
                    </ActionButton>
                  </Actions>
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      
      {showDeleteModal && (
        <ConfirmationModal>
          <div className="modal-content">
            <h3>Delete Team Member</h3>
            <p>
              Are you sure you want to delete <strong>{memberToDelete?.teamName}</strong>?
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
    </TeamMembersContainer>
  );
};

export default TeamMembersPage;

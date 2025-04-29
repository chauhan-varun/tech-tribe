import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { getEvents, deleteEvent } from '../utils/api';
import { FaPlus, FaEdit, FaTrash, FaSearch, FaCalendarAlt, FaClock, FaMapMarkerAlt } from 'react-icons/fa';

const EventsContainer = styled.div``;

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

const EventDate = styled.div`
  display: flex;
  align-items: center;
  
  .date-icon {
    background-color: var(--accent-color);
    color: var(--text-color);
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.8rem;
  }
  
  .date-text {
    font-size: 0.9rem;
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

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);
  
  useEffect(() => {
    fetchEvents();
  }, []);
  
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredEvents(events);
    } else {
      const filtered = events.filter(event => 
        event.eventTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredEvents(filtered);
    }
  }, [events, searchTerm]);
  
  const fetchEvents = async () => {
    try {
      setLoading(true);
      const data = await getEvents();
      setEvents(data);
      setFilteredEvents(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching events:', error);
      setError('Failed to load events. Please try again.');
      setLoading(false);
    }
  };
  
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  
  const handleDeleteClick = (event) => {
    setEventToDelete(event);
    setShowDeleteModal(true);
  };
  
  const handleDeleteConfirm = async () => {
    if (!eventToDelete) return;
    
    try {
      await deleteEvent(eventToDelete._id);
      setEvents(prev => prev.filter(e => e._id !== eventToDelete._id));
      toast.success('Event deleted successfully');
      setShowDeleteModal(false);
      setEventToDelete(null);
    } catch (error) {
      console.error('Error deleting event:', error);
      toast.error('Failed to delete event');
    }
  };
  
  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setEventToDelete(null);
  };
  
  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  if (loading) {
    return (
      <EventsContainer>
        <LoadingContainer>
          <div className="spinner"></div>
        </LoadingContainer>
      </EventsContainer>
    );
  }
  
  if (error) {
    return (
      <EventsContainer>
        <EmptyState>
          <h3>Error</h3>
          <p>{error}</p>
          <button className="btn" onClick={fetchEvents}>Try Again</button>
        </EmptyState>
      </EventsContainer>
    );
  }
  
  return (
    <EventsContainer>
      <Header>
        <h1>Events</h1>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <SearchBar>
            <FaSearch />
            <input 
              type="text" 
              placeholder="Search events..." 
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </SearchBar>
          <Link to="/events/new" className="btn">
            <FaPlus style={{ marginRight: '0.5rem' }} />
            Add New
          </Link>
        </div>
      </Header>
      
      {filteredEvents.length === 0 ? (
        <EmptyState>
          <h3>No Events Found</h3>
          <p>{searchTerm ? 'No results match your search criteria.' : 'There are no events yet.'}</p>
          <Link to="/events/new" className="btn">Add Event</Link>
        </EmptyState>
      ) : (
        <Table>
          <thead>
            <tr>
              <Th>Event Title</Th>
              <Th>Date</Th>
              <Th>Time</Th>
              <Th>Location</Th>
              <Th>Price</Th>
              <Th>Actions</Th>
            </tr>
          </thead>
          <tbody>
            {filteredEvents.map(event => (
              <tr key={event._id}>
                <Td>{event.eventTitle}</Td>
                <Td>
                  <EventDate>
                    <div className="date-icon">
                      <FaCalendarAlt />
                    </div>
                    <div className="date-text">
                      {formatDate(event.date)}
                    </div>
                  </EventDate>
                </Td>
                <Td>{event.time}</Td>
                <Td>{event.location}</Td>
                <Td>{event.price}</Td>
                <Td>
                  <Actions>
                    <Link to={`/events/${event._id}`}>
                      <ActionButton color="#2196f3">
                        <FaEdit />
                      </ActionButton>
                    </Link>
                    <ActionButton 
                      color="var(--danger-color)" 
                      onClick={() => handleDeleteClick(event)}
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
            <h3>Delete Event</h3>
            <p>
              Are you sure you want to delete <strong>{eventToDelete?.eventTitle}</strong>?
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
    </EventsContainer>
  );
};

export default EventsPage;

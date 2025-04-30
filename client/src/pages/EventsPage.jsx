import { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaTicketAlt, FaSearch } from 'react-icons/fa';

const EventsPageContainer = styled.div`
  padding: 80px 0;
`;

const Banner = styled.div`
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.9)), url('/events-banner.jpg');
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

const EventsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
`;

const EventCard = styled.div`
  background-color: var(--card-bg);
  border-radius: 15px;
  overflow: hidden;
  transition: var(--transition);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  
  @media (min-width: 768px) {
    flex-direction: row;
  }
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
  }
  
  .date-container {
    background-color: var(--accent-color);
    color: white;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    min-width: 150px;
    
    .month {
      font-size: 1.2rem;
      font-weight: 500;
      text-transform: uppercase;
    }
    
    .day {
      font-size: 3rem;
      font-weight: 700;
      line-height: 1;
      margin: 0.5rem 0;
    }
    
    .year {
      font-size: 1.2rem;
    }
  }
  
  .content {
    padding: 2rem;
    flex: 1;
    
    h3 {
      font-size: 1.5rem;
      margin-bottom: 1rem;
      color: var(--text-color);
    }
    
    .event-meta {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
      margin-bottom: 1.5rem;
      
      .meta-item {
        display: flex;
        align-items: center;
        color: rgba(255, 255, 255, 0.8);
        
        svg {
          color: var(--accent-color);
          margin-right: 10px;
          font-size: 1.1rem;
        }
      }
    }
    
    .event-description {
      margin-bottom: 1.5rem;
      color: rgba(255, 255, 255, 0.8);
      line-height: 1.6;
    }
    
    .event-price {
      display: inline-block;
      background-color: rgba(255, 0, 0, 0.1);
      color: var(--accent-color);
      padding: 0.5rem 1rem;
      border-radius: 30px;
      font-weight: 600;
      margin-bottom: 1.5rem;
    }
    
    .event-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      
      @media (max-width: 576px) {
        flex-direction: column;
        align-items: flex-start;
        gap: 1rem;
      }
    }
  }
`;

const FilterContainer = styled.div`
  margin-bottom: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  
  .search-box {
    flex: 1;
    max-width: 400px;
    position: relative;
    
    input {
      width: 100%;
      padding: 12px 15px;
      padding-right: 40px;
      background-color: var(--card-bg);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 30px;
      color: var(--text-color);
      
      &:focus {
        outline: none;
        border-color: var(--accent-color);
      }
    }
    
    svg {
      position: absolute;
      right: 15px;
      top: 50%;
      transform: translateY(-50%);
      color: rgba(255, 255, 255, 0.5);
    }
  }
  
  .filter-sort {
    display: flex;
    gap: 1rem;
    
    select {
      padding: 10px 15px;
      background-color: var(--card-bg);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 30px;
      color: var(--text-color);
      cursor: pointer;
      
      &:focus {
        outline: none;
        border-color: var(--accent-color);
      }
    }
  }
`;

const NoEventsContainer = styled.div`
  text-align: center;
  padding: 3rem;
  background-color: var(--card-bg);
  border-radius: 10px;
  
  h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: var(--accent-color);
  }
  
  p {
    margin-bottom: 1.5rem;
    color: rgba(255, 255, 255, 0.8);
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

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('date-asc');
  
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5000/api/events');
        setEvents(response.data);
        setFilteredEvents(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching events:', err);
        setError('Failed to load events. Please try again later.');
        setLoading(false);
      }
    };
    
    fetchEvents();
  }, []);
  
  // Apply search and sort whenever their values change
  useEffect(() => {
    let result = [...events];
    
    // Apply search filter
    if (searchTerm) {
      result = result.filter(event => 
        event.eventTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply sorting
    switch (sortOption) {
      case 'date-asc':
        result.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      case 'date-desc':
        result.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case 'title-asc':
        result.sort((a, b) => a.eventTitle.localeCompare(b.eventTitle));
        break;
      case 'title-desc':
        result.sort((a, b) => b.eventTitle.localeCompare(a.eventTitle));
        break;
      default:
        break;
    }
    
    setFilteredEvents(result);
  }, [events, searchTerm, sortOption]);
  
  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return {
      day: date.getDate(),
      month: date.toLocaleString('default', { month: 'short' }),
      year: date.getFullYear(),
      full: date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })
    };
  };
  
  if (loading) {
    return (
      <EventsPageContainer>
        <div className="container">
          <LoadingContainer>
            <div className="spinner"></div>
          </LoadingContainer>
        </div>
      </EventsPageContainer>
    );
  }
  
  if (error) {
    return (
      <EventsPageContainer>
        <div className="container">
          <ErrorContainer>
            <h2>Oops!</h2>
            <p>{error}</p>
            <button onClick={() => window.location.reload()} className="btn">Try Again</button>
          </ErrorContainer>
        </div>
      </EventsPageContainer>
    );
  }
  
  return (
    <EventsPageContainer>
      <Banner>
        <div className="container">
          <h1>Upcoming <span>Events</span></h1>
          <p>
            Join us for exciting tech events, workshops, and meetups.
            Connect with like-minded individuals and expand your knowledge.
          </p>
        </div>
      </Banner>
      
      <div className="container">
        <FilterContainer>
          <div className="search-box">
            <input 
              type="text" 
              placeholder="Search events..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch />
          </div>
          
          <div className="filter-sort">
            <select 
              value={sortOption} 
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="date-asc">Date (Upcoming first)</option>
              <option value="date-desc">Date (Recent first)</option>
              <option value="title-asc">Title (A-Z)</option>
              <option value="title-desc">Title (Z-A)</option>
            </select>
          </div>
        </FilterContainer>
        
        {filteredEvents.length === 0 ? (
          <NoEventsContainer>
            <h3>No Events Found</h3>
            <p>There are no events matching your search criteria at the moment.</p>
            <button 
              className="btn" 
              onClick={() => {
                setSearchTerm('');
                setSortOption('date-asc');
              }}
            >
              Clear Filters
            </button>
          </NoEventsContainer>
        ) : (
          <EventsGrid>
            {filteredEvents.map((event) => {
              const date = formatDate(event.date);
              
              return (
                <EventCard key={event._id}>
                  <div className="date-container">
                    <span className="month">{date.month}</span>
                    <span className="day">{date.day}</span>
                    <span className="year">{date.year}</span>
                  </div>
                  
                  <div className="content">
                    <h3>{event.eventTitle}</h3>
                    
                    <div className="event-meta">
                      <div className="meta-item">
                        <FaCalendarAlt />
                        <span>{date.full}</span>
                      </div>
                      <div className="meta-item">
                        <FaClock />
                        <span>{event.time}</span>
                      </div>
                      <div className="meta-item">
                        <FaMapMarkerAlt />
                        <span>{event.location}</span>
                      </div>
                    </div>
                    
                    <p className="event-description">{event.description}</p>
                    
                    <div className="event-price">
                      <FaTicketAlt /> {event.price}
                    </div>
                    
                    <div className="event-footer">
                      <button 
                        className="btn" 
                        onClick={() => {
                          if (event.url) {
                            window.open(event.url, '_blank', 'noopener,noreferrer');
                          } else {
                            alert('Registration link not available for this event.');
                          }
                        }}
                      >
                        Register Now
                      </button>
                    </div>
                  </div>
                </EventCard>
              );
            })}
          </EventsGrid>
        )}
      </div>
    </EventsPageContainer>
  );
};

export default EventsPage;

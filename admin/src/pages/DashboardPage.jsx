import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { getTeamMembers, getEvents, getFounders, getOrganizations } from '../utils/api';
import { FaUsers, FaCalendarAlt, FaUserTie, FaBuilding, FaMapMarkerAlt } from 'react-icons/fa';

const DashboardContainer = styled.div``;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const StatCard = styled.div`
  background-color: var(--card-bg);
  border-radius: 10px;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: var(--transition);
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  }
  
  .icon {
    width: 60px;
    height: 60px;
    border-radius: 10px;
    background-color: ${({ iconBg }) => iconBg || 'rgba(255, 0, 0, 0.1)'};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 1rem;
    
    svg {
      color: ${({ iconColor }) => iconColor || 'var(--accent-color)'};
      font-size: 1.5rem;
    }
  }
  
  .stat-info {
    flex: 1;
    
    .number {
      font-size: 1.8rem;
      font-weight: 700;
      margin-bottom: 0.2rem;
    }
    
    .title {
      color: rgba(255, 255, 255, 0.7);
      font-size: 0.9rem;
    }
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1.5rem;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const DashboardCard = styled.div`
  background-color: var(--card-bg);
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const CardHeader = styled.div`
  padding: 1.2rem 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  h2 {
    font-size: 1.2rem;
    font-weight: 600;
  }
  
  a {
    font-size: 0.9rem;
  }
`;

const CardBody = styled.div`
  padding: 1.5rem;
`;

const EventsList = styled.div`
  .event-item {
    display: flex;
    align-items: center;
    margin-bottom: 1.2rem;
    padding-bottom: 1.2rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    
    &:last-child {
      margin-bottom: 0;
      padding-bottom: 0;
      border-bottom: none;
    }
    
    .event-date {
      min-width: 60px;
      height: 60px;
      background-color: var(--accent-color);
      border-radius: 8px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin-right: 1rem;
      
      .day {
        font-size: 1.5rem;
        font-weight: 700;
        line-height: 1;
      }
      
      .month {
        font-size: 0.8rem;
        text-transform: uppercase;
      }
    }
    
    .event-info {
      flex: 1;
      
      .event-title {
        font-weight: 600;
        margin-bottom: 0.3rem;
      }
      
      .event-location {
        font-size: 0.9rem;
        color: rgba(255, 255, 255, 0.7);
        display: flex;
        align-items: center;
        
        svg {
          margin-right: 0.3rem;
          font-size: 0.8rem;
        }
      }
    }
  }
`;

const TeamList = styled.div`
  .team-item {
    display: flex;
    align-items: center;
    margin-bottom: 1.2rem;
    padding-bottom: 1.2rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    
    &:last-child {
      margin-bottom: 0;
      padding-bottom: 0;
      border-bottom: none;
    }
    
    .team-avatar {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      overflow: hidden;
      margin-right: 1rem;
      
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    
    .team-info {
      flex: 1;
      
      .team-name {
        font-weight: 600;
        margin-bottom: 0.3rem;
      }
      
      .team-role {
        font-size: 0.9rem;
        color: rgba(255, 255, 255, 0.7);
      }
    }
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

const EmptyState = styled.div`
  text-align: center;
  padding: 2rem;
  
  p {
    margin-bottom: 1rem;
    color: rgba(255, 255, 255, 0.7);
  }
`;

const DashboardPage = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [events, setEvents] = useState([]);
  const [founders, setFounders] = useState([]);
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch all data in parallel
        const [teamData, eventsData, foundersData, orgsData] = await Promise.all([
          getTeamMembers(),
          getEvents(),
          getFounders(),
          getOrganizations(),
        ]);
        
        setTeamMembers(teamData);
        setEvents(eventsData);
        setFounders(foundersData);
        setOrganizations(orgsData);
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to load dashboard data. Please try again later.');
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
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
  
  // Sort events by date (upcoming first)
  const upcomingEvents = [...events]
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 5);
  
  // Get latest team members
  const latestTeamMembers = [...teamMembers]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);
  
  if (loading) {
    return (
      <DashboardContainer>
        <LoadingContainer>
          <div className="spinner"></div>
        </LoadingContainer>
      </DashboardContainer>
    );
  }
  
  if (error) {
    return (
      <DashboardContainer>
        <EmptyState>
          <h2>Error</h2>
          <p>{error}</p>
          <button 
            className="btn" 
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </EmptyState>
      </DashboardContainer>
    );
  }
  
  return (
    <DashboardContainer>
      <h1>Dashboard</h1>
      <p style={{ marginBottom: '2rem', color: 'rgba(255, 255, 255, 0.7)' }}>
        Welcome to the Tech Tribe Admin Dashboard.
      </p>
      
      <StatsGrid>
        <StatCard iconBg="rgba(255, 0, 0, 0.1)" iconColor="var(--accent-color)">
          <div className="icon">
            <FaUsers />
          </div>
          <div className="stat-info">
            <div className="number">{teamMembers.length}</div>
            <div className="title">Team Members</div>
          </div>
        </StatCard>
        
        <StatCard iconBg="rgba(76, 175, 80, 0.1)" iconColor="var(--success-color)">
          <div className="icon">
            <FaCalendarAlt />
          </div>
          <div className="stat-info">
            <div className="number">{events.length}</div>
            <div className="title">Events</div>
          </div>
        </StatCard>
        
        <StatCard iconBg="rgba(33, 150, 243, 0.1)" iconColor="#2196f3">
          <div className="icon">
            <FaUserTie />
          </div>
          <div className="stat-info">
            <div className="number">{founders.length}</div>
            <div className="title">Founders</div>
          </div>
        </StatCard>
        
        <StatCard iconBg="rgba(255, 193, 7, 0.1)" iconColor="var(--warning-color)">
          <div className="icon">
            <FaBuilding />
          </div>
          <div className="stat-info">
            <div className="number">{organizations.length}</div>
            <div className="title">Organizations</div>
          </div>
        </StatCard>
      </StatsGrid>
      
      <GridContainer>
        <DashboardCard>
          <CardHeader>
            <h2>Upcoming Events</h2>
            <Link to="/events">View All</Link>
          </CardHeader>
          <CardBody>
            <EventsList>
              {upcomingEvents.length === 0 ? (
                <EmptyState>
                  <p>No upcoming events found.</p>
                  <Link to="/events/new" className="btn">Create New Event</Link>
                </EmptyState>
              ) : (
                upcomingEvents.map(event => {
                  const date = formatDate(event.date);
                  
                  return (
                    <div className="event-item" key={event._id}>
                      <div className="event-date">
                        <div className="day">{date.day}</div>
                        <div className="month">{date.month}</div>
                      </div>
                      <div className="event-info">
                        <div className="event-title">{event.eventTitle}</div>
                        <div className="event-location">
                          <FaMapMarkerAlt /> {event.location}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </EventsList>
          </CardBody>
        </DashboardCard>
        
        <DashboardCard>
          <CardHeader>
            <h2>Team Members</h2>
            <Link to="/team-members">View All</Link>
          </CardHeader>
          <CardBody>
            <TeamList>
              {latestTeamMembers.length === 0 ? (
                <EmptyState>
                  <p>No team members found.</p>
                  <Link to="/team-members/new" className="btn">Add Team Member</Link>
                </EmptyState>
              ) : (
                latestTeamMembers.map(member => (
                  <div className="team-item" key={member._id}>
                    <div className="team-avatar">
                      <img src={member.image} alt={member.teamName} />
                    </div>
                    <div className="team-info">
                      <div className="team-name">{member.teamName}</div>
                      <div className="team-role">{member.role}</div>
                    </div>
                  </div>
                ))
              )}
            </TeamList>
          </CardBody>
        </DashboardCard>
      </GridContainer>
    </DashboardContainer>
  );
};

export default DashboardPage;

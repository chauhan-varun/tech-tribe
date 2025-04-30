import { createContext, useContext, useState, useEffect } from 'react';
import apiService from '../utils/api';

// Create context
const AppContext = createContext();

// Export the custom hook to use the context
export const useAppContext = () => useContext(AppContext);

// Context provider component
export const AppProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [founders, setFounders] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all data on initial load
  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Using Promise.all to fetch all data in parallel
        const [eventsData, foundersData, teamData, orgsData] = await Promise.all([
          apiService.getEvents(),
          apiService.getFounders(),
          apiService.getTeamMembers(),
          apiService.getOrganizations()
        ]);
        
        setEvents(eventsData);
        setFounders(foundersData);
        setTeamMembers(teamData);
        setOrganizations(orgsData);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  // Values to be provided to consuming components
  const value = {
    events,
    founders,
    teamMembers,
    organizations,
    loading,
    error,
    // Methods to refresh specific data
    refreshEvents: async () => {
      try {
        const data = await apiService.getEvents();
        setEvents(data);
        return data;
      } catch (err) {
        console.error('Error refreshing events:', err);
        throw err;
      }
    },
    refreshFounders: async () => {
      try {
        const data = await apiService.getFounders();
        setFounders(data);
        return data;
      } catch (err) {
        console.error('Error refreshing founders:', err);
        throw err;
      }
    },
    refreshTeamMembers: async () => {
      try {
        const data = await apiService.getTeamMembers();
        setTeamMembers(data);
        return data;
      } catch (err) {
        console.error('Error refreshing team members:', err);
        throw err;
      }
    },
    refreshOrganizations: async () => {
      try {
        const data = await apiService.getOrganizations();
        setOrganizations(data);
        return data;
      } catch (err) {
        console.error('Error refreshing organizations:', err);
        throw err;
      }
    }
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppProvider;

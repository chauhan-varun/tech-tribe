import axios from 'axios';

// Create an instance of axios with default config
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// API functions for team members
export const getTeamMembers = async () => {
  try {
    const response = await api.get('/team-members');
    return response.data;
  } catch (error) {
    console.error('Error fetching team members:', error);
    throw error;
  }
};

// API functions for organization info
export const getOrganizations = async () => {
  try {
    const response = await api.get('/organizations');
    return response.data;
  } catch (error) {
    console.error('Error fetching organizations:', error);
    throw error;
  }
};

// API functions for events
export const getEvents = async () => {
  try {
    const response = await api.get('/events');
    return response.data;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
};

// API functions for founders
export const getFounders = async () => {
  try {
    const response = await api.get('/founders');
    return response.data;
  } catch (error) {
    console.error('Error fetching founders:', error);
    throw error;
  }
};

export default api;

import axios from 'axios';

// Create axios instance with default config
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/api` : '/api', // Use env variable or fallback to relative path
  headers: {
    'Content-Type': 'application/json',
  },
});

// API service object with methods for each endpoint
const apiService = {
  // Events
  getEvents: async () => {
    const response = await api.get('/events');
    return response.data;
  },
  getEventById: async (id) => {
    const response = await api.get(`/events/${id}`);
    return response.data;
  },
  
  // Team Members
  getTeamMembers: async () => {
    const response = await api.get('/team-members');
    return response.data;
  },
  getTeamMemberById: async (id) => {
    const response = await api.get(`/team-members/${id}`);
    return response.data;
  },
  
  // Founders
  getFounders: async () => {
    const response = await api.get('/founders');
    return response.data;
  },
  getFounderById: async (id) => {
    const response = await api.get(`/founders/${id}`);
    return response.data;
  },
  
  // Organizations
  getOrganizations: async () => {
    const response = await api.get('/organizations');
    return response.data;
  },
  getOrganizationById: async (id) => {
    const response = await api.get(`/organizations/${id}`);
    return response.data;
  },
};

export default apiService;

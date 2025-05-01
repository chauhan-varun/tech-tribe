import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

// Create an instance of axios with default config
const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the auth token in all requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      // Auto logout if 401 response returned from api
      logout();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth functions
export const login = async (credentials) => {
  try {
    const response = await api.post('/users/login', credentials);
    localStorage.setItem('token', response.data.token);
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const register = async (userData) => {
  try {
    const response = await api.post('/users/register', userData);
    return response.data;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

export const logout = () => {
  localStorage.removeItem('token');
};

export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  if (!token) return false;
  
  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp > currentTime;
  } catch (error) {
    return false;
  }
};

export const getCurrentUser = () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) return null;
    return jwtDecode(token);
  } catch (error) {
    return null;
  }
};

// Team Members API functions
export const getTeamMembers = async () => {
  try {
    const response = await api.get('/team-members');
    return response.data;
  } catch (error) {
    console.error('Error fetching team members:', error);
    throw error;
  }
};

export const getTeamMemberById = async (id) => {
  try {
    const response = await api.get(`/team-members/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching team member:', error);
    throw error;
  }
};

export const createTeamMember = async (formData) => {
  try {
    const response = await api.post('/team-members', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating team member:', error);
    throw error;
  }
};

export const updateTeamMember = async (id, formData) => {
  try {
    const response = await api.put(`/team-members/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating team member:', error);
    throw error;
  }
};

export const deleteTeamMember = async (id) => {
  try {
    const response = await api.delete(`/team-members/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting team member:', error);
    throw error;
  }
};

// Organization API functions
export const getOrganizations = async () => {
  try {
    const response = await api.get('/organizations');
    return response.data;
  } catch (error) {
    console.error('Error fetching organizations:', error);
    throw error;
  }
};

export const getOrganizationById = async (id) => {
  try {
    const response = await api.get(`/organizations/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching organization:', error);
    throw error;
  }
};

export const createOrganization = async (formData) => {
  try {
    const response = await api.post('/organizations', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating organization:', error);
    throw error;
  }
};

export const updateOrganization = async (id, formData) => {
  try {
    const response = await api.put(`/organizations/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating organization:', error);
    throw error;
  }
};

export const deleteOrganization = async (id) => {
  try {
    const response = await api.delete(`/organizations/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting organization:', error);
    throw error;
  }
};

// Events API functions
export const getEvents = async () => {
  try {
    const response = await api.get('/events');
    return response.data;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
};

export const getEventById = async (id) => {
  try {
    const response = await api.get(`/events/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching event:', error);
    throw error;
  }
};

export const createEvent = async (formData) => {
  try {
    const response = await api.post('/events', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating event:', error);
    throw error;
  }
};

export const updateEvent = async (id, formData) => {
  try {
    const response = await api.put(`/events/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating event:', error);
    throw error;
  }
};

export const deleteEvent = async (id) => {
  try {
    const response = await api.delete(`/events/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting event:', error);
    throw error;
  }
};

// Founders API functions
export const getFounders = async () => {
  try {
    const response = await api.get('/founders');
    return response.data;
  } catch (error) {
    console.error('Error fetching founders:', error);
    throw error;
  }
};

export const getFounderById = async (id) => {
  try {
    const response = await api.get(`/founders/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching founder:', error);
    throw error;
  }
};

export const createFounder = async (formData) => {
  try {
    const response = await api.post('/founders', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating founder:', error);
    throw error;
  }
};

export const updateFounder = async (id, formData) => {
  try {
    const response = await api.put(`/founders/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating founder:', error);
    throw error;
  }
};

export const deleteFounder = async (id) => {
  try {
    const response = await api.delete(`/founders/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting founder:', error);
    throw error;
  }
};

// User settings API functions
export const updateEmail = async (data) => {
  try {
    const response = await api.put(`/users/${data.userId}/email`, {
      email: data.email,
      password: data.password
    });
    return response.data;
  } catch (error) {
    console.error('Error updating email:', error);
    throw error;
  }
};

export const updatePassword = async (data) => {
  try {
    const response = await api.put(`/users/${data.userId}/password`, {
      currentPassword: data.currentPassword,
      newPassword: data.newPassword
    });
    return response.data;
  } catch (error) {
    console.error('Error updating password:', error);
    throw error;
  }
};

export default api;

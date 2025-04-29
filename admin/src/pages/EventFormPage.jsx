import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { getEventById, createEvent, updateEvent } from '../utils/api';
import { FaArrowLeft, FaCalendarAlt, FaClock, FaMapMarkerAlt, FaTicketAlt } from 'react-icons/fa';

const FormContainer = styled.div``;

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
  
  button {
    background: none;
    border: none;
    color: var(--text-color);
    font-size: 1.5rem;
    cursor: pointer;
    margin-right: 1rem;
    
    &:hover {
      color: var(--accent-color);
    }
  }
`;

const FormCard = styled.div`
  background-color: var(--card-bg);
  border-radius: 10px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Form = styled.form`
  display: grid;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  
  label {
    margin-bottom: 0.5rem;
    font-weight: 500;
    display: flex;
    align-items: center;
    
    svg {
      margin-right: 0.5rem;
      color: var(--accent-color);
    }
  }
  
  input, textarea {
    padding: 0.8rem;
    border-radius: 5px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background-color: rgba(255, 255, 255, 0.05);
    color: var(--text-color);
    
    &:focus {
      outline: none;
      border-color: var(--accent-color);
    }
  }
  
  textarea {
    min-height: 120px;
    resize: vertical;
  }
  
  .error {
    color: var(--danger-color);
    font-size: 0.85rem;
    margin-top: 0.5rem;
  }
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
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

const EventFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);
  
  const [formData, setFormData] = useState({
    eventTitle: '',
    description: '',
    date: '',
    time: '',
    location: '',
    price: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(isEditMode);
  
  useEffect(() => {
    if (isEditMode) {
      fetchEvent();
    }
  }, [id]);
  
  const fetchEvent = async () => {
    try {
      setInitialLoading(true);
      const data = await getEventById(id);
      
      // Format date for the input field (YYYY-MM-DD)
      const formattedDate = new Date(data.date).toISOString().split('T')[0];
      
      setFormData({
        eventTitle: data.eventTitle,
        description: data.description,
        date: formattedDate,
        time: data.time,
        location: data.location,
        price: data.price
      });
      
      setInitialLoading(false);
    } catch (error) {
      console.error('Error fetching event:', error);
      toast.error('Failed to load event details');
      navigate('/events');
    }
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.eventTitle.trim()) {
      newErrors.eventTitle = 'Event title is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (!formData.date) {
      newErrors.date = 'Date is required';
    }
    
    if (!formData.time.trim()) {
      newErrors.time = 'Time is required';
    }
    
    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }
    
    if (!formData.price.trim()) {
      newErrors.price = 'Price is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      setLoading(true);
      
      if (isEditMode) {
        await updateEvent(id, formData);
        toast.success('Event updated successfully');
      } else {
        await createEvent(formData);
        toast.success('Event created successfully');
      }
      
      navigate('/events');
    } catch (error) {
      console.error('Error saving event:', error);
      toast.error(isEditMode ? 'Failed to update event' : 'Failed to create event');
    } finally {
      setLoading(false);
    }
  };
  
  const goBack = () => {
    navigate('/events');
  };
  
  if (initialLoading) {
    return (
      <FormContainer>
        <LoadingContainer>
          <div className="spinner"></div>
        </LoadingContainer>
      </FormContainer>
    );
  }
  
  return (
    <FormContainer>
      <Header>
        <button onClick={goBack} aria-label="Go back">
          <FaArrowLeft />
        </button>
        <h1>{isEditMode ? 'Edit Event' : 'Add Event'}</h1>
      </Header>
      
      <FormCard>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <label htmlFor="eventTitle">Event Title</label>
            <input
              type="text"
              id="eventTitle"
              name="eventTitle"
              value={formData.eventTitle}
              onChange={handleChange}
              placeholder="Enter event title"
            />
            {errors.eventTitle && <div className="error">{errors.eventTitle}</div>}
          </FormGroup>
          
          <FormGroup>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter event description"
            />
            {errors.description && <div className="error">{errors.description}</div>}
          </FormGroup>
          
          <FormRow>
            <FormGroup>
              <label htmlFor="date">
                <FaCalendarAlt /> Date
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
              />
              {errors.date && <div className="error">{errors.date}</div>}
            </FormGroup>
            
            <FormGroup>
              <label htmlFor="time">
                <FaClock /> Time
              </label>
              <input
                type="text"
                id="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                placeholder="e.g. 6:00 PM - 9:00 PM"
              />
              {errors.time && <div className="error">{errors.time}</div>}
            </FormGroup>
          </FormRow>
          
          <FormRow>
            <FormGroup>
              <label htmlFor="location">
                <FaMapMarkerAlt /> Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Enter event location"
              />
              {errors.location && <div className="error">{errors.location}</div>}
            </FormGroup>
            
            <FormGroup>
              <label htmlFor="price">
                <FaTicketAlt /> Price
              </label>
              <input
                type="text"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="e.g. Free, $10, $20-$50"
              />
              {errors.price && <div className="error">{errors.price}</div>}
            </FormGroup>
          </FormRow>
          
          <ButtonGroup>
            <button
              type="button"
              className="btn secondary-btn"
              onClick={goBack}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn"
              disabled={loading}
            >
              {loading ? 'Saving...' : isEditMode ? 'Update' : 'Create'}
            </button>
          </ButtonGroup>
        </Form>
      </FormCard>
    </FormContainer>
  );
};

export default EventFormPage;

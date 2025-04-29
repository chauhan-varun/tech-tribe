import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { getOrganizationById, createOrganization, updateOrganization } from '../utils/api';
import { FaArrowLeft, FaUpload, FaBuilding } from 'react-icons/fa';

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
    min-height: 200px;
    resize: vertical;
  }
  
  .error {
    color: var(--danger-color);
    font-size: 0.85rem;
    margin-top: 0.5rem;
  }
`;

const ImageUploadContainer = styled.div`
  margin-bottom: 1.5rem;
`;

const ImagePreview = styled.div`
  width: 100%;
  max-width: 500px;
  height: 300px;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 1rem;
  position: relative;
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px dashed rgba(255, 255, 255, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .placeholder {
    text-align: center;
    color: rgba(255, 255, 255, 0.5);
    
    svg {
      font-size: 3rem;
      margin-bottom: 1rem;
    }
    
    p {
      font-size: 0.9rem;
    }
  }
`;

const UploadButton = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background-color: var(--accent-color);
  color: var(--text-color);
  padding: 0.8rem 1.5rem;
  border-radius: 5px;
  cursor: pointer;
  transition: var(--transition);
  
  &:hover {
    background-color: #cc0000;
  }
  
  input[type="file"] {
    display: none;
  }
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

const OrganizationFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);
  
  const [formData, setFormData] = useState({
    title: '',
    description: ''
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(isEditMode);
  
  useEffect(() => {
    if (isEditMode) {
      fetchOrganization();
    }
  }, [id]);
  
  const fetchOrganization = async () => {
    try {
      setInitialLoading(true);
      const data = await getOrganizationById(id);
      setFormData({
        title: data.title,
        description: data.description
      });
      setPreviewImage(data.image);
      setInitialLoading(false);
    } catch (error) {
      console.error('Error fetching organization:', error);
      toast.error('Failed to load organization details');
      navigate('/organization');
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
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Check if file is an image
    if (!file.type.match('image.*')) {
      toast.error('Please select an image file');
      return;
    }
    
    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size should be less than 5MB');
      return;
    }
    
    setSelectedImage(file);
    
    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewImage(e.target.result);
    };
    reader.readAsDataURL(file);
    
    // Clear error when image is selected
    if (errors.image) {
      setErrors(prev => ({ ...prev, image: '' }));
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (!isEditMode && !selectedImage) {
      newErrors.image = 'Organization image is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      setLoading(true);
      
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      
      if (selectedImage) {
        formDataToSend.append('image', selectedImage);
      }
      
      if (isEditMode) {
        await updateOrganization(id, formDataToSend);
        toast.success('Organization updated successfully');
      } else {
        await createOrganization(formDataToSend);
        toast.success('Organization created successfully');
      }
      
      navigate('/organization');
    } catch (error) {
      console.error('Error saving organization:', error);
      toast.error(isEditMode ? 'Failed to update organization' : 'Failed to create organization');
    } finally {
      setLoading(false);
    }
  };
  
  const goBack = () => {
    navigate('/organization');
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
        <h1>{isEditMode ? 'Edit Organization' : 'Add Organization'}</h1>
      </Header>
      
      <FormCard>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <label htmlFor="title">
              <FaBuilding style={{ marginRight: '0.5rem' }} />
              Organization Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter organization title"
            />
            {errors.title && <div className="error">{errors.title}</div>}
          </FormGroup>
          
          <ImageUploadContainer>
            <label>Organization Logo/Image</label>
            <ImagePreview>
              {previewImage ? (
                <img src={previewImage} alt="Preview" />
              ) : (
                <div className="placeholder">
                  <FaUpload />
                  <p>Upload organization image</p>
                </div>
              )}
            </ImagePreview>
            
            <UploadButton>
              <FaUpload /> Select Image
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleImageChange}
              />
            </UploadButton>
            
            {errors.image && <p className="error">{errors.image}</p>}
          </ImageUploadContainer>
          
          <FormGroup>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter organization description"
            />
            {errors.description && <div className="error">{errors.description}</div>}
          </FormGroup>
          
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

export default OrganizationFormPage;

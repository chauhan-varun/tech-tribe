import { useState } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';
import { FaKey, FaEnvelope, FaUser, FaSave } from 'react-icons/fa';
import { updateEmail, updatePassword } from '../utils/api';

const SettingsContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const Header = styled.div`
  margin-bottom: 2rem;
  
  h1 {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
  
  p {
    color: rgba(255, 255, 255, 0.7);
  }
`;

const SettingsCard = styled.div`
  background-color: var(--card-bg);
  border-radius: 10px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  
  svg {
    font-size: 1.5rem;
    margin-right: 1rem;
    color: var(--accent-color);
  }
  
  h2 {
    font-size: 1.25rem;
    font-weight: 500;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
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
  
  input {
    padding: 0.8rem;
    background-color: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 5px;
    color: var(--text-color);
    
    &:focus {
      outline: none;
      border-color: var(--accent-color);
    }
  }
  
  .error {
    color: var(--danger-color);
    font-size: 0.85rem;
    margin-top: 0.5rem;
  }
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background-color: var(--accent-color);
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 500;
  transition: var(--transition);
  align-self: flex-start;
  
  &:hover {
    background-color: #cc0000;
  }
  
  &:disabled {
    background-color: rgba(255, 255, 255, 0.1);
    cursor: not-allowed;
  }
`;

const SettingsPage = () => {
  const { currentUser, updateUserContext } = useAuth();
  
  const [emailForm, setEmailForm] = useState({
    email: currentUser?.email || '',
    password: '',
  });
  
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  
  const [emailErrors, setEmailErrors] = useState({});
  const [passwordErrors, setPasswordErrors] = useState({});
  
  const [loadingEmail, setLoadingEmail] = useState(false);
  const [loadingPassword, setLoadingPassword] = useState(false);
  
  const handleEmailChange = (e) => {
    const { name, value } = e.target;
    setEmailForm(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is edited
    if (emailErrors[name]) {
      setEmailErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is edited
    if (passwordErrors[name]) {
      setPasswordErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  const validateEmailForm = () => {
    const errors = {};
    
    if (!emailForm.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(emailForm.email)) {
      errors.email = 'Email is invalid';
    }
    
    if (!emailForm.password.trim()) {
      errors.password = 'Current password is required for verification';
    }
    
    setEmailErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const validatePasswordForm = () => {
    const errors = {};
    
    if (!passwordForm.currentPassword.trim()) {
      errors.currentPassword = 'Current password is required';
    }
    
    if (!passwordForm.newPassword.trim()) {
      errors.newPassword = 'New password is required';
    } else if (passwordForm.newPassword.length < 6) {
      errors.newPassword = 'Password must be at least 6 characters';
    }
    
    if (!passwordForm.confirmPassword.trim()) {
      errors.confirmPassword = 'Please confirm your new password';
    } else if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    
    setPasswordErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const handleUpdateEmail = async (e) => {
    e.preventDefault();
    
    if (!validateEmailForm()) return;
    
    try {
      setLoadingEmail(true);
      
      await updateEmail({
        userId: currentUser.id,
        email: emailForm.email,
        password: emailForm.password
      });
      
      // Update user context with new email
      updateUserContext({ ...currentUser, email: emailForm.email });
      
      // Clear password field
      setEmailForm(prev => ({ ...prev, password: '' }));
      
      toast.success('Email updated successfully');
    } catch (error) {
      console.error('Error updating email:', error);
      const errorMessage = error.response?.data?.message || 'Failed to update email';
      toast.error(errorMessage);
      
      if (errorMessage.includes('password')) {
        setEmailErrors(prev => ({ ...prev, password: 'Incorrect password' }));
      }
    } finally {
      setLoadingEmail(false);
    }
  };
  
  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    
    if (!validatePasswordForm()) return;
    
    try {
      setLoadingPassword(true);
      
      await updatePassword({
        userId: currentUser.id,
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword
      });
      
      // Clear password form
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      
      toast.success('Password updated successfully');
    } catch (error) {
      console.error('Error updating password:', error);
      const errorMessage = error.response?.data?.message || 'Failed to update password';
      toast.error(errorMessage);
      
      if (errorMessage.includes('current password')) {
        setPasswordErrors(prev => ({ ...prev, currentPassword: 'Incorrect current password' }));
      }
    } finally {
      setLoadingPassword(false);
    }
  };
  
  return (
    <SettingsContainer>
      <Header>
        <h1>Account Settings</h1>
        <p>Manage your account information and change your password</p>
      </Header>
      
      <SettingsCard>
        <CardHeader>
          <FaUser />
          <h2>Account Information</h2>
        </CardHeader>
        
        <div>
          <p><strong>Username:</strong> {currentUser?.username}</p>
          <p><strong>Role:</strong> Administrator</p>
        </div>
      </SettingsCard>
      
      <SettingsCard>
        <CardHeader>
          <FaEnvelope />
          <h2>Update Email</h2>
        </CardHeader>
        
        <Form onSubmit={handleUpdateEmail}>
          <FormGroup>
            <label>
              <FaEnvelope /> Email Address
            </label>
            <input
              type="email"
              name="email"
              value={emailForm.email}
              onChange={handleEmailChange}
              placeholder="Enter your new email address"
            />
            {emailErrors.email && <div className="error">{emailErrors.email}</div>}
          </FormGroup>
          
          <FormGroup>
            <label>
              <FaKey /> Current Password
            </label>
            <input
              type="password"
              name="password"
              value={emailForm.password}
              onChange={handleEmailChange}
              placeholder="Enter your current password for verification"
            />
            {emailErrors.password && <div className="error">{emailErrors.password}</div>}
          </FormGroup>
          
          <Button type="submit" disabled={loadingEmail}>
            <FaSave />
            {loadingEmail ? 'Updating...' : 'Update Email'}
          </Button>
        </Form>
      </SettingsCard>
      
      <SettingsCard>
        <CardHeader>
          <FaKey />
          <h2>Change Password</h2>
        </CardHeader>
        
        <Form onSubmit={handleUpdatePassword}>
          <FormGroup>
            <label>
              <FaKey /> Current Password
            </label>
            <input
              type="password"
              name="currentPassword"
              value={passwordForm.currentPassword}
              onChange={handlePasswordChange}
              placeholder="Enter your current password"
            />
            {passwordErrors.currentPassword && <div className="error">{passwordErrors.currentPassword}</div>}
          </FormGroup>
          
          <FormGroup>
            <label>
              <FaKey /> New Password
            </label>
            <input
              type="password"
              name="newPassword"
              value={passwordForm.newPassword}
              onChange={handlePasswordChange}
              placeholder="Enter your new password"
            />
            {passwordErrors.newPassword && <div className="error">{passwordErrors.newPassword}</div>}
          </FormGroup>
          
          <FormGroup>
            <label>
              <FaKey /> Confirm New Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={passwordForm.confirmPassword}
              onChange={handlePasswordChange}
              placeholder="Confirm your new password"
            />
            {passwordErrors.confirmPassword && <div className="error">{passwordErrors.confirmPassword}</div>}
          </FormGroup>
          
          <Button type="submit" disabled={loadingPassword}>
            <FaSave />
            {loadingPassword ? 'Updating...' : 'Update Password'}
          </Button>
        </Form>
      </SettingsCard>
    </SettingsContainer>
  );
};

export default SettingsPage;

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { login } from '../utils/api';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { FaUser, FaLock } from 'react-icons/fa';

const LoginContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background-color: var(--primary-color);
`;

const LoginBox = styled.div`
  background-color: var(--card-bg);
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 450px;
  padding: 3rem 2rem;
`;

const LoginHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  
  h1 {
    font-size: 2rem;
    margin-bottom: 0.5rem;
    
    span {
      color: var(--accent-color);
    }
  }
  
  p {
    color: rgba(255, 255, 255, 0.7);
  }
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
  position: relative;
  
  svg {
    position: absolute;
    top: 50%;
    left: 15px;
    transform: translateY(-50%);
    color: rgba(255, 255, 255, 0.5);
  }
  
  input {
    width: 100%;
    padding: 15px;
    padding-left: 45px;
    border-radius: 5px;
    background-color: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: var(--text-color);
    transition: var(--transition);
    
    &:focus {
      outline: none;
      border-color: var(--accent-color);
      box-shadow: 0 0 0 2px rgba(255, 0, 0, 0.1);
    }
  }
  
  .error-message {
    color: var(--danger-color);
    font-size: 0.85rem;
    margin-top: 0.5rem;
  }
`;

const LoginButton = styled.button`
  padding: 15px;
  background-color: var(--accent-color);
  color: var(--text-color);
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 600;
  font-size: 1rem;
  transition: var(--transition);
  margin-top: 1rem;
  
  &:hover {
    background-color: #cc0000;
  }
  
  &:disabled {
    background-color: rgba(255, 0, 0, 0.5);
    cursor: not-allowed;
  }
`;

const ErrorAlert = styled.div`
  background-color: rgba(244, 67, 54, 0.1);
  border: 1px solid rgba(244, 67, 54, 0.5);
  color: var(--danger-color);
  padding: 1rem;
  border-radius: 5px;
  margin-bottom: 1.5rem;
`;

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState('');
  
  const navigate = useNavigate();
  const { setCurrentUser } = useAuth();
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      setLoading(true);
      setLoginError('');
      
      const userData = await login({ email, password });
      
      setCurrentUser(userData);
      toast.success('Successfully logged in!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      setLoginError(
        error.response?.data?.message || 
        'Login failed. Please check your credentials and try again.'
      );
      toast.error('Login failed');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <LoginContainer>
      <LoginBox>
        <LoginHeader>
          <h1>Tech<span>Tribe</span> Admin</h1>
          <p>Sign in to your admin account</p>
        </LoginHeader>
        
        {loginError && <ErrorAlert>{loginError}</ErrorAlert>}
        
        <LoginForm onSubmit={handleSubmit}>
          <FormGroup>
            <FaUser />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <div className="error-message">{errors.email}</div>}
          </FormGroup>
          
          <FormGroup>
            <FaLock />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <div className="error-message">{errors.password}</div>}
          </FormGroup>
          
          <LoginButton type="submit" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </LoginButton>
        </LoginForm>
      </LoginBox>
    </LoginContainer>
  );
};

export default LoginPage;

import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import styled from 'styled-components';
import { FaBars, FaUser, FaBell, FaCog, FaSignOutAlt } from 'react-icons/fa';

const HeaderContainer = styled.header`
  background-color: var(--card-bg);
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 90;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  margin-left: 250px;
`;

const ToggleButton = styled.button`
  background: none;
  border: none;
  color: var(--text-color);
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0.5rem;
  display: none;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  color: var(--text-color);
  font-size: 1.1rem;
  padding: 0.5rem;
  border-radius: 50%;
  cursor: pointer;
  transition: var(--transition);
  position: relative;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
  
  .notification-dot {
    position: absolute;
    top: 3px;
    right: 3px;
    width: 8px;
    height: 8px;
    background-color: var(--accent-color);
    border-radius: 50%;
  }
`;

const ProfileDropdown = styled.div`
  position: relative;
`;

const DropdownButton = styled.button`
  background: none;
  border: none;
  color: var(--text-color);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 4px;
  transition: var(--transition);
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
  
  img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    object-fit: cover;
  }
  
  .user-info {
    text-align: left;
    
    .name {
      font-weight: 500;
      font-size: 0.9rem;
    }
    
    .role {
      font-size: 0.7rem;
      color: rgba(255, 255, 255, 0.7);
    }
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: calc(100% + 0.5rem);
  right: 0;
  background-color: var(--card-bg);
  border-radius: 4px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  min-width: 200px;
  z-index: 100;
  overflow: hidden;
  display: ${({ $isOpen }) => ($isOpen ? 'block' : 'none')};
`;

const DropdownItem = styled.button`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0.8rem 1rem;
  background: none;
  border: none;
  color: var(--text-color);
  cursor: pointer;
  transition: var(--transition);
  text-align: left;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.05);
  }
  
  svg {
    margin-right: 0.8rem;
    font-size: 1rem;
  }
  
  &.logout {
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    color: var(--danger-color);
    
    &:hover {
      background-color: rgba(255, 0, 0, 0.1);
    }
  }
`;

const PageTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 500;
`;

const Header = ({ title, toggleSidebar }) => {
  const { currentUser, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  
  const handleLogout = () => {
    logout();
  };
  
  return (
    <HeaderContainer>
      <div>
        <ToggleButton onClick={toggleSidebar}>
          <FaBars />
        </ToggleButton>
        <PageTitle>{title || 'Dashboard'}</PageTitle>
      </div>
      
      <HeaderRight>
        <IconButton>
          <FaBell />
          <span className="notification-dot"></span>
        </IconButton>
        
        <ProfileDropdown>
          <DropdownButton onClick={toggleDropdown}>
            <FaUser />
            <div className="user-info">
              <div className="name">{currentUser?.username || 'Admin User'}</div>
              <div className="role">Administrator</div>
            </div>
          </DropdownButton>
          
          <DropdownMenu $isOpen={isDropdownOpen}>
            <DropdownItem>
              <FaUser /> My Profile
            </DropdownItem>
            <DropdownItem>
              <FaCog /> Settings
            </DropdownItem>
            <DropdownItem className="logout" onClick={handleLogout}>
              <FaSignOutAlt /> Logout
            </DropdownItem>
          </DropdownMenu>
        </ProfileDropdown>
      </HeaderRight>
    </HeaderContainer>
  );
};

export default Header;

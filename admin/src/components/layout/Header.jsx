import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import styled from 'styled-components';
import { FaBars, FaUser, FaBell, FaCog, FaSignOutAlt } from 'react-icons/fa';

const HeaderContainer = styled.header`
  backdrop-filter: blur(10px);
  background-color: rgba(25, 25, 25, 0.85);
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 90;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  margin-left: ${({ $sidebarOpen }) => ($sidebarOpen ? '250px' : '0')};
  transition: all 0.3s ease;
  width: ${({ $sidebarOpen }) => ($sidebarOpen ? 'calc(100% - 250px)' : '100%')};
  
  @media (max-width: 768px) {
    margin-left: 0;
    padding: 1rem;
    width: 100%;
  }
  
  @media (max-width: 576px) {
    padding: 0.75rem;
  }
`;

const ToggleButton = styled.button`
  background: none;
  border: none;
  color: var(--text-color);
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  border-radius: 0.25rem;
  
  &:hover {
    color: var(--accent-color);
    background-color: rgba(255, 255, 255, 0.05);
  }
`;

const PageTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-color);
  margin-left: 0.5rem;
  
  @media (max-width: 576px) {
    font-size: 1.2rem;
  }
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  
  @media (max-width: 576px) {
    gap: 0.5rem;
  }
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

const Header = ({ title, toggleSidebar, sidebarOpen }) => {
  const { currentUser, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  
  const handleLogout = () => {
    logout();
  };
  
  return (
    <HeaderContainer $sidebarOpen={sidebarOpen}>
      <div className="d-flex align-items-center">
        <ToggleButton onClick={toggleSidebar} aria-label="Toggle sidebar">
          <FaBars />
        </ToggleButton>
        <PageTitle>{title}</PageTitle>
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
          
          <DropdownMenu $isOpen={dropdownOpen}>
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

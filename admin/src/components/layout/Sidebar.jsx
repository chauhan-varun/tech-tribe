import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import styled from 'styled-components';
import { 
  FaHome, 
  FaUsers, 
  FaCalendarAlt, 
  FaBuilding, 
  FaUserTie, 
  FaCog, 
  FaSignOutAlt 
} from 'react-icons/fa';

const SidebarContainer = styled.div`
  background-color: var(--secondary-bg);
  color: var(--text-color);
  width: 250px;
  height: 100vh;
  position: fixed;
  top: 0;
  left: ${({ $isOpen }) => ($isOpen ? '0' : '-250px')};
  padding: 2rem 0;
  overflow-y: auto;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.2);
  transition: left 0.3s ease;
  z-index: 1000;
  
  @media (max-width: 768px) {
    left: ${({ $isOpen }) => ($isOpen ? '0' : '-250px')};
  }
`;

const Overlay = styled.div`
  display: ${({ $isOpen }) => ($isOpen ? 'block' : 'none')};
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
  
  @media (min-width: 769px) {
    display: none;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  color: var(--text-color);
  font-size: 1.2rem;
  cursor: pointer;
  display: none;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const Logo = styled.div`
  padding: 0 1.5rem;
  margin-bottom: 2rem;
  font-size: 1.5rem;
  font-weight: 700;
  text-align: center;
  
  span {
    color: var(--accent-color);
  }
`;

const MenuSection = styled.div`
  margin-bottom: 2rem;
  
  h3 {
    padding: 0 1.5rem;
    margin-bottom: 1rem;
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 0.1rem;
    color: rgba(255, 255, 255, 0.5);
  }
`;

const MenuItem = styled(NavLink)`
  display: flex;
  align-items: center;
  padding: 0.8rem 1.5rem;
  color: var(--text-color);
  transition: var(--transition);
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.05);
  }
  
  &.active {
    background-color: var(--accent-color);
    border-right: 4px solid #fff;
  }
  
  svg {
    margin-right: 0.8rem;
    font-size: 1.2rem;
  }
`;

const UserInfo = styled.div`
  padding: 1.5rem;
  margin-bottom: 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  
  .user-name {
    font-weight: 600;
    margin-bottom: 0.2rem;
  }
  
  .user-role {
    font-size: 0.8rem;
    color: rgba(255, 255, 255, 0.6);
  }
`;

const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0.8rem 1.5rem;
  background: none;
  border: none;
  color: var(--text-color);
  cursor: pointer;
  transition: var(--transition);
  text-align: left;
  
  &:hover {
    background-color: rgba(255, 0, 0, 0.2);
    color: var(--danger-color);
  }
  
  svg {
    margin-right: 0.8rem;
    font-size: 1.2rem;
  }
`;

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { currentUser, logout } = useAuth();
  
  const handleLogout = () => {
    logout();
  };
  
  const handleOverlayClick = () => {
    if (window.innerWidth <= 768) {
      toggleSidebar();
    }
  };
  
  return (
    <>
      <Overlay $isOpen={isOpen} onClick={handleOverlayClick} />
      <SidebarContainer $isOpen={isOpen}>
        <CloseButton onClick={toggleSidebar}>×</CloseButton>
        
        <Logo>
          Tech<span>Tribe</span> Admin
        </Logo>
        
        {currentUser && (
          <UserInfo>
            <div className="user-name">{currentUser.username || 'Admin User'}</div>
            <div className="user-role">Administrator</div>
          </UserInfo>
        )}
        
        <MenuSection>
          <h3>Main</h3>
          <MenuItem to="/dashboard">
            <FaHome /> Dashboard
          </MenuItem>
        </MenuSection>
        
        <MenuSection>
          <h3>Management</h3>
          <MenuItem to="/team-members">
            <FaUsers /> Team Members
          </MenuItem>
          <MenuItem to="/events">
            <FaCalendarAlt /> Events
          </MenuItem>
          <MenuItem to="/organization">
            <FaBuilding /> Organization
          </MenuItem>
          <MenuItem to="/founders">
            <FaUserTie /> Founders
          </MenuItem>
        </MenuSection>
        
        <MenuSection>
          <h3>Account</h3>
          <MenuItem to="/settings">
            <FaCog /> Settings
          </MenuItem>
          <LogoutButton onClick={handleLogout}>
            <FaSignOutAlt /> Logout
          </LogoutButton>
        </MenuSection>
      </SidebarContainer>
    </>
  );
};

export default Sidebar;

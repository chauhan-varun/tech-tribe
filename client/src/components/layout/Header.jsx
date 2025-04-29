import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  background-color: var(--primary-color);
  padding: 1rem 0;
  position: sticky;
  top: 0;
  z-index: 100;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-color);
  
  span {
    color: var(--accent-color);
  }
`;

const NavItems = styled.ul`
  display: flex;
  gap: 2rem;
  list-style: none;

  @media (max-width: 768px) {
    display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
    flex-direction: column;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: var(--primary-color);
    padding: 1rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
`;

const NavItem = styled.li`
  a {
    color: var(--text-color);
    font-weight: 500;
    transition: var(--transition);
    position: relative;
    
    &:hover {
      color: var(--accent-color);
    }
    
    &::after {
      content: '';
      position: absolute;
      bottom: -5px;
      left: 0;
      width: 0;
      height: 2px;
      background-color: var(--accent-color);
      transition: var(--transition);
    }
    
    &:hover::after {
      width: 100%;
    }
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: var(--text-color);
  font-size: 1.5rem;
  cursor: pointer;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <HeaderContainer>
      <div className="container">
        <Nav>
          <Logo to="/">
            Tech<span>Tribe</span>
          </Logo>
          
          <MobileMenuButton onClick={toggleMenu}>
            {isMenuOpen ? '✕' : '☰'}
          </MobileMenuButton>
          
          <NavItems isOpen={isMenuOpen}>
            <NavItem>
              <Link to="/">Home</Link>
            </NavItem>
            <NavItem>
              <Link to="/team">Team</Link>
            </NavItem>
            <NavItem>
              <Link to="/events">Events</Link>
            </NavItem>
            <NavItem>
              <Link to="/founders">Founders</Link>
            </NavItem>
            <NavItem>
              <Link to="/organization">Organization</Link>
            </NavItem>
            <NavItem>
              <Link to="/about">About</Link>
            </NavItem>
          </NavItems>
        </Nav>
      </div>
    </HeaderContainer>
  );
};

export default Header;

import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaGithub } from 'react-icons/fa';

const FooterContainer = styled.footer`
  background-color: var(--secondary-bg);
  padding: 4rem 0 2rem;
  margin-top: 4rem;
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
`;

const FooterColumn = styled.div`
  h3 {
    font-size: 1.2rem;
    margin-bottom: 1.5rem;
    position: relative;
    display: inline-block;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -8px;
      left: 0;
      width: 40px;
      height: 3px;
      background-color: var(--accent-color);
    }
  }
  
  ul {
    list-style: none;
  }
  
  li {
    margin-bottom: 0.8rem;
  }
  
  a {
    color: var(--text-color);
    transition: var(--transition);
    
    &:hover {
      color: var(--accent-color);
      padding-left: 5px;
    }
  }
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  
  a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    transition: var(--transition);
    
    &:hover {
      background-color: var(--accent-color);
      transform: translateY(-5px);
    }
  }
`;

const Copyright = styled.div`
  text-align: center;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
`;

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <FooterContainer>
      <div className="container">
        <FooterGrid>
          <FooterColumn>
            <h3>About Us</h3>
            <p>
              Tech Tribe is a community platform dedicated to bringing together tech enthusiasts, 
              fostering innovation, and creating opportunities for learning and growth.
            </p>
            <SocialIcons>
              <a href="#" aria-label="Facebook"><FaFacebookF /></a>
              <a href="#" aria-label="Twitter"><FaTwitter /></a>
              <a href="#" aria-label="Instagram"><FaInstagram /></a>
              <a href="#" aria-label="LinkedIn"><FaLinkedinIn /></a>
              <a href="#" aria-label="GitHub"><FaGithub /></a>
            </SocialIcons>
          </FooterColumn>
          
          <FooterColumn>
            <h3>Quick Links</h3>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/team">Our Team</Link></li>
              <li><Link to="/events">Events</Link></li>
              <li><Link to="/founders">Founders</Link></li>
              <li><Link to="/about">About Us</Link></li>
            </ul>
          </FooterColumn>
          
          <FooterColumn>
            <h3>Contact Us</h3>
            <ul>
              <li>Email: info@techtribe.com</li>
              <li>Phone: +1 (123) 456-7890</li>
              <li>Address: 123 Tech Avenue, Innovation City</li>
            </ul>
          </FooterColumn>
        </FooterGrid>
        
        <Copyright>
          &copy; {currentYear} Tech Tribe. All rights reserved.
        </Copyright>
      </div>
    </FooterContainer>
  );
};

export default Footer;

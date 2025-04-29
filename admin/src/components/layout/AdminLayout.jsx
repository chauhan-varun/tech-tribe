import { useState, useEffect } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Sidebar from './Sidebar';
import Header from './Header';
import styled from 'styled-components';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
`;

const MainContent = styled.main`
  flex: 1;
  margin-left: 250px;
  padding: 0 0 2rem;
  transition: margin-left 0.3s ease;
  
  @media (max-width: 768px) {
    margin-left: ${({ $sidebarOpen }) => ($sidebarOpen ? '250px' : '0')};
  }
`;

const ContentWrapper = styled.div`
  padding: 2rem;
`;

const AdminLayout = () => {
  const { currentUser, loading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [pageTitle, setPageTitle] = useState('Dashboard');
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  // Update title based on the current path
  useEffect(() => {
    const path = window.location.pathname;
    
    if (path.includes('dashboard')) {
      setPageTitle('Dashboard');
    } else if (path.includes('team-members')) {
      setPageTitle('Team Members');
    } else if (path.includes('events')) {
      setPageTitle('Events');
    } else if (path.includes('organization')) {
      setPageTitle('Organization');
    } else if (path.includes('founders')) {
      setPageTitle('Founders');
    } else if (path.includes('settings')) {
      setPageTitle('Settings');
    }
  }, []);
  
  if (loading) {
    return (
      <div className="loading">
        <p>Loading...</p>
      </div>
    );
  }
  
  if (!loading && !currentUser) {
    return <Navigate to="/login" />;
  }
  
  return (
    <LayoutContainer>
      <Sidebar />
      
      <MainContent $sidebarOpen={sidebarOpen}>
        <Header title={pageTitle} toggleSidebar={toggleSidebar} />
        <ContentWrapper>
          <Outlet />
        </ContentWrapper>
      </MainContent>
      
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </LayoutContainer>
  );
};

export default AdminLayout;

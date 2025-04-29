import React from 'react';
import styled from 'styled-components';

const ErrorContainer = styled.div`
  padding: 2rem;
  margin: 2rem auto;
  max-width: 800px;
  background-color: var(--card-bg);
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  text-align: center;

  h2 {
    color: var(--danger-color);
    margin-bottom: 1rem;
  }

  p {
    margin-bottom: 1.5rem;
    color: var(--text-color);
  }

  button {
    background-color: var(--accent-color);
    color: white;
    border: none;
    padding: 0.5rem 1.5rem;
    border-radius: 5px;
    cursor: pointer;
    transition: var(--transition);

    &:hover {
      background-color: #cc0000;
    }
  }
`;

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to console
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <ErrorContainer>
          <h2>Something went wrong</h2>
          <p>We apologize for the inconvenience. Please try refreshing the page or contact support if the issue persists.</p>
          <button onClick={() => window.location.reload()}>Refresh Page</button>
        </ErrorContainer>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

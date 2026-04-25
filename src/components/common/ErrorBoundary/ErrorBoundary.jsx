import { Component } from 'react';
import { Box, Typography, Button } from '@mui/material';
import PropTypes from 'prop-types';

/**
 * ErrorBoundary - Catches JavaScript errors in child components
 * @component
 */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            p: 4,
            textAlign: 'center',
          }}
        >
          <Typography variant="h4" sx={{ mb: 2, fontWeight: 700 }}>
            Oops! Something went wrong.
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary', maxWidth: 480 }}>
            An unexpected error occurred. Please try again.
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={this.handleReset}
          >
            Go Home
          </Button>
        </Box>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ErrorBoundary;

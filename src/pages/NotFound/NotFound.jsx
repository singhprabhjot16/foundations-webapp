import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router';
import { ROUTES } from '../../routes/Path';

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', p: 4, textAlign: 'center' }}>
      <Typography variant="h1" sx={{ fontWeight: 900, fontSize: '6rem', color: 'primary.main', mb: 1 }}>404</Typography>
      <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>Page Not Found</Typography>
      <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4 }}>The page you&apos;re looking for doesn&apos;t exist.</Typography>
      <Button variant="contained" size="large" onClick={() => navigate(ROUTES.HOME)}>Go Home</Button>
    </Box>
  );
};

export default NotFound;

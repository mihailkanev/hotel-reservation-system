import { AppBar, Toolbar, Typography, Button, Container, Box } from '@mui/material';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <AppBar position="static" sx={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      <Container maxWidth="lg">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
            My Hotel Reservation
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button 
              color="inherit" 
              component={Link} 
              to="/"
              sx={{ textTransform: 'none' }}
            >
              Home
            </Button>
            <Button 
              color="inherit" 
              component={Link} 
              to="/rooms"
              sx={{ textTransform: 'none' }}
            >
              Rooms
            </Button>
            <Button 
              color="inherit" 
              component={Link} 
              to="/reservations"
              sx={{ textTransform: 'none' }}
            >
              Reservations
            </Button>
            <Button 
              color="inherit" 
              component={Link} 
              to="/contact"
              sx={{ textTransform: 'none' }}
            >
              Contact
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
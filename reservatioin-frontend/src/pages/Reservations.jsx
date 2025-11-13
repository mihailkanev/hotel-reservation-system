import { 
  Container, 
  Typography, 
  Box, 
  Paper, 
  Grid, 
  TextField, 
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stepper,
  Step,
  StepLabel,
  Alert,
  Snackbar,
  Card,
  CardContent
} from '@mui/material';
import { format } from 'date-fns'; 
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useState } from 'react';

function Reservations() {
  const steps = ['Select Dates', 'Room Selection', 'Guest Info', 'Confirmation'];
  
  const [activeStep, setActiveStep] = useState(0);
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  
  const [formData, setFormData] = useState({
    guests: 1,
    rooms: 1,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    specialRequests: ''
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleCompleteReservation = async () => {
    setLoading(true);
    
    try {
      const reservationData = {
      checkIn: checkInDate ? format(checkInDate, 'yyyy-MM-dd') : null,
      checkOut: checkOutDate ? format(checkOutDate, 'yyyy-MM-dd') : null,
        guests: formData.guests,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        specialRequests: formData.specialRequests,
        roomId: selectedRoomId
      };

      console.log('📤 Sending reservation:', reservationData);

      const response = await fetch('http://localhost:8080/api/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reservationData)
      });

      if (response.ok) {
        const result = await response.json();
        setShowSuccess(true);
        setActiveStep((prev) => prev + 1);
        console.log('Reservation created:', result);
      } else {
        throw new Error('Failed to create reservation');
      }
    } catch (error) {
      console.error('Error creating reservation:', error);
      setShowError(true);
    } finally {
      setLoading(false);
    }
  };

  const rooms = [
    { id: 1, name: "Deluxe Room", price: 199, description: "Luxury room with king bed" },
    { id: 2, name: "Executive Suite", price: 299, description: "Spacious suite with ocean view" },
    { id: 3, name: "Standard Room", price: 129, description: "Comfortable room with queen bed" }
  ];

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Box textAlign="center" sx={{ mb: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
            Make a Reservation
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Book your perfect stay with us
          </Typography>
        </Box>

        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Paper sx={{ p: 4 }}>
          {activeStep === 0 && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <DatePicker
                  label="Check-in Date"
                  value={checkInDate}
                  onChange={(newValue) => setCheckInDate(newValue)}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <DatePicker
                  label="Check-out Date"
                  value={checkOutDate}
                  onChange={(newValue) => setCheckOutDate(newValue)}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Guests</InputLabel>
                  <Select 
                    label="Guests" 
                    value={formData.guests}
                    onChange={(e) => handleInputChange('guests', e.target.value)}
                  >
                    <MenuItem value={1}>1 Guest</MenuItem>
                    <MenuItem value={2}>2 Guests</MenuItem>
                    <MenuItem value={3}>3 Guests</MenuItem>
                    <MenuItem value={4}>4 Guests</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          )}

          {activeStep === 1 && (
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Select Your Room
                </Typography>
              </Grid>
              
              {rooms.map((room) => (
                <Grid item xs={12} key={room.id}>
                  <Card 
                    sx={{ 
                      cursor: 'pointer',
                      border: selectedRoomId === room.id ? '2px solid #667eea' : '1px solid #e0e0e0',
                      backgroundColor: selectedRoomId === room.id ? '#f0f4ff' : 'white',
                      transition: 'all 0.2s',
                      '&:hover': {
                        borderColor: '#667eea',
                        backgroundColor: '#f8faff'
                      }
                    }}
                    onClick={() => setSelectedRoomId(room.id)}
                  >
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <Box>
                          <Typography variant="h6" gutterBottom>{room.name}</Typography>
                          <Typography variant="body2" color="text.secondary" gutterBottom>
                            {room.description}
                          </Typography>
                        </Box>
                        <Typography variant="h5" color="primary" fontWeight="bold">
                          ${room.price}
                          <Typography variant="body2" component="span" color="text.secondary">
                            /night
                          </Typography>
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
              
              {selectedRoomId && (
                <Grid item xs={12}>
                  <Alert severity="info">
                    Selected: <strong>{rooms.find(r => r.id === selectedRoomId)?.name}</strong>
                  </Alert>
                </Grid>
              )}
            </Grid>
          )}

          {activeStep === 2 && (
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="First Name"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Last Name"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Special Requests"
                  multiline
                  rows={3}
                  value={formData.specialRequests}
                  onChange={(e) => handleInputChange('specialRequests', e.target.value)}
                />
              </Grid>
            </Grid>
          )}

          {activeStep === 3 && (
            <Box textAlign="center">
              <Typography variant="h5" gutterBottom color="primary">
                Reservation Completed!
              </Typography>
              <Typography color="text.secondary">
                Thank you for your reservation. We have sent a confirmation email.
              </Typography>
            </Box>
          )}

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ textTransform: 'none' }}
            >
              Back
            </Button>
            
            {activeStep === steps.length - 1 ? (
              <Button
                variant="contained"
                onClick={handleCompleteReservation}
                disabled={loading}
                sx={{ 
                  textTransform: 'none',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                }}
              >
                {loading ? 'Processing...' : 'Complete Reservation'}
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={handleNext}
                disabled={activeStep === 1 && !selectedRoomId}
                sx={{ 
                  textTransform: 'none',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                }}
              >
                Next
              </Button>
            )}
          </Box>
        </Paper>

        <Snackbar open={showSuccess} autoHideDuration={6000} onClose={() => setShowSuccess(false)}>
          <Alert severity="success">Reservation created successfully!</Alert>
        </Snackbar>

        <Snackbar open={showError} autoHideDuration={6000} onClose={() => setShowError(false)}>
          <Alert severity="error">Failed to create reservation. Please try again.</Alert>
        </Snackbar>
      </Container>
    </LocalizationProvider>
  );
}

export default Reservations;
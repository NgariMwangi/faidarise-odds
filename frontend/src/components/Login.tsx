import { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  Typography,
  Alert,
  Paper,
  CircularProgress,
} from '@mui/material';

interface Props {
  onLogin?: (token: string) => void;
}

const Login: React.FC<Props> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Store token and its expiration time (1 hour from now)
      const expirationTime = new Date().getTime() + 3600 * 1000; // 1 hour in milliseconds
      localStorage.setItem('token', data.token);
      localStorage.setItem('tokenExpiration', expirationTime.toString());

      if (onLogin) onLogin(data.token);
      
      // Redirect to the dashboard after login
      window.location.href = '/dashboard'; 
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
    >
      <Paper
        elevation={6}
        sx={{
          padding: { xs: 3, sm: 4 },
          width: '100%',
          maxWidth: 450,
          borderRadius: 4,
          border: '1px solid rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(8px)',
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
        }}
      >
        <Box textAlign="center" mb={4}>
          <Typography
            variant="h4"
            component="h1"
            sx={{
              fontWeight: 700,
              background: 'linear-gradient(45deg, #5c6bc0 30%, #3949ab 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 0.5,
            }}
          >
            Odds Place
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ letterSpacing: 1 }}
          >
            DATA ANALYTICS PLATFORM
          </Typography>
        </Box>

        {error && (
          <Alert
            severity="error"
            sx={{
              mb: 3,
              borderRadius: 2,
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            }}
          >
            {error}
          </Alert>
        )}

        <Box component="form" sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email Address"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{
              mb: 2,
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
              },
            }}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{
              mb: 1,
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
              },
            }}
          />

          <Button
            fullWidth
            variant="contained"
            onClick={handleLogin}
            disabled={isLoading}
            sx={{
              mt: 3,
              mb: 2,
              py: 1.5,
              borderRadius: 2,
              textTransform: 'none',
              fontSize: '1rem',
              fontWeight: 600,
              letterSpacing: 0.5,
              background: 'linear-gradient(45deg, #5c6bc0 0%, #3949ab 100%)',
              boxShadow: '0 4px 6px rgba(92, 107, 192, 0.3)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-1px)',
                boxShadow: '0 6px 10px rgba(92, 107, 192, 0.4)',
              },
              '&:disabled': {
                background: '#e0e0e0',
              },
            }}
          >
            {isLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              'Sign In'
            )}
          </Button>

          <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            sx={{
              mt: 3,
              fontSize: '0.8rem',
              opacity: 0.8,
            }}
          >
            © {new Date().getFullYear()} Odds Place Analytics. All rights reserved.
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;

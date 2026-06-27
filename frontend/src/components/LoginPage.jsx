import { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
  Divider,
} from '@mui/material';


import { ShieldCheck, User, Lock } from 'lucide-react';

const themeColors = {
  primary: '#0f4c81',
  secondary: '#14b8a6',
  bg: '#f4f7fb',
};

function LoginPage({ loginType, onLogin, onBack }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [patientId, setPatientId] = useState('');
  const [nic, setNic] = useState('');

  const submit = (event) => {
    event.preventDefault();

    if (loginType === 'patient') {
      onLogin({ patient_id: patientId, nic });
    } else {
      onLogin({ username, password });
    }
  };

  const title =
    loginType === 'patient'
      ? 'Patient Secure Access'
      : loginType === 'doctor'
      ? 'Doctor Clinical Portal'
      : 'Admin Control Panel';

  const subtitle =
    loginType === 'patient'
      ? 'Access your medical records and appointments securely'
      : loginType === 'doctor'
      ? 'Manage patients, OPD, and clinical workflows'
      : 'Hospital system administration and control access';

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: themeColors.bg,
        display: 'flex',
        alignItems: 'center',
        py: 6,
      }}
    >
      <Container maxWidth="md">
        <Grid container spacing={3}>

          {/* LEFT INFO PANEL */}
          <Grid item xs={12} md={5}>
            <Paper
              elevation={4}
              sx={{
                p: 4,
                borderRadius: 4,
                height: '100%',
                bgcolor: themeColors.primary,
                color: '#fff',
              }}
            >
              <Stack spacing={2}>
                <ShieldCheck size={32} />

                <Typography variant="h5" fontWeight={800}>
                  {title}
                </Typography>

                <Typography sx={{ opacity: 0.9 }}>
                  {subtitle}
                </Typography>

                <Divider sx={{ borderColor: 'rgba(255,255,255,0.2)' }} />

                <Typography variant="caption" sx={{ opacity: 0.7 }}>
                  Secure authentication &bull; ISHIS Hospital System
                </Typography>
              </Stack>
            </Paper>
          </Grid>

          {/* RIGHT FORM */}
          <Grid item xs={12} md={7}>
            <Paper
              elevation={6}
              sx={{
                p: 5,
                borderRadius: 4,
                bgcolor: '#fff',
              }}
            >
              <Stack spacing={1} mb={3}>
                <Typography variant="h4" fontWeight={800} color={themeColors.primary}>
                  Sign In
                </Typography>

                <Typography color="text.secondary">
                  Enter your credentials to continue
                </Typography>
              </Stack>

              <Box component="form" onSubmit={submit}>
                <Stack spacing={3}>

                  {loginType === 'patient' ? (
                    <>
                      <TextField
                        label="Patient ID"
                        value={patientId}
                        onChange={(e) => setPatientId(e.target.value)}
                        fullWidth
                        required
                      />

                      <TextField
                        label="NIC Number"
                        value={nic}
                        onChange={(e) => setNic(e.target.value)}
                        fullWidth
                        required
                      />
                    </>
                  ) : (
                    <>
                      <TextField
                        label="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        fullWidth
                        required
                        InputProps={{
                          startAdornment: <User size={18} style={{ marginRight: 8 }} />,
                        }}
                      />

                      <TextField
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        fullWidth
                        required
                        InputProps={{
                          startAdornment: <Lock size={18} style={{ marginRight: 8 }} />,
                        }}
                      />
                      {loginType === 'doctor' && (
                        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
                          Doctor ID is retrieved automatically once you login.
                        </Typography>
                      )}
                    </>
                  )}

                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    sx={{
                      bgcolor: themeColors.secondary,
                      fontWeight: 700,
                      py: 1.2,
                      '&:hover': {
                        bgcolor: '#0ea5a0',
                      },
                    }}
                  >
                    Login Securely
                  </Button>

                  <Button
                    variant="outlined"
                    onClick={onBack}
                    fullWidth
                  >
                    Back to Home
                  </Button>
                </Stack>
              </Box>
            </Paper>
          </Grid>

        </Grid>
      </Container>
    </Box>
  );
}

export default LoginPage;
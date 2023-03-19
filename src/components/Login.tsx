import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Alert, Snackbar } from '@mui/material';



const theme = createTheme();

type PropTypes = {
    email: string,
    password: string,
    onChangePassword: Function,
    onChangeEmail: Function,
    onSubmit: Function,
    validateEmail: Function,
    validatePassword: Function,
    emailError:string,
    passwordError:string,
    error: string,
    onCloseError: Function,
}

export default function Login(props: PropTypes) {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    props.onSubmit();
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              value={props.email}
              onChange={(event)=> props.onChangeEmail(event.target.value)}
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              error={props.emailError.length > 0}
              helperText={props.emailError}
              onBlur={(event)=> props.validateEmail()}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              value={props.password}
              onChange={(event)=> props.onChangePassword(event.target.value)}
              name="password"
              label="Password"
              type="password"
              id="password"
              error={props.passwordError.length > 0}
              helperText={props.passwordError}
              onBlur={(event)=> props.validatePassword()}
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>

          </Box>
        </Box>
        <Snackbar open={props.error.length > 0} anchorOrigin={{vertical:"top", horizontal:"right"}}  onClose={()=>props.onCloseError()}>
            <Alert onClose={()=>props.onCloseError()} severity="error" sx={{width: '100%'}}>
                {props.error}
            </Alert>
        </Snackbar>
      </Container>
    </ThemeProvider>
  );
}
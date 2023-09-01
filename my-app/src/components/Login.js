import React,{useState} from 'react'
import { Container,Typography,Stack,TextField,Button, Box } from '@mui/material';
import axios from 'axios'
function LoginPage({ onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
  
    const handleLogin = () => {
      if (username !== '' && password !== '') {
        axios
        .post("http://backend:8000/login", {
          username: username,
          password: password,
        })
        .then(function(response){
          console.log(response.data)
          if(response.data === true)
          {
            onLogin();
          }
          else {
            console.log('Login failed');
            setError(true)
            setUsername("");
            setPassword("")
          }
        })
      } 
    };
  
    return (
      <Container maxWidth='sm'>
        <Box>
        <Typography align="center" variant="h2" marginBottom={2}>
          Login
        </Typography>
        <Stack spacing={2}>
          <TextField
            label="Username"
            value={username}
            onChange={(e) => {setUsername(e.target.value);setError(false)}}
            variant="outlined"
            error = {error}
            helperText = {error && "Incorrect username"}
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => {setPassword(e.target.value);setError(false)}}
            variant="outlined"
            error = {error}
            helperText = {error && "Incorrect password"}
          />
          <Button onClick={handleLogin} variant="contained" color="primary">
            Login
          </Button>
        </Stack>
        </Box>
      </Container>
    );
  }

  export default LoginPage;
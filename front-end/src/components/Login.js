import React,{useState} from 'react'
import { CardActions, CardContent,Container,Typography,Stack,TextField,Button, Box,InputAdornment,FormControl,InputLabel,OutlinedInput, FormHelperText } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios, { HttpStatusCode } from 'axios'

function LoginPage({ onLogin }) {
    const [showPassword,setShowPassword] = useState(false)
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [signusername, setsignUsername] = useState('');
    const [signfirstname, setsignFirstname] = useState('');
    const [signlastname, setsignLastname] = useState('');
    const [signpassword, setsignPassword] = useState('');
    const [signemail, setsignEmail] = useState('');
    const [signaddress, setsignAddress] = useState('');
    const [open,setOpen] = useState(false);
    const [error, setError] = useState(false);
    const [error_text, setError_text] = useState('');

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };
  
    const handleLogin = (url,pw,user) => {
      if (user !== '' && pw !== '') {
        axios
        .post(url, {
          username: user,
          password: pw,
        },{
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
        .then(function(response){
          if(HttpStatusCode.Accepted )
          {
            onLogin(response.data.access_token);
          }
        })
        .catch(function(error){
          setError_text(error.response.data.detail)
          console.log('Login failed '+ error.response.status);
          setError(true)
        })
      } 
    };
    const handleSignup = (url,pw,user,email,address,firstname,lastname) => {
      if (user !== '' && pw !== '') {
        axios
        .post(url, {
          username: user,
          firstname:firstname,
          lastname:lastname,
          password: pw,
          email:email,
          address:address
        })
        .then(function(response){
          handleLogin("/api/login",pw,user)
          setOpen(false);
        })
        .catch(function(error){
          setError_text(error.response.data.detail)
          console.log('Signin failed ' + error.response.status);
          setError(true)
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
          />
          <FormControl variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password" error={error}>Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            value={password}
            onChange={(e) => {setPassword(e.target.value);setError(false)}}
            error = {error}
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
              label="Password"
            />
          </FormControl>
          {error === true && (<FormHelperText error={error}>{error_text}</FormHelperText>)}
          <Button onClick={()=>{handleLogin("/api/login",password,username);setUsername("");setPassword("");}} variant="contained" color="primary">
            Login
          </Button>
          <Button onClick={()=>{setOpen(true);setError(false)}} >Sign Up</Button>
          </Stack>
          <Backdrop
              open={open}
              sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
              >
              <Container maxWidth="sm">
              <Card >
                <CardContent>
                <Typography sx={{marginRight:2,marginBottom:2}} >Sign Up</Typography>
                <TextField id='FirstnameEdit_label' error = {error}
                   label="Firstname" onChange={(e) => {setsignFirstname(e.target.value);setError(false)}} value={signfirstname} sx={{marginRight:2,marginBottom:2}} ></TextField>
                <TextField id='LastnameEdit_label' label="Lastname" onChange={(e) => {setsignLastname(e.target.value);setError(false)}} value={signlastname} ></TextField>
                <TextField id='UsernameEdit_label' error = {error}
                   label="Username" onChange={(e) => {setsignUsername(e.target.value);setError(false)}} value={signusername} sx={{marginRight:2,marginBottom:2}} ></TextField>
                <TextField id='EmailEdit_label' error = {error}
                  label="Email" onChange={(e) => {setsignEmail(e.target.value);setError(false)}} value={signemail}  ></TextField>
                <TextField id='AddressEdit_label' error = {error}
                label="Address" onChange={(e) => {setsignAddress(e.target.value);setError(false)}} value={signaddress} sx={{marginRight:2,marginBottom:2}}  ></TextField>
                <FormControl variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password" error={error} >Password</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  onChange={(e) => {setsignPassword(e.target.value);setError(false)}} 
                  value={signpassword}
                  type={showPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                    label="Password"
                  />
                </FormControl>
                {error === true && (<FormHelperText error={error}>{error_text}</FormHelperText>)}
                </CardContent>
                <CardActions sx={{justifyContent:'flex-end',alignItems:'center'}}>
                  <IconButton onClick={() =>{
                    handleSignup("/api/signup",signpassword,signusername,signemail,signaddress,signfirstname,signlastname);
                    setsignAddress("");setsignEmail("");setsignPassword("");setsignUsername("");setsignLastname("");setsignFirstname("")}} ><CheckIcon sx={{color:'green'}} ></CheckIcon></IconButton>
                  <IconButton onClick={() =>{setOpen(false)}}><CloseIcon sx={{color:'red'}} ></CloseIcon></IconButton>
                </CardActions>
              </Card>
              </Container>
            </Backdrop>
        </Box>
      </Container>
    );
  }

  export default LoginPage;
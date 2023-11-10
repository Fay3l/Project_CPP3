import './../css/style.css'
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
    const [user, setUser] = useState({username:'',password:''});
    const [signuser, setSignUser] = useState({username:'',firstname:'',lastname:'',password:'',email:'',address:''});
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
          console.log(error.response.data)
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
        <Typography align="center" variant="h2" marginTop={2} marginBottom={2}>
          Login
        </Typography>
        <Stack spacing={2}>
          <TextField
            label="Username"
            className='TextFieldStyle'
            value={user.username}
            onChange={(e) => {setUser(state =>{return{...state,username:e.target.value}});setError(false)}}
            variant="outlined"
            error = {error}
          />
          <FormControl variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password" error={error}>Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            value={user.password}
            className='TextFieldStyle'
            onChange={(e) => {setUser(state =>{return{...state,password:e.target.value}});setError(false)}}
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
          <Button  onClick={()=>{handleLogin("/api/login",user.password,user.username);setUser(()=>{return{password:'',username:''}})}} variant="contained" color="primary">
            Login
          </Button>
          <Button  onClick={()=>{setOpen(true);setError(false)}} >Sign Up</Button>
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
                   label="Firstname" onChange={(e) => {setSignUser(state=>{return{...state,firstname:e.target.value}});setError(false)}} value={signuser.firstname} sx={{marginRight:2,marginBottom:2}} ></TextField>
                <TextField id='LastnameEdit_label' label="Lastname" onChange={(e) => {setSignUser(state=>{return{...state,lastname:e.target.value}});setError(false)}} value={signuser.lastname} ></TextField>
                <TextField id='UsernameEdit_label' error = {error}
                   label="Username" onChange={(e) => {setSignUser(state=>{return{...state,username:e.target.value}});setError(false)}} value={signuser.username} sx={{marginRight:2,marginBottom:2}} ></TextField>
                <TextField id='EmailEdit_label' error = {error}
                  label="Email" onChange={(e) => {setSignUser(state=>{return{...state,email:e.target.value}});setError(false)}} value={signuser.email}  ></TextField>
                <TextField id='AddressEdit_label' error = {error}
                label="Address" onChange={(e) => {setSignUser(state=>{return{...state,address:e.target.value}});setError(false)}} value={signuser.address} sx={{marginRight:2,marginBottom:2}}  ></TextField>
                <FormControl variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password" error={error} >Password</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  onChange={(e) => {setSignUser(state=>{return{...state,password:e.target.value}});setError(false)}} 
                  value={signuser.password}
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
                    handleSignup("/api/signup",signuser.password,signuser.username,signuser.email,signuser.address,signuser.firstname,signuser.lastname);
                    setSignUser(()=>{return{address:'',username:'',email:'',firstname:'',lastname:'',password:''}})}} ><CheckIcon sx={{color:'green'}} ></CheckIcon></IconButton>
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
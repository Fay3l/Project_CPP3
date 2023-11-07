import './App.css';
import LoginPage from './components/Login';
import Product from './components/Product';
import {useState} from "react";
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import {Button, Grid} from '@mui/material';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Grow from '@mui/material/Grow';
import AlertSuccess from './components/Alert_Success';
import ProductEdit from './components/Product_Edit';
import User from './components/User';
import SearchBar from './components/SearchBar';
import axios from 'axios';
import LabelBottomNavigation from './components/BottomNav';
import SearchPage from './components/SearchPage';
import UserPage from './components/UserPage';

function App() {

  const [data, setData] = useState([]);
  const [value, setValue] = useState('');
  const [data_user,setData_user]= useState([])
  const [price, setPrice] = useState('');
  const [name,setName] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [inputsearch,setInputsearch] = useState('');
  const [search, setSearch] = useState(false);
  const [token, setToken] = useState('');
  const [open, setOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [selectedProductName, setSelectedProductName] = useState('');
  const [selectedProductPrice, setSelectedProductPrice] = useState(null);
  const [alert_success,setAlert_success] = useState(false);

  const handleOpen = (id,name,price) => {setOpen(true);
      setSelectedProductId(id); 
      setSelectedProductName(name);
      setSelectedProductPrice(price);
    }
      
const handleClose = () => setOpen(false);

const value_searchbar = (value) => {console.log(value);search_username(value);setInputsearch(value)}

const search_username = (value)=>{
  axios.get('/api/users/',{
  params:{ username:value}
  })
  .then(function(response){
    setData_user(response.data)
  })
}

const Update_description = (description)=>{
  axios.post('/api/user/description/update',{
    description:description
  },{  
    headers : { 'Authorization' : 'Bearer '+token }
  })
  .then(function(response){
    setData(response.data)
    setAlert_success(true)
  })
}

const login = (token) => {
  axios.get('/api/user/me',{  
  headers : { 'Authorization' : 'Bearer '+token }
})
.then(function(response){
  setToken(token)
  setData(response.data)
  setIsLoggedIn(true)
  setValue('products')
});
}

const Addproduct = () => {
  axios.post('/api/user/product/create',{
    name: name,
    price: price
  },{  
    headers : { 'Authorization' : 'Bearer '+token }
  })
  .then(function(response){
    setData(response.data)
    setAlert_success(true)
  })
}

const Editproduct = (id,name,price) =>{
  axios.put('/api/user/product/update',{
    id:id,
    name:name,
    price: parseFloat(price)
  },{  
    headers : { 'Authorization' : 'Bearer '+token }
  })
  .then(function(response){
    setData(response.data)
    setAlert_success(true)
  })
}

const Deleteproduct = (id) =>{
  axios.delete('/api/user/product/delete/',{
  headers : { 'Authorization' : 'Bearer '+token },
  params:{ product_id:id,}
  })
  .then(function(response){
    setData(response.data)
    setAlert_success(true)
  })
}

const validatenumbers = (e)=>{
  let input = e.target.value
  if(input.match(/^([0-9]{1,})?(\.)?([0-9]{1,})?$/))
    setPrice(input)
}
  return ( 
    <Grid>
    {search === true && value ==='search' && (<Container><SearchPage setsearch={setSearch} setbottomnavigation={setValue}   search_username={search_username} value={inputsearch} data_users={data_user} setvalue={setInputsearch}></SearchPage><LabelBottomNavigation setsearch={setSearch} value={value} setValue={setValue} ></LabelBottomNavigation></Container>)}
    {isLoggedIn===false && value ==='' &&(<LoginPage onLogin={login}></LoginPage>)}
    {isLoggedIn === true && search === false && value==='profile'&&(<Container><UserPage token={setToken} islogin={setIsLoggedIn} setbottomnavigation={setValue} update_description={Update_description} data_user={data}></UserPage><LabelBottomNavigation setsearch={setSearch} value={value} setValue={setValue} ></LabelBottomNavigation></Container>)}
    {isLoggedIn === true && search === false && value ==='products' &&(
      <Box>
      <Box sx={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <SearchBar valueinput={value_searchbar} setsearch={setSearch} setvalue={setValue}  ></SearchBar>
      <Typography align='center' marginBottom={1} marginRight={35} marginTop={2} variant='h4'>Products</Typography>
      <User data_user={data} token={setToken} islogin={setIsLoggedIn} setbottomnavigation={setValue} update_description={Update_description}></User>
      </Box>
      <Container maxWidth='md'>
      <Grow direction='left' in={true} style={{ transformOrigin: '0 0 0' }}
        {...(true && { timeout: 1000 })}>
      <Box>
      <Container maxWidth='md' sx={{marginBottom:2}} >
      <Stack direction={'row'} alignItems={'center'} justifyContent={'space-around'} spacing={2}>
        <Stack direction={'row'} spacing={2}>
          <TextField id='Name_label' value={name} onChange={(e)=>setName(e.target.value)} label="Name" variant="outlined" />
          <TextField id='Price_label' value={price} onChange={(e)=>validatenumbers(e)} label="Price" variant="outlined" />
        </Stack>
        <Button onClick={()=>{Addproduct();setName("");setPrice("");}}>ADD</Button>
      </Stack>
      </Container>
      <Box ><Product data_product={data} Deleteproduct={Deleteproduct} handleOpen={handleOpen}></Product></Box></Box></Grow>
      <LabelBottomNavigation value={value} setValue={setValue} setsearch={setSearch} ></LabelBottomNavigation>
      {selectedProductId !== null && (
           <ProductEdit handleClose={handleClose} Editproduct={Editproduct} open={open} setName={setSelectedProductName} setPrice={setSelectedProductPrice} selectedProductPrice={selectedProductPrice} selectedProductId={selectedProductId} selectedProductName={selectedProductName}></ProductEdit>
        )}
        {alert_success !== false &&(
          <AlertSuccess suc_alert={alert_success} alertClose={setAlert_success}></AlertSuccess>
        )}
        </Container>
        </Box>
    )}
    </Grid>
    
  );
}
export default App;

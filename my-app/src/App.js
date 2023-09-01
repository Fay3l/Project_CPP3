import './App.css';
import LoginPage from './components/Login';
import Product from './components/Product';
import React,{useState} from "react";
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { Button} from '@mui/material';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Backdrop from '@mui/material/Backdrop';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Card from '@mui/material/Card';
import { CardActions, CardContent } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Grow from '@mui/material/Grow';

function App() {

  const [data, setData] = useState([]);
  const [number, setNumber] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [ws, setWs] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [selectedProductName, setSelectedProductName] = useState(null);
  const [selectedProductPrice, setSelectedProductPrice] = useState(null);
  const [suc_alert, setSuc_alert] = useState(false)

  const handleOpen = (id,name,price) => {setOpen(true);
      setSelectedProductId(id); 
      setSelectedProductName(name);
      setSelectedProductPrice(price);
      var name_label = document.getElementById("NameEdit_label")
      var price_label = document.getElementById("PriceEdit_label")
      if (name_label && price_label)
      {
        name_label.value = name
        price_label.value = price
      }
      }
  const handleClose = () => setOpen(false);


  function sendEditMessage() {
      if (ws && ws.readyState === WebSocket.OPEN) {
        var name = document.getElementById("NameEdit_label")
        var price = document.getElementById("PriceEdit_label")
        if(name !==""&& price !=="")
        {
          ws.send("Edit "+selectedProductId+" "+name.value+" "+price.value);
        }
        handleClose()
        ws.onmessage = (event) => {
          const json = JSON.parse(event.data);
          setData(json);
          setSuc_alert(true)
        };
      } else {
        console.log("WebSocket is not open.");
      }
    
    }
    function sendRemoveMessage(id) {
      if (ws && ws.readyState === WebSocket.OPEN) {
        ws.send("Remove "+id);
    
        ws.onmessage = (event) => {
          const json = JSON.parse(event.data);
          setData(json);
          setSuc_alert(true)
        };
      } else {
        console.log("WebSocket is not open.");
      }
    }


const login = () => {setIsLoggedIn(true);connect()}
  
const connect = () =>{
  const newWs = new WebSocket("ws://192.168.1.53:8000/products");
  setWs(newWs);

  newWs.onopen = () => {
    newWs.send("Get Product Table");
  };

  newWs.onmessage = (event) => {
    const json = JSON.parse(event.data);
    setData(json);
  };

  return () => {
    newWs.close();
  };

}

  

function sendSendMessage() {
  if (ws && ws.readyState === WebSocket.OPEN) {
    var name = document.getElementById("Name_label")
    var price = document.getElementById("Price_label")
    if(name !==""&& price !=="")
    {
      ws.send("Send "+name.value+" "+price.value);
    }
    name.value =""
    price.value = ""
    setNumber("")
    ws.onmessage = (event) => {
      const json = JSON.parse(event.data);
      setData(json);
    };
  } else {
    console.log("WebSocket is not open.");
  }
}

const validatenumbers = (e)=>{
  let input = e.target.value
  if(input.match(/^([0-9]{1,})?(\.)?([0-9]{1,})?$/))
    setNumber(input)
}

  return ( 
    <Container maxWidth='md'>
    {isLoggedIn===false &&(<LoginPage onLogin={login}></LoginPage>)}
    {isLoggedIn === true &&(
      <Container maxWidth='md'>
      <Grow direction='left' in={true} style={{ transformOrigin: '0 0 0' }}
        {...(true && { timeout: 1000 })}>
      <Box>
      <Typography align='center' marginBottom={1} marginTop={2} variant='h2'>Products</Typography>
      <Container maxWidth='sm' sx={{marginBottom:2}} >
      <Stack direction={'row'} alignItems={'center'} alignContent={'center'} spacing={2}>
        <TextField id='Name_label'   label="Name" variant="outlined" />
        <TextField id='Price_label' value={number} onChange={(e)=>validatenumbers(e)} label="Price" variant="outlined" />
        <Button onClick={sendSendMessage}>ADD</Button>
      </Stack>
      </Container>
      <Box><Product data_product={data} sendRemoveMessage={sendRemoveMessage} handleOpen={handleOpen}></Product></Box></Box></Grow>
      {selectedProductId !== null && (
           <Backdrop
              open={open}
              >
              <Container maxWidth="sm">
              <Card >
                <CardContent>
                <Typography >Edit Product</Typography>
                <Typography sx={{marginBottom:2}} >Id: {selectedProductId}</Typography>
                <TextField id='NameEdit_label' label="Name" defaultValue={selectedProductName}  sx={{marginRight:2,marginBottom:2}} ></TextField>
                <TextField id='PriceEdit_label' label="Price" defaultValue={selectedProductPrice} ></TextField>
                </CardContent>
                <CardActions sx={{justifyContent:'flex-end',alignItems:'center'}}>
                  <IconButton onClick={sendEditMessage}><CheckIcon sx={{color:'green'}} ></CheckIcon></IconButton>
                  <IconButton onClick={handleClose}><CloseIcon sx={{color:'red'}} ></CloseIcon></IconButton>
                </CardActions>
              </Card>
              </Container>
            </Backdrop>
        )}
        {suc_alert !== false &&(
          <Snackbar open={suc_alert} autoHideDuration={6000} onClose={()=>setSuc_alert(false)} anchorOrigin={{vertical:'top',horizontal:'center'}}>
            <Alert severity="success">This is a success!</Alert>
          </Snackbar>
        )}
        </Container>
    )}
    </Container>
    
  );
}

export default App;

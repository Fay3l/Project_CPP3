import Backdrop from '@mui/material/Backdrop';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import Card from '@mui/material/Card';
import { CardActions, CardContent, Tooltip } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';

function ProductEdit({selectedProductId,selectedProductName,selectedProductPrice,setProduct,open,Editproduct,handleClose}){
  const validatenumbers = (e)=>{
    let input = e.target.value
    if(input.match(/^([0-9]{1,})?(\.)?([0-9]{1,})?$/))
      setProduct(state=>{return{...state,price:validatenumbers(e.target.value)}} )
  }
  return(
    <Backdrop open={open}>
      <Container maxWidth="sm">
        <Card >
          <CardContent>
          <Typography sx={{marginBottom:2}}>Edit Product</Typography>
          <TextField id='NameEdit_label' label="Name" value={selectedProductName} onChange={e=>setProduct(state=>{return{...state,name:e.target.value}} )} sx={{marginRight:2,marginBottom:2}} ></TextField>
          <TextField id='PriceEdit_label' label="Price" value={selectedProductPrice} onChange={e=>validatenumbers(e)} ></TextField>
          </CardContent>
          <CardActions sx={{justifyContent:'flex-end',alignItems:'center'}}>
            <Tooltip title="Edit"><IconButton onClick={() =>{Editproduct(selectedProductId,selectedProductName,selectedProductPrice);handleClose()}}><CheckIcon sx={{color:'green'}} ></CheckIcon></IconButton></Tooltip>
            <Tooltip title="Cancel"><IconButton onClick={handleClose}><CloseIcon sx={{color:'red'}} ></CloseIcon></IconButton></Tooltip>
          </CardActions>
        </Card>
      </Container>
    </Backdrop>
  )
}

export default ProductEdit;
import React from "react";
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { CardActions, CardContent,Grid } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import ModeIcon from '@mui/icons-material/Mode';
import DeleteIcon from '@mui/icons-material/Delete';
import Slide from '@mui/material/Slide';




function Product({data_product,handleOpen,sendRemoveMessage}){
    
    return(
      <Container>
      <Grid container spacing={{xs: 2, md: 3}} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      {data_product.map( product => {
      return(
        <Grid item xs={6} key={product.id}>
        <Slide direction="up" in={true} mountOnEnter unmountOnExit>
        <Card >
          <CardContent>
          <Typography >Product</Typography>
          <Typography >Id: {product.id}</Typography>
          <Typography >Name: {product.name}</Typography>
          <Typography >Price: {product.price} €</Typography>
          </CardContent>
          <CardActions>
            <IconButton onClick={() => handleOpen(product.id,product.name,product.price)} ><ModeIcon sx={{color:'orange'}}></ModeIcon></IconButton>
            <IconButton onClick={() => sendRemoveMessage(product.id)}><DeleteIcon sx={{color:'red'}} ></DeleteIcon></IconButton>
          </CardActions>
        </Card>
        </Slide>
        </Grid>
        
      )
    })}</Grid>
    </Container>
    )
}

export default Product;
import React from "react";
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { CardActions, CardContent,Grid, Tooltip } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import ModeIcon from '@mui/icons-material/Mode';
import DeleteIcon from '@mui/icons-material/Delete';
import Slide from '@mui/material/Slide';




function Product({data_product,handleOpen,Deleteproduct}){
    
    return(
      <Container>
      <Grid >
        {data_product.map(pro=>{
          return(
          <Grid container spacing={{xs: 2, md: 3}} columnSpacing={{ xs: 1, sm: 2, md: 3 }} key={pro.username}>
          {pro.products.map((product)=>{
            return(
              <Grid item xs={6} key={product.id}>
              <Slide direction="up" in={true} mountOnEnter unmountOnExit>
              <Card >
              <CardContent >
              <Typography sx={{marginBottom:'2px'}} >Product</Typography>
              <Typography >Name: {product.name}</Typography>
              <Typography >Price: {product.price} €</Typography>
              </CardContent>
              <CardActions>
                  <Tooltip title='Edit'><IconButton onClick={() => handleOpen(product.id,product.name,product.price)} ><ModeIcon sx={{color:'orange'}}></ModeIcon></IconButton></Tooltip>
                  <Tooltip title='Delete'><IconButton onClick={() => Deleteproduct(product.id)}><DeleteIcon sx={{color:'red'}} ></DeleteIcon></IconButton></Tooltip>
              </CardActions>
              </Card>
              </Slide>
              </Grid>
            )
            })}
          </Grid>
          )
          })
        }
      </Grid>
    </Container>
    )
}

export default Product;
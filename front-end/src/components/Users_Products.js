import { Backdrop, Box, Card, CardActions, CardContent, IconButton, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

export default function UsersProducts({user,open,setOpen}){
    return(
        <Box>
            <Backdrop open={open} onClick={()=>{setOpen(false)}} sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Card>
                    <CardContent sx={{display:'flex',flexDirection:'column'}} >
                        {
                            user.products.map(product =>{
                                return(
                                    <Card sx={{marginBottom:2}} key={product.id}>
                                        <CardContent>
                                        <Typography>Product</Typography>
                                        <Typography>Name: {product.name}</Typography>
                                        <Typography>Price: {product.price} €</Typography>
                                        </CardContent>
                                    </Card>
                                )
                            })
                        }
                    </CardContent>
                    <CardActions>
                        <IconButton onClick={()=>setOpen(false)}><CloseIcon></CloseIcon></IconButton>
                    </CardActions>
                </Card>
            </Backdrop>
        </Box>
    )
}
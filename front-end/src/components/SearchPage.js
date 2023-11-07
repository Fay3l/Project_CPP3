import {IconButton, Typography,Paper,InputBase, Container, Box, Stack, Card, Avatar, CardContent } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useState } from "react";
import UsersProducts from "./Users_Products";


export default function SearchPage({setsearch,value,setvalue,data_users,search_username,setbottomnavigation}){
    const [open,setOpen] = useState(false);
    return(
        <Container maxWidth='sm'>
        <Box sx={{display:'flex',justifyContent:'flex-end',alignItems:'center'}}>
          <IconButton onClick={()=>{setsearch(false);setbottomnavigation('products')}}><CloseIcon sx={{color:'red'}}></CloseIcon></IconButton>
        </Box>
        <Paper
        component="form"
        sx={{display:'flex',marginBottom:2}}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search.."
            id="searchpage"
            value={value}
            onChange={(e)=>{setvalue(e.target.value);search_username(e.target.value)}}
          />
          <IconButton type="button" onClick={() => {search_username(document.getElementById('searchpage').value)}} sx={{ p: '10px'}} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
        <Stack spacing={2}>
          {data_users.map(user=>{
            return(
              <Container>
                <Card >
                  <CardContent sx={{display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                  <Avatar src="/broken-image.jpg"></Avatar>
                  <Typography>{user.username}</Typography>
                  <IconButton onClick={()=>setOpen(true)}><VisibilityIcon></VisibilityIcon></IconButton>
                  </CardContent>
                </Card>
                {open === true && (<UsersProducts user={user} open={open} setOpen={setOpen}></UsersProducts>)}
              </Container>
            )
          })}
        </Stack>
        </Container>
        

    )
}
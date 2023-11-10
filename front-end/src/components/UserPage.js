import { Avatar, Box,Button, Container, Typography,TextField, IconButton, Hidden } from "@mui/material";
import { useState } from "react";
import ModeIcon from '@mui/icons-material/Mode';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import './../css/style.css'

export default function UserPage({data_user, update_description,islogin,token,setbottomnavigation}){
    const [edit,setEdit] = useState(false);
    const [userdata,setUserData] = useState(data_user)
    return(
        <Box sx={{display: { xs: 'block', md: 'none', lg: 'none' }}}>
            <Box sx={{display:'flex',justifyContent:'center',marginBottom:1}}>
            <Box sx={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center',flexGrow:1,marginLeft:6}}>
                <Avatar></Avatar>
            </Box>
            <Box sx={{display:'flex',flexDirection:'row',justifyContent:'flex-end',alignItems:'center'}}>
                <IconButton  onClick={()=>{setbottomnavigation("products")}}>
                    <CloseIcon sx={{color:'red'}}></CloseIcon>
                </IconButton>
            </Box>
            </Box>
        <Container maxWidth='xl' sx={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
            
            {userdata.map((user,i) => {
                    return(
                        <Box>
                        <Box key={i} sx={{display:'flex',justifyContent:'center',flexDirection:'column'}} >
                            <Box className='BoxStyleUser'>
                            <Typography>Username:</Typography><TextField  sx={{marginLeft:2}} value={user.username} onChange={e => {setUserData(userdata.map(state=>
                                state.username?{...state,username:e.target.value}:{...state,username:e.target.value}))}}  disabled={!edit}></TextField>
                            </Box>
                            <Box className='BoxStyleUser'>
                            <Typography   >Firstname:</Typography><TextField value={user.firstname} sx={{marginLeft:2}}  onChange={e => {setUserData(userdata.map(state=>
                                state.firstname?{...state,firstname:e.target.value}:{...state,firstname:e.target.value}))}}  disabled={!edit}></TextField>
                            </Box>
                            <Box className='BoxStyleUser'>
                            <Typography   >Lastname:</Typography><TextField value={user.lastname} sx={{marginLeft:2}} onChange={e => {setUserData(userdata.map(state=>
                                state.lastname?{...state,lastname:e.target.value}:{...state,lastname:e.target.value}))}}  disabled={!edit}></TextField>
                            </Box>
                            <Box className='BoxStyleUser'>
                            <Typography   >Email:</Typography><TextField value={user.email} sx={{marginLeft:2}}  onChange={e => {setUserData(userdata.map(state=>
                                state.email?{...state,email:e.target.value}:{...state,email:e.target.value}))}}  disabled={!edit}></TextField>
                            </Box>
                            <Box className='BoxStyleUser'>
                            <Typography   >Address:</Typography><TextField value={user.address} sx={{marginLeft:2}}  onChange={e => {setUserData(userdata.map(state=>
                                state.address?{...state,address:e.target.value}:{...state,address:e.target.value}))}}  disabled={!edit}></TextField>
                            </Box>
                            <Typography   >Description:</Typography>
                            <Box sx={{display:'flex',flexDirection:'row'}}>
                            <TextField
                            disabled={!edit}
                            id="outlined-multiline-static"
                            onChange={e => {setUserData(userdata.map(state=>
                                state.description?{...state,description:e.target.value}:{...state,description:e.target.value}))}}
                            value={user.description}
                            multiline
                            rows={4}
                            ></TextField>
                            <Box sx={{display:'flex',flexDirection:'column-reverse'}}>
                                <IconButton onClick={() => {setEdit(true);}}><ModeIcon sx={{color:'orange'}}></ModeIcon></IconButton>
                            </Box>
                        </Box>
                        </Box>
                        <Box sx={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                            <Button sx={{marginTop:2}} onClick={()=>{islogin(false);token('');setbottomnavigation('')}}>Log out</Button>
                            {edit ? 
                                <Box>
                                    <IconButton  onClick={()=>{setEdit(false);update_description(user.description,user.username,user.firstname,user.lastname,user.email,user.address)}}>
                                        <CheckIcon sx={{color:'green'}}></CheckIcon>
                                    </IconButton>
                                    <IconButton  onClick={()=>{setEdit(false)}}>
                                        <CloseIcon sx={{color:'red'}}></CloseIcon>
                                    </IconButton>
                                </Box>:<Hidden></Hidden>
                            }
                        </Box>
                        </Box>
                    )
                })}      
        </Container>
        </Box>
    )
}
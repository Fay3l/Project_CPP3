import { Typography,IconButton, Button, Box, Avatar, Backdrop, Card, CardContent ,Hidden,TextField, Tooltip } from '@mui/material';
import ModeIcon from '@mui/icons-material/Mode';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';

function User({data_user,islogin,token,update_description,setbottomnavigation}){
    const [open,setOpen] = useState(false)
    const [edit,setEdit] = useState(false);
    const [userdata,setUserData] = useState(data_user)
    return(
        <Box sx={{display: { xs: 'none', md: 'block', lg: 'block' }}} marginRight={2}>
            <Tooltip title='Profile'><IconButton onClick={()=>setOpen(true)}><Avatar  src="/broken-image.jpg" /></IconButton></Tooltip>
            {open === true && (
                <Backdrop 
                open={open}
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Card>
                <CardContent sx={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                    <Box >
                        <Avatar src="/broken-image.jpg" />
                    </Box>
                    <IconButton onClick={()=>{setEdit(false);setOpen(false)}} ><CloseIcon sx={{color:'red'}}></CloseIcon></IconButton>
                </CardContent>
                <CardContent sx={{flexDirection:'column'}}>
                {userdata.map((user,i) => {
                    return(
                        <Box>
                        <Box key={i} sx={{display:'flex',justifyContent:'center',flexDirection:'column'}} >
                            <Box className='BoxStyleUser'>
                            <Typography>Username:</Typography><TextField  sx={{marginLeft:2}} value={user.username} onChange={e => {setUserData(userdata.map(state=>
                                state.username?{...state,username:e.target.value}:{...state,username:e.target.value}))}}  disabled={!edit}></TextField>
                            </Box>
                            <Box className='BoxStyleUser'>
                            <Typography>Firstname:</Typography><TextField value={user.firstname} sx={{marginLeft:2}}  onChange={e => {setUserData(userdata.map(state=>
                                state.firstname?{...state,firstname:e.target.value}:{...state,firstname:e.target.value}))}}  disabled={!edit}></TextField>
                            </Box>
                            <Box className='BoxStyleUser'>
                            <Typography>Lastname:</Typography><TextField value={user.lastname} sx={{marginLeft:2}} onChange={e => {setUserData(userdata.map(state=>
                                state.lastname?{...state,lastname:e.target.value}:{...state,lastname:e.target.value}))}}  disabled={!edit}></TextField>
                            </Box>
                            <Box className='BoxStyleUser'>
                            <Typography>Email:</Typography><TextField type='email' value={user.email} sx={{marginLeft:2}}  onChange={e => {setUserData(userdata.map(state=>
                                state.email?{...state,email:e.target.value}:{...state,email:e.target.value}))}}  disabled={!edit}></TextField>
                            </Box>
                            <Box className='BoxStyleUser'>
                            <Typography>Address:</Typography><TextField value={user.address} sx={{marginLeft:2}}  onChange={e => {setUserData(userdata.map(state=>
                                state.address?{...state,address:e.target.value}:{...state,address:e.target.value}))}}  disabled={!edit}></TextField>
                            </Box>
                            <Typography>Description:</Typography>
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
                            {edit ? <IconButton  onClick={()=>{setEdit(false);update_description(user.description,user.username,user.firstname,user.lastname,user.email,user.address)}}><CheckIcon sx={{color:'green'}}></CheckIcon></IconButton>:<Hidden></Hidden>}
                        </Box>
                        </Box>
                    )
                })}
                </CardContent>
                </Card>
                </Backdrop>
            )}
        </Box>
    )
}

export default User;
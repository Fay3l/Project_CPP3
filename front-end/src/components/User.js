import { Typography,IconButton, Button, Box, Avatar, Backdrop, Card, CardContent ,Hidden,TextField,InputAdornment } from '@mui/material';
import ModeIcon from '@mui/icons-material/Mode';
import CheckIcon from '@mui/icons-material/Check';
import { useState } from 'react';

function User({data_user,islogin,token,update_description,setbottomnavigation}){
    const [open,setOpen] = useState(false)
    const [edit,setEdit] = useState(false);
    const [value,setValue] = useState('')
    return(
        <Box sx={{display: { xs: 'none', md: 'block', lg: 'block' }}} marginRight={2}>
            <IconButton onClick={()=>setOpen(true)}><Avatar  src="/broken-image.jpg" /></IconButton>
            {open === true && (
                <Backdrop 
                open={open}
                onClick={()=>{setOpen(false)}}
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Card>
                <CardContent sx={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                <Avatar src="/broken-image.jpg" sx={{marginBottom:3}}/>
                {data_user.map(user => {
                    return(
                        <Box>
                            <Typography key={user.id} >Username: {user.username}</Typography>
                            <Typography key={user.id} >Firstname: {user.firstname}</Typography>
                            <Typography key={user.id} >Lastname: {user.lastname}</Typography>
                            <Typography key={user.id} >Email: {user.email}</Typography>
                            <Box sx={{display:'flex',flexDirection:'row'}}>
                            <TextField
                            disabled={!edit}
                            id="outlined-multiline-static"
                            value={value}
                            onChange={e=>setValue(e.target.value)}
                            placeholder={user.description}
                            multiline
                            rows={4}
                            InputProps={{
                                endAdornment:(
                                    <InputAdornment position="end">
                                        {edit ? <IconButton  onClick={()=>{setEdit(false);update_description(value)}}><CheckIcon sx={{color:'green'}}></CheckIcon></IconButton>:<Hidden></Hidden>}
                                    </InputAdornment>
                                )
                            }}
                            />
                            <Box sx={{display:'flex',flexDirection:'column-reverse'}}>
                                <IconButton onClick={() => {setEdit(true);setValue(user.description)}}><ModeIcon sx={{color:'orange'}}></ModeIcon></IconButton>
                            </Box>
                        </Box>
                        </Box>
                    )
                })}
                <Button sx={{marginTop:2}} onClick={()=>{islogin(false);token('');setbottomnavigation('')}}>Log out</Button>
                </CardContent>
                </Card>
                </Backdrop>
            )}
        </Box>
    )
}

export default User;
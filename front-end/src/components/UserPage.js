import { Avatar, Box,Button, Container, Typography,TextField, IconButton, InputAdornment, Hidden } from "@mui/material";
import { useState } from "react";
import ModeIcon from '@mui/icons-material/Mode';
import CheckIcon from '@mui/icons-material/Check';

export default function UserPage({data_user, update_description,islogin,token,setbottomnavigation}){
    const [edit,setEdit] = useState(false);
    const [value,setValue] = useState('')
    return(
        <Box sx={{display: { xs: 'block', md: 'none', lg: 'none' }}}>
        <Container maxWidth='xl' sx={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
            <Avatar sx={{marginBottom:2,marginTop:2}} ></Avatar>
            {data_user.map(user => { 
                return(
                    <Box>
                        <Typography key={user.id} >Username: {user.username}</Typography>
                        <Typography key={user.id} >Firstname: {user.firstname}</Typography>
                        <Typography key={user.id} >Lastname: {user.lastname}</Typography>
                        <Typography key={user.id} >Email: {user.email}</Typography>
                        <Typography key={user.id} >Description:</Typography>
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
        </Container>
        </Box>
    )
}
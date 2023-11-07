import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import CategoryIcon from '@mui/icons-material/Category';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import { Box } from '@mui/material';

export default function LabelBottomNavigation({value,setValue,setsearch}) {
  

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{display: { xs: 'block', md: 'none', lg: 'none' },position:'absolute',bottom:0,width:'95%'}} >
    <BottomNavigation sx={{display:'flex',justifyContent:'center',alignItems:'center'}} value={value} onChange={handleChange}>
      <BottomNavigationAction
        label="Search"
        value="search"
        onClick={()=>setsearch(true)}
        icon={<SearchIcon />}
      />
      <BottomNavigationAction
        label="Products"
        value="products"
        onClick={()=>setsearch(false)}
        icon={<CategoryIcon/>}
      />
      <BottomNavigationAction
        label="Profile"
        value="profile"
        onClick={()=>setsearch(false)}
        icon={<AccountCircleIcon />}
      />
    </BottomNavigation>
    </Box>
  );
}
import { Paper,InputBase,IconButton } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
export default function SearchBar({valueinput,setsearch,setvalue}) {
    return (
      <Paper
        component="form"
        sx={{ display: { xs: 'none', md: 'block', lg: 'block' }, marginLeft:2}}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search.."
          id="search"
        />
        <IconButton type="button" onClick={() => {valueinput(document.getElementById("search").value);setsearch(true);setvalue('search')}} sx={{ p: '10px' }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
    );
}
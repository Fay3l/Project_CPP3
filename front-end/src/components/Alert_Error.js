import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
function AlertError({ error_alert,alertClose,error_text}){
    return(
        <Snackbar open={error_alert} onClose={()=> alertClose(state =>{
            return{...state, error:false,error_text:''}
          })} autoHideDuration={6000}  anchorOrigin={{vertical:'top',horizontal:'center'}}>
            <Alert  severity="error">{error_text}</Alert>
        </Snackbar>
    )
}

export default AlertError;
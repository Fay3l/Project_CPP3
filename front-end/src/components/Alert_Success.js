import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
function AlertSuccess({suc_alert,alertClose}){
    return(
        <Snackbar open={suc_alert} onClose={()=> alertClose(false)} autoHideDuration={6000}  anchorOrigin={{vertical:'top',horizontal:'center'}}>
            <Alert  severity="success">This is a success!</Alert>
          </Snackbar>
    )
}

export default AlertSuccess;
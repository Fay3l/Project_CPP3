import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
function AlertSuccess({success_alert,alertClose}){
    return(
        <Snackbar open={success_alert} onClose={()=> {alertClose(state =>{return{...state, success:false}})}}
         autoHideDuration={6000}  anchorOrigin={{vertical:'top',horizontal:'center'}}>
            <Alert  severity="success">This is a success!</Alert>
        </Snackbar>
    )
}

export default AlertSuccess;
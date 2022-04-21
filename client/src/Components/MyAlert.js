import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomizedSnackbars(sev,message) {
    console.log(sev)
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Button variant="outlined" onClick={handleClick}>
        Open success snackbar
      </Button>
   {  (sev === "success" || sev === "error"
        || sev === "warning" || sev === "info"
     
   )&&(<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={sev} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>)}
   {  (sev !== "success" && sev !== "error"
        && sev !== "warning" && sev !== "info"
     
   )&&(<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>)}
 
    </Stack>
  );
}

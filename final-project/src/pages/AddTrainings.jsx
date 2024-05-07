import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';


export const AddTrainings =({data, addTrainings})=>{
    const [open, setOpen] = useState(false);
    const [trainings, setTrainings] = useState({
        date: '',
        duration: '',
        activity: '',
        customer:''
    });
    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };
    
      const handleSave = () => {
        addTrainings(trainings);
        handleClose();
      }
    return(
        <>
            <Button size="small" onClick={handleClickOpen}>
        Add Trainings
        </Button>
        <Dialog
        open={open}
        onClose={handleClose}
        >
        <DialogTitle>New Trainings</DialogTitle>
        <DialogContent>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
            margin="dense"
            label="date"
            // value={trainings.date}
            onChange={date => setTrainings({...trainings, date: date.toISOString()})}
            />
        </LocalizationProvider>
            <TextField
            margin="dense"
            label="duration"
            value={trainings.duration}
            onChange={e => setTrainings({...trainings, duration: e.target.value,customer:data})}
            fullWidth
            variant="standard"
            />
            <TextField
            margin="dense"
            label="activity"
            value={trainings.activity}
            onChange={e => setTrainings({...trainings, activity: e.target.value,customer:data})}
            fullWidth
            variant="standard"
            />
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSave}>Save</Button>
        </DialogActions>
        </Dialog>
        </>
    )
}
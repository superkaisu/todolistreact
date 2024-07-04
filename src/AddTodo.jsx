// AddTodo.jsx
import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { format, parse } from 'date-fns';

function AddTodo(props) {
    const [open, setOpen] = useState(false);
    const [todo, setTodo] = useState({
        date: '',
        description: '',
        priority: '',
      });

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const inputChanged = (e) => { 
        setTodo({
            ...todo,
            [e.target.name]: e.target.value,
        });
    }

    const handleSave = () => {
        props.addTodo(todo);
        handleClose();
    }
    return (
        <>
            <Button variant="outlined" onClick={handleOpen}>
                Add Todo
            </Button>
            <Dialog open={open}>
                <DialogTitle>
                    New Todo
                </DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        name="date"
                        type="date"
                        fullWidth
                        value={todo.date}
                        onChange={inputChanged}
                    />
                    <TextField
                        margin="dense"
                        name="description"
                        label="Description"
                        type="text"
                        fullWidth
                        value={todo.description}
                        onChange={inputChanged}
                    />
                    <TextField
                        margin="dense"
                        name="priority"
                        label="Priority"
                        type="text"
                        fullWidth
                        value={todo.priority}
                        onChange={inputChanged}
                    />
                </DialogContent>
                <DialogActions>
                    <Button color="primary" onClick={handleClose}>Cancel</Button>
                    <Button color="primary" onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </>
    );
} export default AddTodo;
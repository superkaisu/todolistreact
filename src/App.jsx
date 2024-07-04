{/*Tässä harjoituksessa meni jotain mönkään addKeys ei lisää Id */}



import { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AddTodo from './AddTodo';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

import './App.css';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';

function App() {
  const [todos, setTodos] = useState([]);

  // Define the columns and their properties

  const columnDefs = [
    { field: 'date', sortable: true, filter: true},
    { field: 'description', sortable: true, filter: true },
    { field: 'priority', sortable: true, filter: true },
    {
      headerName:'',
      field: 'id',
      width: 90,
      cellRenderer: params =>
        <IconButton onClick={() => deleteTodo(params.data.id)} size="small" color="error">
          <DeleteIcon />
        </IconButton>
    }
  ]

  // Fetch items from the database
  useEffect(() => {
    fetchItems();
  }, [])


  // Fetch items from the database
  const fetchItems = () => {
    fetch('https://todolist-fee06-default-rtdb.europe-west1.firebasedatabase.app/items/.json')
      .then(response => response.json())
      //.then(data => setTodos(Object.values(data)))
      .then(data => addKeys(data))
      .catch(err => console.error(err))
  }

    // This adds keys to todo objects, would be actually better if done when creating new todo
    const addKeys = (data) => {
      const keys = Object.keys(data);
      const valueKeys = Object.values(data).map((item, index) => 
      Object.defineProperty(item, 'id', {value: keys[index]}));
      setTodos(valueKeys);
    }

  // This method adds new todo to the db, remember to use props.addTodo in AddTodo.jsx
  const addTodo = (newTodo) => {
   fetch('https://todolist-fee06-default-rtdb.europe-west1.firebasedatabase.app/items/.json',
   {
    method: 'POST',
    body: JSON.stringify(newTodo), 
   })

   .then(response => fetchItems())
   .catch(err => console.error(err))
  }

  const deleteTodo = (id) => {
    fetch('https://todolist-fee06-default-rtdb.europe-west1.firebasedatabase.app/items/${id}.json',
      {
        method: 'DELETE',
      })
      .then(response => fetchItems())
      .catch(err => console.error(err))
  }

  return (
  <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5">
            To Do List
          </Typography>
        </Toolbar>
        </AppBar>
        <AddTodo addTodo={addTodo} /> {/* Place AddTodo component to your primary app and give the functionality to it here*/}
        <div className="ag-theme-material" style={{ height: 400, width: 700 }}>
          <AgGridReact
            rowData={todos}
            columnDefs={columnDefs}
          />
        </div>
      </>
      );
}

      export default App;

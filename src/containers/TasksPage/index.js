import React, { useEffect, useState } from 'react';
import { Button, Icon } from '@material-ui/core';
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import Close from '@material-ui/icons/Close';

import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';

import TableContainer from '@material-ui/core/Table';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

export default function TasksPage(props){
    const[state,setState] = useState({
      task : null,
      id : null,
      results : [],
      selectedRow:{},
      addVisible: false,
      confirmVisible: false,
      editVisible: false,
    })   
    
  useEffect(() => {
    console.log(props);
    getTasks();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("Name: " + name + " : " + value);
    setState((prevProps) => ({
          ...prevProps,
          [name]: value
      }));
    };
    
 
  const getTasks = () => {
    fetch('http://localhost:5000/get_all_tasks', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        setState((prevProps) => ({
          ...prevProps,
          results: responseJson.results
      }));
      })
      .catch(error => {
        
      });
  }  

  const addTaskApi = () => {
    let data={
      "id":state.id,
      "task":state.task
    }
    fetch('http://localhost:5000/add_task', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body : JSON.stringify(data)
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson)
        if(responseJson.status_code == 1){
          setState((prevProps) => ({
            ...prevProps,
            addVisible: false
          }));
        getTasks();
        }
      })
      .catch(error => {
        
      });
  }  

  const addPopup = () => {
    return (
      <div>
        <Dialog
          aria-labelledby="customized-dialog-title"
          open={state.addVisible}
        >
          <DialogTitle id="customized-dialog-title">
            Add New Task
            <IconButton
              style={{ float: 'right', color: 'red' }}
              onClick={() => {
                setState((prevProps) => ({
                  ...prevProps,
                  "addVisible": false
                }));
              }}
            >
              <Close />
            </IconButton>
          </DialogTitle>

          <DialogContent>
            <DialogContentText>
              To add, please enter task.
            </DialogContentText>

              <div className="field-box">
              <TextField
                name="id"
                label="Task Id"
                placeholder="task_id"
                style={{width: '250px'}}
                variant="outlined"
                onChange={handleChange}
              />
              </div>

              <br></br>

              <div className="field-box">

              <TextField
                name="task"
                label="Task"
                placeholder="task_name"
                style={{width: '250px'}}
                variant="outlined"
                onChange={handleChange}
              />
              </div>

          </DialogContent>

          <DialogActions>
            <Button
              color="primary"
              onClick={() => {
                setState((prevProps) => ({
                  ...prevProps,
                  "addVisible" : false
                }));
              }}
            >
              Cancel
            </Button>

            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                addTaskApi()
              }}
            >
              Add Task
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }

  const updateApi = (id) => {
    let data = {
      "task": state.task
    }
    console.log("Data",data)
    fetch('http://localhost:5000/update_task/'+ id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(responseJson => {

        console.log('responseJson')
        console.log(responseJson)
        setState((prevProps) => ({
          ...prevProps,
          editVisible: false
        }));
        getTasks();

      })
      .catch(error => {
        // this.setState({
        //   isLoading: false,
        //   error: 'Request Failed! Internal server error occurred.',
        // });

      });
  }

  const updatePopup = () => {
    return (
      <div>
        <Dialog
          aria-labelledby="customized-dialog-title"
          open={state.editVisible}
        >
          <DialogTitle id="customized-dialog-title">
            Update Task
            <IconButton
              style={{ float: 'right', color: 'red' }}
              onClick={() => {
                setState((prevProps) => ({
                  ...prevProps,
                  "editVisible": false
                }));
              }}
            >
              <Close />
            </IconButton>
          </DialogTitle>

          <DialogContent>
            <DialogContentText>
              To update, please enter new task.
            </DialogContentText>

              <div className="field-box">
              <TextField
                name="task"
                label="Task"
                placeholder="Task"
                onChange={handleChange}
              />
              </div>

          </DialogContent>

          <DialogActions>
            <Button
              color="primary"
              onClick={() => {
                setState((prevProps) => ({
                  ...prevProps,
                  "editVisible" : false
                }));
              }}
            >
              Cancel
            </Button>

            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                console.log("id is",state.selectedRow)
                updateApi(state.selectedRow.id)
              }}
            >
              Update
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }

  const deleteApi = (id) => {
    
    fetch('http://localhost:5000/delete_task/'+ id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(responseJson => {

        console.log('responseJson')
        console.log(responseJson)
        setState((prevProps) => ({
          ...prevProps,
          confirmVisible: false
        }));
        getTasks();

      })
      .catch(error => {
        // this.setState({
        //   isLoading: false,
        //   error: 'Request Failed! Internal server error occurred.',
        // });

      });
  }

  const deletePopup = () => {
    return (
      <div>
        <Dialog
          aria-labelledby="customized-dialog-title"
          open={state.confirmVisible}
        >
          <DialogTitle id="customized-dialog-title">
            Delete Task
          </DialogTitle>

          <DialogContent>
            <DialogContentText>
              Do you want to delete this task?
            </DialogContentText>

          </DialogContent>

          <DialogActions>
            <Button
              color="primary"
              onClick={() => {
                setState((prevProps) => ({
                  ...prevProps,
                  confirmVisible : false
                }));
              }}
            >
              No
            </Button>

            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                deleteApi(state.selectedRow.id)
              }}
            >
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }

  const tasksScreen = () => {
    return (
      <div>
        <h1>Add Your To Do</h1>
        <IconButton color="primary" aria-label="add" 
        style={{fontSize:'10px'}}
        onClick={()=>{
          setState((prevProps) => ({
            ...prevProps,
            addVisible:true
          }));
      
        }}
        >
            <AddIcon />
        </IconButton>
        
        <TableContainer>          
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Task</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {state.results.map((row, index) => (
                <TableRow key={row.index}>
                  <TableCell>{row.task}</TableCell>
                  <TableCell>
                    <IconButton
                    onClick={(e) => {
                      console.log("row",row);
                      setState((prevProps) => ({
                        ...prevProps,
                        selectedRow: row, 
                        row_id : row.id,
                        editVisible:true
                      }));
                  
                    }}
                    >
                    <Edit />
                    </IconButton>
                  </TableCell>

                  <TableCell>
                  <IconButton
                    onClick={() => {
                      setState((prevProps) => ({
                        ...prevProps,
                        selectedRow: row,
                        confirmVisible: true 
                      }));
                
                      }}>
                    <Delete color="secondary" />
                  </IconButton>
                  </TableCell>
                  
                </TableRow>
              ))}

            </TableBody>
          </Table>
          </TableContainer>
      </div>
    );
}

let form = tasksScreen();
var _updatePopup = <div></div>;
var _addPopup = <div></div>;
var _delPopup = <div></div>;

if (state.editVisible){
  _updatePopup = updatePopup();
}
if (state.addVisible){
  _addPopup = addPopup();
}
if (state.confirmVisible){
  _delPopup = deletePopup();
}

return (
  <div>  
    {form}
    {_addPopup}
    {_updatePopup}
    {_delPopup}
  </div>
);
}
import {  useEffect, useState,Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { ColumnContainer, RowContainer } from "../../components/Container";
import { TaskService } from "../../services/tasks";
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { Link } from "react-router-dom";
import SearchX from "../../components/search";
import { Checkbox, InputLabel,Dialog, DialogTitle,DialogContent,DialogActions,Button } from "@mui/material";
import Loader from "../../components/Loader";
import theme from "../../theme/theme";

type DialogDeleteTaskProps = {
    data:any;
}

const  DialogConfirmation = ({data}:DialogDeleteTaskProps) => {
    const [open, setOpen] = useState(true);
    
    const handleClose = () => {
      setOpen(false);
      data.closeFunc()
    };
    
    return (
      <div>      
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            <ColumnContainer style={{justifyContent:'space-between',alignItems:'flex-end'}}>
              <h3>{data.actionName} </h3>
            </ColumnContainer>
          </DialogTitle>
          <DialogContent> 
                <h3>{data.name}</h3>
          </DialogContent>
          <DialogActions>
            <RowContainer>
              <Button onClick={()=>{
                data.func();
              }}>
                Sim
              </Button>
              <Button onClick={()=>{
                handleClose()
              }}>
                Não
              </Button>
            </RowContainer>
          </DialogActions>
        </Dialog>
      </div>
    );
    }
    



interface Task{
    id?:number;
    name:string;
    completed:boolean;
    description:string;
    OnDelete?:()=>void;
    onComplete?:()=>void;
}

const CardTask = ({name,completed,description,id,OnDelete,onComplete}:Task) => {

    const navigate = useNavigate();

    return   <Box sx={{ minWidth: 275 }} >
    <Card variant="outlined" style={{backgroundColor:`${completed ? theme.colors.green :theme.colors.red}`,cursor:'pointer'}}>
        <Fragment>
        <CardContent>
        <Typography  variant="h3">
           {name}
        </Typography>
        <Typography variant="h5" component="div">
           {description}
        </Typography>
        </CardContent>
        <CardActions>
          {
            !completed &&   <Button type="button" style={{color:'white'}} onClick={onComplete}>
            <CheckCircleIcon/>
        </Button>
          }

        <Button type="button" style={{color:'white'}}  onClick={() => navigate(`/tasks/${id}`)}>
            <EditIcon/>
        </Button>
        <Button type="button" style={{color:'white'}} onClick={OnDelete}>
            <DeleteIcon/>
        </Button>
        </CardActions>
    </Fragment>
    </Card>
  </Box>
}

const TaskList = () => {
    
    const [tasks,setTasks] = useState([]);
    const [tasksCompleted,setTasksCompleted] = useState(false);
    const [tasksNotCompleted,setTasksNotCompleted] = useState(false);
    const [loading,setLoading] = useState(false);

    const [visible,setVisible] = useState(false)
    const [dataConfirmation, setDataConfirmation] = useState(null);


    const fetchDataTaskList = async () => {
        if(localStorage.getItem('token')){
         const resultTasks = await TaskService.all();
         localStorage.setItem('tasks',JSON.stringify(resultTasks.data))
         setTasks(resultTasks.data);
        }
     }


    useEffect(()=>{
        fetchDataTaskList()
    },[]);
    
    if(loading){
      return <Loader/>
    }

    return (
        <ColumnContainer>  
          <Link to='/create'>
            <AddIcon/>
           </Link>
           <SearchX handleClick={async (inputRef)=>{
                   const valFilter = inputRef.current.querySelector('input').value
                  
                   let filtredTasks = tasks.filter(({name,description}) => name.toLowerCase().includes(valFilter.toLowerCase())
                   || description.toLowerCase().includes(valFilter.toLowerCase())
                   )

                   if(!valFilter){
                    if(localStorage.getItem('tasks')){
                        filtredTasks = JSON.parse(localStorage.getItem('tasks'))
                    }
                   }

                   if(tasksCompleted  && !tasksNotCompleted){
                    filtredTasks = filtredTasks.filter(({completed}) => completed)
                   }

                   if(tasksNotCompleted && !tasksCompleted){
                    filtredTasks = filtredTasks.filter(({completed}) => !completed)
                   }

                   setTasks(filtredTasks)

           }} />

           <RowContainer style={{justifyContent:'center',alignItems:'center'}}>
            <InputLabel htmlFor="Completed">Tasks Completed </InputLabel>
                <Checkbox  checked={tasksCompleted}
                        onChange={(evt) => setTasksCompleted(evt.target.checked)}
                        inputProps={{ 'aria-label': 'controlled' }}
                        /> 

            <InputLabel htmlFor="Completed">Tasks Not Completed </InputLabel>
                <Checkbox  checked={tasksNotCompleted}
                        onChange={(evt) => setTasksNotCompleted(evt.target.checked)}
                        inputProps={{ 'aria-label': 'controlled' }}
                        /> 
           </RowContainer>

           {
                  visible &&  <DialogConfirmation data={dataConfirmation}/>
            }
                   
            {
                tasks.map(({name,completed,description,id}:Task) => <CardTask key={id} id={id}  name={name} description={description} completed={completed} OnDelete={
                    
                   () => {
                    setDataConfirmation({
                        actionName:'Deseja realmente deletar esta task ?',
                        name,
                        func:async ()=>{
                            await TaskService.deleteById(id);
                            const newTasks = tasks.filter((task) => task.id !== id);
                            setTasks(newTasks);
                       },
                         closeFunc:()=>{
                           setVisible(false);
                         }
                    });

                    setVisible(true);
                    
                   }
                    
                }

                onComplete={
                    () => {
                        setDataConfirmation({
                            actionName:'Deseja realmente completar esta task ?',
                            name,
                            func:async ()=>{
                                let taskCompleted = {name,completed:true,description,id};

                                const newTasksCompleted = [];
            
                                tasks.forEach((task) => {
                                    if(task.id == id){
                                        task = taskCompleted;
                                    }
            
                                    newTasksCompleted.push(task);
                                })
            
                                if(localStorage.getItem('tasks')){
                                  localStorage.setItem('tasks',JSON.stringify(newTasksCompleted))
                                }
            
                                await TaskService.complete(id);
            
                                setTasks(newTasksCompleted)
                           },
                             closeFunc:()=>{
                               setVisible(false);
                             }
                        });
    
                        setVisible(true);
                        
                    }
                }
                    
                />)
            }
        </ColumnContainer>
    )
}

export default TaskList;
import {  useEffect, useState,Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { ColumnContainer } from "../../components/Container";
import { TaskService } from "../../services/tasks";
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { Link } from "react-router-dom";



interface Task{
    id?:number;
    name:string;
    completed:boolean;
    description:string;
    OnDelete?:()=>void;
}
const CardTask = ({name,completed,description,id,OnDelete}:Task) => {

    const navigate = useNavigate();

    return   <Box sx={{ minWidth: 275 }} >
    <Card variant="outlined" style={{backgroundColor:`${completed ? '#00ff00' :'#ff0000'}`,cursor:'pointer'}}>
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
            !completed &&   <Button type="button" style={{color:'white'}}>
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

    useEffect(()=>{
        async function fetchDataTaskList(){
            const resultTasks = await TaskService.all();
            setTasks(resultTasks.data)
        }

        fetchDataTaskList()
    },[]);

    return (
        <ColumnContainer>  
          <Link to='/create'>
            <AddIcon/>
           </Link>
            {
                tasks.map(({name,completed,description,id}:Task) => <CardTask key={id} id={id}  name={name} description={description} completed={completed} OnDelete={async () => {
                    await TaskService.deleteById(id);
                    const newTasks = tasks.filter((task) => task.id !== id);
                    setTasks(newTasks);
                }} />)
            }
        </ColumnContainer>
    )
}

export default TaskList;
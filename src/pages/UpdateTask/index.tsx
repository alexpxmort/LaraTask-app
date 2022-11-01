import { useState } from "react";
import { useParams } from "react-router-dom";
import { ColumnContainer } from "../../components/Container";
import FormTask from "../../components/FormTask";
import ToasterX from "../../components/ToasterX";
import { TaskService } from "../../services/tasks";

const UpdateTask = () => {
    const {id} = useParams();
    const [visibleToast,setVisibleToast] = useState(false);
    const [type,setType] = useState('success');
    const [message,setMessage] = useState('');


    return (
        <ColumnContainer>  
            <FormTask isEdit={true} onSubmit={async (dataForm) => {
                const {name,description,completed = false} = dataForm

                try{
                    await TaskService.update(Number(id),{
                        name,
                        description,
                        completed
                    })

                    
                    setMessage('Task updated successfully!');
                    setVisibleToast(true);
                }catch(err){
                    setMessage(`${err.message}`);
                    setVisibleToast(true);
                }

            }}

            fillFields={async () => {
                return await new Promise(async (resolve,reject) => {
                    const task = await TaskService.getById(Number(id))

                    resolve(task.data)
                })
            }}
            
            />

            {
                visibleToast && <ToasterX type={type} message={message}/>
            }
        </ColumnContainer>
    )
}

export default UpdateTask;
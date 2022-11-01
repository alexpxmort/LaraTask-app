import { useState } from "react";
import { ColumnContainer } from "../../components/Container";
import FormTask from "../../components/FormTask";
import { TaskService } from "../../services/tasks";
import ToasterX from "../../components/ToasterX";


const CreateTask = () => {
    const [visibleToast,setVisibleToast] = useState(false);
    const [type,setType] = useState('success');
    const [message,setMessage] = useState('');

    return (
        <ColumnContainer>  
            <FormTask isEdit={false} onSubmit={async (dataForm) => {
                const {name,description,completed = false} = dataForm

                try{
                    await TaskService.create({
                        name,
                        description,
                        completed
                    })


                    setMessage('Task created successfully!');
                    setVisibleToast(true);
                
                }catch(err){
                    setMessage(`${err.message}`);
                    setVisibleToast(true);
                }
            }}/>

            {
                visibleToast && <ToasterX type={type} message={message}/>
            }
        </ColumnContainer>
    )
}

export default CreateTask;
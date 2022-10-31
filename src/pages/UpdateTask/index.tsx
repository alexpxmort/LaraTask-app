import { useParams } from "react-router-dom";
import { ColumnContainer } from "../../components/Container";
import FormTask from "../../components/FormTask";
import { TaskService } from "../../services/tasks";

const UpdateTask = () => {
    const {id} = useParams();

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

                    alert('scuesso')
                }catch(err){
                    console.log(err)
                }

            }}

            fillFields={async () => {
                return await new Promise(async (resolve,reject) => {
                    const task = await TaskService.getById(Number(id))

                    resolve(task.data)
                })
            }}
            
            />
        </ColumnContainer>
    )
}

export default UpdateTask;
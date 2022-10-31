import { useContext } from "react";
import { ColumnContainer } from "../../components/Container";
import FormTask from "../../components/FormTask";
import { AuthContext } from "../../contexts/auth.context";
import { TaskService } from "../../services/tasks";

const CreateTask = () => {
    const {user} = useContext(AuthContext)
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

                    alert('scuesso')
                }catch(err){
                    console.log(err)
                }

            }}/>
        </ColumnContainer>
    )
}

export default CreateTask;
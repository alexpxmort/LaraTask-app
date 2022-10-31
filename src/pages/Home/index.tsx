import { useContext } from "react";
import { ColumnContainer } from "../../components/Container";
import FormTask from "../../components/FormTask";
import { AuthContext } from "../../contexts/auth.context";

const Home = () => {
    const {user} = useContext(AuthContext)
    return (
        <ColumnContainer>  
            <FormTask isEdit={false} onSubmit={(dataForm) => {
               console.log(dataForm)
            }} fillFields={async ()=>{
               return await new Promise((resolve,reject) => resolve({
                id:1,
                name:'2e324',
                description:'fsafs',
                completed:true
               }))
            }}/>
        </ColumnContainer>
    )
}

export default Home;
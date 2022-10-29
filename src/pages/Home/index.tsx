import { useContext } from "react";
import { AuthContext } from "../../contexts/auth.context";

const Home = () => {
    const {user} = useContext(AuthContext)
    return (
        <>  
            <h1>ola  {user?.email}</h1>
        </>
    )
}

export default Home;
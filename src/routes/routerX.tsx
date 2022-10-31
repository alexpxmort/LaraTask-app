import { useContext } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route    
  } from "react-router-dom";
import NavBar from "../components/shared/navbar";
import { AuthContext } from "../contexts/auth.context";
import CreateTask from "../pages/CreateTask";
import Home from "../pages/Home";
 import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import UpdateTask from "../pages/UpdateTask";


const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
        </Routes>
    )
}

const AuthRoutes = () => {
    return (
        <Routes>
            <Route path="/home" element={<Home />} /> 
            <Route path="/create" element={<CreateTask />} /> 
            <Route path="/tasks/:id" element={<UpdateTask />} /> 
        </Routes>
    )
}

export default function RouterX() {
    const {signed} = useContext(AuthContext);

    return (
      <>
        <NavBar/>
        <Router>
            {signed ? <AuthRoutes/> : <AppRoutes/>}
        </Router>
      </>
    );
  }

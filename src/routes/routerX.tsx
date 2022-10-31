import { useContext } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route    
  } from "react-router-dom";
import NavBar from "../components/shared/navbar";
import { AuthContext } from "../contexts/auth.context";
import Home from "../pages/Home";
 import Login from "../pages/Login";
import SignUp from "../pages/SignUp";


const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/home" element={<Home />} /> 

        </Routes>
    )
}

const AuthRoutes = () => {
    return (
        <Routes>
            <Route path="/home" element={<Home />} /> 
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

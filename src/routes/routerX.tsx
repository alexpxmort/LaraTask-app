import {
    BrowserRouter as Router,
    Routes,
    Route,
    
  } from "react-router-dom";
import { AuthContextProvider } from "../contexts/auth.context";
import Home from "../pages/Home";
 import Login from "../pages/Login";
import SignUp from "../pages/SignUp";

  
export default function RouterX() {
    return (
      <AuthContextProvider>
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/home" element={<Home />} />
            </Routes>
        </Router>
      </AuthContextProvider>
    );
  }

import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


interface ToasterXprops{
    message:string;
    type:any;
}
const ToasterX = ({message,type}:ToasterXprops) =>{


    useEffect(() => {
        toast(message,{type});
    },[])
    
    return (
        <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        />
    )
}

export default ToasterX;
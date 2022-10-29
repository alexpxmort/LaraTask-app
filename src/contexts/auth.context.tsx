import {createContext, useEffect, useState} from 'react'
import { LoginService } from '../services/login';


type User = {
    name:string;
    email:string;
    password:string;
}

type AuthContextType = {
    signed:boolean;
    user:User | null;
    signIn:(email:string,password:string)=>Promise<any>;
    signOut:()=>void;
}

export const AuthContext = createContext({
    user: null,
    signed:false,
    signIn:(email:string,password:string) => {},
    signOut:()=>{}
} as AuthContextType)




export const AuthContextProvider = ({children})=>{
    const [user,setUser] = useState<User | null>(null)


    useEffect(()=>{
        const userStorage = localStorage.getItem('user')
        if(userStorage){
            setUser(JSON.parse(userStorage || ''))
        } 

        if(window.location.pathname.includes('login') && userStorage){
            window.location.href= '/home';
        }

        if(!window.location.pathname.includes('login') && !userStorage){
            window.location.href= '/login';
        }
    },[])

    const signOut = ()=>{
        localStorage.removeItem('token')
        localStorage.removeItem('user');
    }

    const signIn = async (email:string,password:string)=>{
        const resp  = await LoginService.login(email,password);

        const {user = {email:'lexpdigi@gmail.com'},token}  = resp.data;
        setUser(user)

        localStorage.setItem('user',JSON.stringify(user));
        localStorage.setItem('token',token);
       
    }
    return <AuthContext.Provider value={{user,signIn,signed:!!user,signOut}}>
        {children}
    </AuthContext.Provider>
}
import {createContext, useEffect, useState} from 'react'
import { LoginService } from '../services/login';


type User = {
    name:string;
    email:string;
}

type AuthContextType = {
    signed:boolean;
    user:User | null;
    signIn:(email:string,password:string)=>Promise<any>;
    signOut():void;
}

export const AuthContext = createContext({} as AuthContextType)




function getInitialState() {
    const user = localStorage.getItem('user')
    return user ? JSON.parse(user) : null
  }

export const AuthContextProvider = ({children})=>{

    const [user,setUser] = useState<User | null>(getInitialState);



    function signOut (){
        localStorage.removeItem('token')
        localStorage.removeItem('user');
        setUser(null);
    }

    async function signIn (email:string,password:string) {
        const resp  = await LoginService.login(email,password);

        const {user = {email:'lexpdigi@gmail.com',name:'test'},token}  = resp.data;
        setUser(user)


        localStorage.setItem('token',token)
        localStorage.setItem('user',JSON.stringify(user));      
    }


    return <AuthContext.Provider value={{user,signIn,signed:!!user,signOut}}>
        {children}
    </AuthContext.Provider>
}
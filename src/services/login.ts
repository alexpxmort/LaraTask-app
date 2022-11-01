import { api, generateConfig } from "./api"

type DataAuth = {
   token:string
}


type TokenResp = {
    data:DataAuth
}

export const LoginService = {

 async login(email:string,password:string):Promise<any>{
    try{
     const resp:TokenResp =   await api.post('/auth/login',{
         email:email.trim(),
         password:password.trim()
     })
 
     return resp
    }catch(err){
         throw err ;
    }
 },
 async logOut():Promise<any>{
    try{
       await api.post('/auth/logOut',{},generateConfig(localStorage.getItem('token')))
    }catch(err){
         throw err ;
    }
 }
}

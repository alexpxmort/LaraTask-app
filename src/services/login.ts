import { api } from "./api"

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
 }
}

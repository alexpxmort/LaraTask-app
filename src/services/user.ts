import { api } from "./api"


type UserDto = {
    name:string;
    password:string;
    email:string;
}

export const UserService = {

 async create(userDto:UserDto):Promise<any>{
    try{
     const resp =   await api.post('/users/create',userDto)
 
     return resp
    }catch(err){
         throw err ;
    }
 }
}

import { api, config } from "./api"


type TaskDto = {
    id?:number;
    name:string;
    description:string;
    completed:boolean;
}

export const TaskService = {

 async create(userDto:TaskDto):Promise<any>{
    try{
     const resp =   await api.post('/tasks/create',userDto,config)
 
     return resp
    }catch(err){
         throw err ;
    }
 },
 async all():Promise<any>{
    try{
     const resp =   await api.get('/tasks',config)
 
     return resp
    }catch(err){
         throw err ;
    }
 },
 async getById(id:number):Promise<any>{
    try{
     const resp =   await api.get(`/tasks/${id}`,config)
 
     return resp
    }catch(err){
         throw err ;
    }
 },
 async deleteById(id:number):Promise<any>{
    try{
     const resp =   await api.delete(`/tasks/${id}`,config)
 
     return resp
    }catch(err){
         throw err ;
    }
 },
 async update(id:number,userDto:TaskDto):Promise<any>{
    try{
     const resp =   await api.put(`/tasks/${id}`,userDto,config)
 
     return resp
    }catch(err){
         throw err ;
    }
 },
}

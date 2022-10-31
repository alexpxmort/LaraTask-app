import { ColumnContainer, RowContainer } from "./Container";
import {InputLabel,FormControl,Button,Input, FormControlLabel,Checkbox} from "@mui/material";
import { useRef, useState,useContext, useEffect } from "react";
import { FormInterface } from "./interfaces/FormInterface";
import AlertX from "./AlertX";
import { InputHelper } from "../helpers/InputHelper";
import ValidateHelper from "../helpers/validateHelper";




const FormTask = ({onSubmit,isEdit,fillFields} :FormInterface) => {

    const [showErrors,setShowErrors] = useState(false)
    const [title,setTitle] = useState('')
    const [completed,setCompleted] = useState(false);
    const [tasdkId,setTaskId] = useState(null);


    const nameInputRef  = useRef<HTMLInputElement>(null)
    const descriptionInputRef  = useRef<HTMLInputElement>(null)

    const setFields = (data:{name:string,description:string,completed:boolean,id?:number}) => {

        const  {name,description,completed = false,id} = data

        if(name){
            nameInputRef.current.value = name
        }

        if(description){
            descriptionInputRef.current.value = description
        }

        if(id){
            setTaskId(id);
        }

        setCompleted(completed)
        
    }

    const _submit = () => {

        const name  = InputHelper.getValue(nameInputRef)
        const description  = InputHelper.getValue(descriptionInputRef)
    

        ValidateHelper.showMessageFields([
            {
                ref:nameInputRef,
                field:name
            },
            {
                ref:descriptionInputRef,
                field:description
            }
        ])

        if(!name || !description ){
            return false
        }


        const dataFormTask = {
            name,
            description,
            completed
        }

        if(isEdit){
            dataFormTask['id'] = tasdkId;
        }

        onSubmit(dataFormTask);
    }


    useEffect( ()=>{
    
        async function fetchData() {
            if(isEdit){
                const result = await fillFields();
                setFields(result);
                
            }
        }

        fetchData()
    },[])

    return (
        <ColumnContainer style={{alignItems:'center',marginTop:40}}>
        <FormControl className='input_container'>
            <InputLabel htmlFor="Name">Name</InputLabel>
            <Input className='input' id="name" name='name' aria-describedby="name" type="text"  required inputRef={nameInputRef}/>
        </FormControl>
        <FormControl className='input_container'>
            <InputLabel htmlFor="Description">Description</InputLabel>
            <Input className='input' id="description" name='description' aria-describedby="description" type='text' required  inputRef={descriptionInputRef}/>
        </FormControl>

        <RowContainer style={{alignItems:'center',justifyContent:'center'}}>
            <InputLabel htmlFor="Completed">Completed </InputLabel>
            <Checkbox  checked={completed}
            onChange={(evt) => setCompleted(evt.target.checked)}
            inputProps={{ 'aria-label': 'controlled' }}
            /> 
        </RowContainer>



        <Button onClick={_submit} color="primary"variant="contained" size="medium"  style={{width:'50%',display:'block',margin:'auto',marginTop:'15px'}}>
            {isEdit ? 'Atualizar' : 'Salvar'}
        </Button>

        {
            (showErrors)? (
                <AlertX label='Aviso!' title={title} type={'warning'}/>
            ):null
        }


    </ColumnContainer>
    )
}

export default FormTask;
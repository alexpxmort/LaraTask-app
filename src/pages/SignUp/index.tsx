import {InputLabel,FormControl,Button,Input} from "@mui/material";
import { useRef, useState,useContext } from "react";
import AlertX from "../../components/AlertX";

import { ColumnContainer } from "../../components/Container";
import { AuthContext } from "../../contexts/auth.context";
import { InputHelper } from "../../helpers/InputHelper";
import ValidateHelper from "../../helpers/validateHelper";
import { UserService } from "../../services/user";
import { validateService } from "../../services/validateService";

const SignUp = () => {
    const [showErrors,setShowErrors] = useState(false)
    const [showSuccess,setShowSuccess] = useState(false)
    const [title,setTitle] = useState('')

    const nameInputRef  = useRef<HTMLInputElement>(null)
    const emailInputRef  = useRef<HTMLInputElement>(null)
    const passwordInputRef  = useRef<HTMLInputElement>(null)
    const passwordConfirmationInputRef  = useRef<HTMLInputElement>(null)


    const _signUp = async ()=>{
        const email  = InputHelper.getValue(emailInputRef)
        const name  = InputHelper.getValue(nameInputRef)
        const password  = InputHelper.getValue(passwordInputRef)
        const passwordConfirmation  = InputHelper.getValue(passwordConfirmationInputRef)
    

        ValidateHelper.showMessageFields([
            {
                ref:emailInputRef,
                field:email
            },
            {
                ref:passwordInputRef,
                field:password
            },
            {
                ref:passwordConfirmationInputRef,
                field:passwordConfirmation
            },
            {
                ref:nameInputRef,
                field:name
            }
        ])

        if(!email || !password || !passwordConfirmation || !name ){
            return false
        }

        if(!validateService.comparePasswords(password,passwordConfirmation)){
            setShowErrors(true)
            setTitle('As senhas nao conferem!')
            return false
        }else{
            setShowErrors(false)
            setTitle('')
        }

        if(!validateService.validateEmail(email)){
            setShowErrors(true)
            setTitle('Email invalido!')
            return false
        }else{
            setShowErrors(false)
            setTitle('')
        }


        try{
             await  UserService.create({
                email,
                password,
                name
            })


            setShowSuccess(true)
            setTitle(`Usuario criado com Sucesso!`)
            
        }catch(err){
            console.log(err);
            setShowErrors(true)
            setTitle(err.response ? err.response.data.msg: err.message)
        }
    }


    return (
        <ColumnContainer style={{alignItems:'center',marginTop:'100px'}}>
            <FormControl className='input_container'>
                <InputLabel htmlFor="Name">Name</InputLabel>
                <Input className='input' id="name" name='name' aria-describedby="name" type="text"  required inputRef={nameInputRef}/>
            </FormControl>
            <FormControl className='input_container'>
                <InputLabel htmlFor="Email">Email</InputLabel>
                <Input className='input' id="email" name='email' aria-describedby="email" type="text"  required inputRef={emailInputRef}/>
            </FormControl>

            <FormControl className='input_container'>
                <InputLabel htmlFor="Password">Password</InputLabel>
                <Input className='input' id="password" name='password' aria-describedby="password" type="password"  required inputRef={passwordInputRef}/>
            </FormControl>


            <FormControl className='input_container'>
                <InputLabel htmlFor="Password Confirmation">Password Confirmation</InputLabel>
                <Input className='input' id="password_confirmation" name='password_confirmation' aria-describedby="password_confirmation" type="password"  required inputRef={passwordConfirmationInputRef}/>
            </FormControl>
         

            <Button onClick={_signUp} color="primary"variant="contained" size="medium"  style={{width:'50%',display:'block',margin:'auto',marginTop:'15px'}}>
                Cadastrar
            </Button>

            {
                (showErrors)? (
                    <AlertX label='Aviso!' title={title} type={'warning'}/>
                ):null
            }
            {
                (showSuccess)? (
                    <AlertX label='Aviso!' title={title} type={'info'}/>
                ):null
            }
        </ColumnContainer>
    );
}

export default SignUp;
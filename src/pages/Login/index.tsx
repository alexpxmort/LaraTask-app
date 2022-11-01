import {InputLabel,FormControl,Button,Input} from "@mui/material";
import { useRef, useState,useContext } from "react";
import { Link } from "react-router-dom";
import AlertX from "../../components/AlertX";
import {useNavigate} from 'react-router-dom'

import {FormLoginContainer } from "../../components/Container";
import { AuthContext } from "../../contexts/auth.context";
import { InputHelper } from "../../helpers/InputHelper";
import ValidateHelper from "../../helpers/validateHelper";
import { validateService } from "../../services/validateService";

const Login = () => {
    const [showErrors,setShowErrors] = useState(false)
    const [title,setTitle] = useState('')
    const {signIn} = useContext(AuthContext);

    const emailInputRef  = useRef<HTMLInputElement>(null)
    const passwordInputRef  = useRef<HTMLInputElement>(null)
    const navigate = useNavigate()


    const _login = async ()=>{
        const email  = InputHelper.getValue(emailInputRef)
        const password  = InputHelper.getValue(passwordInputRef)
    

        ValidateHelper.showMessageFields([
            {
                ref:emailInputRef,
                field:email
            },
            {
                ref:passwordInputRef,
                field:password
            }
        ])

        if(!email || !password ){
            return false
        }

        if(!validateService.validateEmail(email)){
            setShowErrors(true)
            setTitle('Email Inválido!')
            return false
        }else{
            setShowErrors(false)
            setTitle('')
        }


        try{
            await  signIn(email,password)
            navigate('/home')
            
        }catch(err){
            setShowErrors(true)
            setTitle(err.response ? err.response.data.msg: err.message)
        }
    }


    return (
        <FormLoginContainer style={{alignItems:'center'}}>
            <FormControl className='input_container'>
                <InputLabel htmlFor="Email">Email</InputLabel>
                <Input className='input' id="email" name='email' aria-describedby="email" type="text"  required inputRef={emailInputRef}/>
            </FormControl>
            <FormControl className='input_container'>
                <InputLabel htmlFor="Password">Password</InputLabel>
                <Input className='input' id="password" name='password' aria-describedby="password" type='password' required  inputRef={passwordInputRef}/>
            </FormControl>

            <Button onClick={_login} color="primary"variant="contained" size="medium"  style={{width:'50%',display:'block',margin:'auto',marginTop:'15px'}}>
                Logar
            </Button>

            {
                (showErrors)? (
                    <AlertX label='Aviso!' title={title} type={'warning'}/>
                ):null
            }

            <Link to={'/signup'} style={{marginTop:20}}>
                Ainda nao tem Cadastro, cadastre-se aqui
            </Link>

        </FormLoginContainer>
    );
}

export default Login;
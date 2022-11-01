import {render} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import Login from '../../src/pages/Login';


jest.mock('../../src/services/login',()=>{
   return {
     login:()=>{
      return {
         data:{
            token:'token',
            user:{
               name:'test'
            }
         }
      }
     }
   }
})




describe('Suit de Testes Login Page',()=>{
    test('Should render Login Page Component',()=>{
       const {container} =  render(<BrowserRouter>
         <Login/>
       </BrowserRouter>)

       const button = container.querySelector('button');

       expect(container).toBeInTheDocument()
       expect(button.textContent).toBe('Logar')

    })

    test('Should show error messages WHEN required fields are not filled',async ()=>{
        const {container} =  render(<BrowserRouter>
         <Login/>
       </BrowserRouter>)

        const button = container.querySelector('button');

         await userEvent.click(button);

         expect(container.querySelectorAll('.Mui-error').length).toBeGreaterThanOrEqual(2); 
     })

     test('Should show error messages WHEN email field is not valid',async ()=>{
      const {container} =  render(<BrowserRouter>
         <Login/>
       </BrowserRouter>)

      const button = container.querySelector('button');

      const intputEmail = container.querySelector("input[name='email'] ");
      const intputPassword = container.querySelector("input[name='password'] ");


      await userEvent.type(intputEmail,'ok');
      await userEvent.type(intputPassword,'123456');

      await userEvent.click(button);

       expect(container.querySelector('.MuiAlert-message')).toBeInTheDocument()
       expect(container.querySelector('.MuiAlert-message').textContent).toBe('Aviso!Email Inválido!')
   })

     test('Should login the user  WHEN required fields are filled and sucessfull',async ()=>{
      const {container} =  render(<BrowserRouter>
         <Login/>
       </BrowserRouter>)

      const button = container.querySelector('button');

      const intputEmail = container.querySelector("input[name='email'] ");

      const intputPassword = container.querySelector("input[name='password'] ");

       await userEvent.type(intputEmail,'lexpdigi@gmail.com');
       await userEvent.type(intputPassword,'123456');


       await userEvent.click(button);

       expect(container.querySelectorAll('.Mui-error').length).toBe(0); 
   })
})
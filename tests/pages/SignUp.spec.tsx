import {render} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import SignUp from '../../src/pages/SignUp';




jest.mock('axios',() => {
    return {
        create:() => {
            return {
                post:()=>{
            
                }
            }
        }
    }
})



describe('Suit de Testes SignUp Page',()=>{
    test('Should render SignUp Page Component',()=>{
       const {container} =  render(<BrowserRouter>
         <SignUp/>
       </BrowserRouter>)

       const button = container.querySelector('button');

       expect(container).toBeInTheDocument()
       expect(button.textContent).toBe('Cadastrar')

    })

    test('Should show error messages WHEN required fields are not filled',async ()=>{
        const {container} =  render(<BrowserRouter>
         <SignUp/>
       </BrowserRouter>)

        const button = container.querySelector('button');

         await userEvent.click(button);

         expect(container.querySelectorAll('.Mui-error').length).toBeGreaterThanOrEqual(2); 
     })

     test('Should show error messages WHEN email field is not valid',async ()=>{
      const {container} =  render(<BrowserRouter>
         <SignUp/>
       </BrowserRouter>)

      const button = container.querySelector('button');

      const intputEmail = container.querySelector("input[name='email'] ");
      const intputPassword = container.querySelector("input[name='password'] ");
      const intputPasswordComfirmation = container.querySelector("input[name='password_confirmation'] ");
      const intputName = container.querySelector("input[name='name'] ");


      await userEvent.type(intputEmail,'ok');
      await userEvent.type(intputPassword,'123456');
      await userEvent.type(intputPasswordComfirmation,'123456');
      await userEvent.type(intputName,'test');

      await userEvent.click(button);

       expect(container.querySelector('.MuiAlert-message')).toBeInTheDocument()
       expect(container.querySelector('.MuiAlert-message').textContent).toBe('Aviso!Email invalido!')
   })

   test('Should show error messages WHEN passwords not match',async ()=>{
    const {container} =  render(<BrowserRouter>
       <SignUp/>
     </BrowserRouter>)

    const button = container.querySelector('button');

    const intputEmail = container.querySelector("input[name='email'] ");
    const intputPassword = container.querySelector("input[name='password'] ");
    const intputPasswordComfirmation = container.querySelector("input[name='password_confirmation'] ");
    const intputName = container.querySelector("input[name='name'] ");


    await userEvent.type(intputEmail,'ok');
    await userEvent.type(intputPassword,'123456');
    await userEvent.type(intputPasswordComfirmation,'1234567');
    await userEvent.type(intputName,'test');

    await userEvent.click(button);

     expect(container.querySelector('.MuiAlert-message')).toBeInTheDocument()
     expect(container.querySelector('.MuiAlert-message').textContent).toBe('Aviso!As senhas nao conferem!')
 })

     test('Should login the user  WHEN required fields are filled and sucessfull',async ()=>{
      const {container} =  render(<BrowserRouter>
         <SignUp/>
       </BrowserRouter>)

      const button = container.querySelector('button');

      const intputEmail = container.querySelector("input[name='email'] ");

      const intputPassword = container.querySelector("input[name='password'] ");
      const intputPasswordComfirmation = container.querySelector("input[name='password_confirmation'] ");
      const intputName = container.querySelector("input[name='name'] ");

       await userEvent.type(intputEmail,'lexpdigi@gmail.com');
       await userEvent.type(intputPassword,'123456');
       await userEvent.type(intputPasswordComfirmation,'123456');
       await userEvent.type(intputName,'test');


       await userEvent.click(button);

       expect(container.querySelectorAll('.Mui-error').length).toBe(0); 

       expect(container.querySelector('.MuiAlert-message')).toBeInTheDocument()
       expect(container.querySelector('.MuiAlert-message').textContent).toBe('Aviso!Usuario criado com Sucesso!')
   })
})
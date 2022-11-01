import {render} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import CreateTask from '../../src/pages/CreateTask';



jest.mock('react-toastify/dist/ReactToastify.css',() => ({}))

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



describe('Suit de Testes CreateTask Page',()=>{
    test('Should render CreateTask Page Component',()=>{
       const {container} =  render(<BrowserRouter>
         <CreateTask/>
       </BrowserRouter>)

       const button = container.querySelector('button');

       expect(container).toBeInTheDocument()
       expect(button.textContent).toBe('Salvar')

    })

    test('Should show error messages WHEN required fields are not filled',async ()=>{
        const {container} =  render(<BrowserRouter>
         <CreateTask/>
       </BrowserRouter>)

        const button = container.querySelector('button');

         await userEvent.click(button);

         expect(container.querySelectorAll('.Mui-error').length).toBeGreaterThanOrEqual(2); 
     })

     test('Should show error messages WHEN required fields are not filled',async ()=>{
        const {container} =  render(<BrowserRouter>
         <CreateTask/>
       </BrowserRouter>)

        const button = container.querySelector('button');

         await userEvent.click(button);

         expect(container.querySelectorAll('.Mui-error').length).toBeGreaterThanOrEqual(2); 
     })

     test('Should create new task WHEN required fields are filled and sucessfull',async ()=>{
        const {container} =  render(<BrowserRouter>
           <CreateTask/>
         </BrowserRouter>)
  
        const button = container.querySelector('button');
  
        const intputDescription = container.querySelector("input[name='description'] ");
        const intputName = container.querySelector("input[name='name'] ");
  
        await userEvent.type(intputDescription,'fsdsd');
        await userEvent.type(intputName,'test');
  
         await userEvent.click(button);
  
         expect(container.querySelectorAll('.Mui-error').length).toBe(0); 
  
        expect(container.querySelector('.Toastify')).toBeInTheDocument()
     })

})
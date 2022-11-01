import {act, render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import UpdateTask from '../../src/pages/UpdateTask';



jest.mock('react-toastify/dist/ReactToastify.css',() => ({}))

jest.mock('axios',() => {
    return {
        create:() => {
            return {
                get:()=>{
                    return {
                        data:{
                            id:1,
                            name:'test',
                            description:'test description',
                            completed:true
                        }
                    }
                },
                put:()=>{

                }
            }
        }
    }
})



describe('Suit de Testes UpdateTask Page',()=>{
    test('Should render UpdateTask Page Component',async ()=>{
       await act(async () => { 
         render(<BrowserRouter>
            <UpdateTask/>
          </BrowserRouter>)
      })

      expect(screen.getByText(/Atualizar/i)).toBeInTheDocument()


    })

     test('Should update the task WHEN required fields are filled and sucessfull',async ()=>{
        const {container} =  render(<BrowserRouter>
           <UpdateTask/>
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
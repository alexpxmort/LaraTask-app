import { RefObject } from "react"

interface IFieldInput{
    ref:RefObject<HTMLInputElement>;
    field:string;
}

export default class ValidateHelper{
     static showMessageField = (ref:RefObject<HTMLInputElement>,field:string):void=>{
        if(!field){
            const classesInvalid =  `${ref.current.parentElement.getAttribute('class')} Mui-error `
            ref.current.parentElement.setAttribute('class',classesInvalid)
        }else{
            const classesValid =  `${ref.current.parentElement.getAttribute('class').replace('Mui-error','')} `
            ref.current.parentElement.setAttribute('class',classesValid)
        }
    }

    static showMessageFields = (fieldsInput:Array<IFieldInput>):void=>{
        fieldsInput.forEach(({ref,field}) => {
            this.showMessageField(ref,field)
        })
    }
}
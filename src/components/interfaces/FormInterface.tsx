export interface FormInterface{
    onSubmit:(dataForm:any)=>void;
    isEdit:boolean;
    fillFields?:() => Promise<any>;
}
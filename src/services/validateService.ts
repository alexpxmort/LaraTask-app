export const validateService = {
    validateEmail:(email:string):boolean =>{
        return email.includes('@') && email.includes('.com') 
    },
    comparePasswords: (password:string,passwordConfirmation:string):boolean => {
        return password === passwordConfirmation
    }
}
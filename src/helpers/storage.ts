
export const storage = {
    isExistsToken: () => {
        return localStorage ?  localStorage.getItem('token')!=null : false;
    }
}



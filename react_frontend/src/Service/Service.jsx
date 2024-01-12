import axios from "axios";

export const api = axios.create({
    baseURL : "http://localhost:8080"
})

export async function registerUser(user){
    try{
        const response = await api.post("/user/register", user)
        return response.data
    }catch(error){
        if(error.response && error.response.data){
            throw new Error(error.response.data)
        }else{
            throw new Error(`User registration error : ${error.message}`)
        }
    }
}
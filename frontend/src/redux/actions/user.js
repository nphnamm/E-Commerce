

// load user

import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";

export const loadUser = () => async(dispatch) =>{
    try{
        dispatch({
            type: "LoadUserRequest",

        });
        const {data} = await axios.get(`${server}/user/getuser`,{withCredentials:true});
        dispatch({
            type: "LoadUserSuccess",
            payload: data.user,
            

        });
        // console.log("data", data.user.name);
        toast.success(`Welcome ${data.user.name} !`)

        
    }catch(error){
        console.log(error)
        dispatch({
            type:"LoadUserFail",
            payload: error.response.data.message,
        })
    }
}
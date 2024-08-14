import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { server } from '../server';
import axios from 'axios';

function ActivationPage() {
  const {activation_token} = useParams();
  const [error, setError] = useState(false);
  // console.log('check', activation_token);
  useEffect(()=>{
    if(activation_token){
      const actiavtionEmail = async () =>{
     

          await axios.post(`${server}/user/activation`,{
            activation_token,
          }).then((res) =>{
            // console.log(res);

          }).catch((err)=>{
            setError(true);
          console.log(err);

          })


      
      }
      actiavtionEmail();

    }
  },[activation_token]);
  return (
    <div style={{width:"100%", height:"100vh", display:"flex",justifyContent:"center", alignItems:"center"}}>

        {error ? (
          <p>your token is expired</p>
        ): (
          <p>your account has been created successfully</p>
        )}

    </div>
  )
}

export default ActivationPage

import React from 'react'
import styles  from "./SignIn.module.css"
import { Link } from 'react-router-dom';
// import { useUserContext } from '../../Context/User.Context';
import { useNavigate } from "react-router-dom";
import { useValue } from '../../Context/Product.Context';



 
function SignIn() {
  const { handleUserName , handlePasswordName , handleSignIn} = useValue();
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
    <form >
        <h1>SignIn</h1>
        <input type='text' onChange={handleUserName} className={styles.inputs} placeholder='Enter Your Email'/>
        <input type="password" onChange={handlePasswordName} className={styles.inputs} placeholder='Enter Your Password'/>
        <button className={styles.SubmitBtn} onClick={(e)=>{ 
          e.preventDefault();
          const SignIn  = handleSignIn(); 
          if(SignIn){
            navigate("/")
          }
        }}>SignIn</button>
        <p> If You have'not Account - : <b>Please <Link to="/SignUp">SignUp</Link></b> </p>
    </form>
    </div>
  )
}

export default SignIn;

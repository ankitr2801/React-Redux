import React from 'react'
import styles  from "./SignUp.module.css"
// import { useUserContext } from '../../Context/User.Context';
import { useValue } from '../../Context/Product.Context';


function SignUp() {
  const { handleSignUp,  handleEmailChange , handleNameChange , handlePasswordChange} = useValue();
  return (
    <div className={styles.container}>
    <form >
        <h1>SignUp</h1>
        <input type="text" className={styles.inputs} onChange={handleNameChange} placeholder='Enter Your Name'/>
        <input className={styles.inputs} onChange={handleEmailChange} placeholder='Enter Your Email'/>
        <input type="password" className={styles.inputs} onChange={handlePasswordChange} placeholder='Enter Your Password'/>
        <button className={styles.SubmitBtn} onClick={handleSignUp}>SignUp</button>
    </form>
    </div>
  )
}

export default SignUp;

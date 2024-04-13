// // userContext.js
// import React, { useState, createContext, useContext, useEffect } from "react";
// import { db } from "../firebase-init";
// import { collection, addDoc, getDocs , updateDoc , doc } from "firebase/firestore";

// const userContext = createContext();

// function useUserContext() {
//   const value = useContext(userContext);
//   return value;
// }

// function CustomUserContext({ children }) {
//   const [checkUser, setCheckUser] = useState(false);
//   const [userId, setUserId] = useState("");

//   // For Sign Up
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");



//   const handlePasswordChange = (e) => {
//     setPassword(e.target.value);
//   };

//   const handleEmailChange = (e) => {
//     setEmail(e.target.value);
//   };

//   const handleNameChange = (e) => {
//     setName(e.target.value);
//   };

//   const handleSignUp = async (e) => {
//     e.preventDefault();
//     if (name.trim() === "" || email.trim() === "" || password.trim() === "") {
//       console.log("Enter valid details ");
//     } else {
//       const docRef = await addDoc(collection(db, "users"), {
//         name: name,
//         email: email,
//         password: password,
//       });
//       console.log(docRef);
//       setCheckUser(true);
//     }
//   };

//   // Authentication
//   const Auth = async (userName, logInPass) => {
//     let isFoundUser = false;
//     const users = collection(db, "users");
//     const querySnapshot = await getDocs(users);
//     querySnapshot.forEach((doc) => {
//       console.log(doc.data());
//       if (doc.data().email === userName && doc.data().password === logInPass) {
//         console.log(doc.id);
//         setUserId(doc.id);
//         // setOrder(doc.data().order);
//         // setCart(doc.data().cart);
//         isFoundUser = true;
//         setCheckUser(true);
//         console.log("auth", isFoundUser);
//       } else if (
//         doc.data().email !== email &&
//         doc.data().password !== password
//       ) {
//         console.log("Data is not found");
//       }
//     });
//     if (isFoundUser) {
//       return true;
//     } else {
//       return false;
//     }
//   };

//   // For SignIn
//   const [userName, setUserName] = useState("");
//   const [logInPass , setLogInPass] = useState("");

//   const handlePasswordName = (e) => {
//       setLogInPass(e.target.value);
//   }
//   const handleUserName = (e) => {
//       setUserName(e.target.value);
//   }

//   const handleSignIn = async()=>{
//     console.log("Inside HandleSignIn" );
//     // e.preventDefault()
//     if(userName.trim()==="" || logInPass.trim()===""){
//         console.log("enter valid details");
//     } else {
//         const res = await Auth(userName,logInPass);  
//         console.log(" RESULT "  , res);
//         if(res){
//           setCheckUser(true)
//         } 
//         return res;
//     }
//   }
  
//   //Logout

//   const logOut = async ()=>{
//     const useRef = doc(db,"users",userId);
//     await updateDoc(useRef, {
//         order: order,
//         cart: cart
//     });
//     setCheckUser(false);
//     toast.success("logout successfully");
// }
//   return (
//     <userContext.Provider
//       value={{
//         handleSignUp,
//         checkUser,
//         handleEmailChange,
//         handleNameChange,
//         handlePasswordChange,
//         handleSignIn,
//         handlePasswordName,
//         handleUserName,
//         logOut,
//       }}
//     >
//       {children}
//     </userContext.Provider>
//   );
// }

// export { userContext, useUserContext, CustomUserContext };

import React, { useState, createContext, useContext, useEffect } from "react";
import { toast  , ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { db } from "../firebase-init";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  onSnapshot,
  arrayUnion
} from "firebase/firestore";


const productContext = createContext();

const currentDate = new Date();
const year = currentDate.getFullYear();
const Month = currentDate.getMonth() + 1;
const date = currentDate.getDate();


function useValue() {
  const value = useContext(productContext);
  return value;
}

function CustomItemContext({ children }) {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [cartLength , setCartLength] =  useState(0)
  const [order, setOrder] = useState([]);
  const [priceFilter, setPriceFilter] = useState(1);
  const [category, setCategory] = useState([]);
  const [checkboxes, setCheckboxes] = useState({
    SelectAll: false,
    men: false,
    women: false,
    jewelery: false,
    electronics: false,
  });
  console.log(cartItems);

  
  // -------------------for User sign OR sign UP-------------------------------------//
  const [checkUser, setCheckUser] = useState(false);
  const [userId, setUserId] = useState("");

  // For Sign Up
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  useEffect(()=>{
    if(checkUser){
      const unsub = onSnapshot(doc(db, "users", userId), (doc) => {
        setCartItems(doc.data().cartItems)
      });
    }
  } , [setCartItems])

  useEffect(() => {
    let newTotal = 0;
    cartItems.forEach((item) => {
      if(item.price && item.quantity){ // Check if item.price and item.quantity are defined
        newTotal += parseFloat(item.price) * item.quantity;
      }
    });
    setTotal(newTotal.toFixed(2));
  }, [cartItems]);
  

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (name.trim() === "" || email.trim() === "" || password.trim() === "") {
      toast.error("Enter valid details ");
    } else {
      const docRef = await addDoc(collection(db, "users"), {
        name: name,
        email: email,
        password: password,
        cart:[],
        order:[]
      });
      console.log(docRef);
      setCheckUser(true);
      toast.success('SignUp successfully')
    }
  };

  // Authentication
  const Auth = async (userName, logInPass) => {
    let isFoundUser = false;
    const users = collection(db, "users");
    const querySnapshot = await getDocs(users);
    querySnapshot.forEach((doc) => {
      if (doc.data().email === userName && doc.data().password === logInPass) {
        // console.log(doc.id);
        setUserId(doc.id);
        setOrder(doc.data().order);
        setCartItems(doc.data().cart);
        isFoundUser = true;
        setCheckUser(true);
       
      } else if (
        doc.data().email !== email &&
        doc.data().password !== password
      ) {
        toast.error("Data is not found");
      }
    });
    if (isFoundUser) {
      return true;
    } else {
      return false;
    }
  };

  // For SignIn
  const [userName, setUserName] = useState("");
  const [logInPass, setLogInPass] = useState("");

  const handlePasswordName = (e) => {
    setLogInPass(e.target.value);
  };
  const handleUserName = (e) => {
    setUserName(e.target.value);
  };

  const handleSignIn = async () => {
    if (userName.trim() === "" || logInPass.trim() === "") {
        toast.error("enter valid details");
    } else {
      const res = await Auth(userName, logInPass);
      // console.log(" RESULT ", res);
      if (res) {
        setCheckUser(true);
        toast.success('SignIn successfull')
      }
      return res;
    }
  };

  //Logout
  const logOut = async () => {
    const useRef = doc(db, "users", userId);
    await updateDoc(useRef, {
      order: order,
      cart: cartItems,
    });
    setCheckUser(false);
    toast.success("logout successfully");
  };

  const handleAddtoCart = async(product) => {
    if (checkUser) {
      const index = cartItems.findIndex((item) => item.id === product.id);
      if (index === -1) {
        const userRef = doc(db, "users", userId);
        await updateDoc(userRef, {
          cart: arrayUnion({ quantity: 1, ...product }),
        });
        toast.success("Product Added to Cart");
        setCartLength(cartLength + 1);
        setCartItems([...cartItems, { quantity: 1, ...product }]); 
      } else {
        cartItems[index].quantity++;
        setCartItems([...cartItems]); // Update the state with the modified cartItems
        const newTotal = parseFloat(total) + parseFloat(product.price);
        setTotal(newTotal.toFixed(2));
        toast.success(" Items Quantity Increased successfully ");
      }
      return true;
    } else {
      return false;
    }
  };
  

  const handleIncQty = async (id) => {
    const index = cartItems.findIndex((cartItem) => cartItem.id === id);
    if (index !== -1) {
      cartItems[index].quantity += 1;
      setCartItems([...cartItems]);
      const newTotal = parseFloat(total) + parseFloat(cartItems[index].price);
      setTotal(newTotal.toFixed(2));
      try {
        const userRef = doc(db, "users", userId);
        await updateDoc(userRef, { cart: cartItems });
        toast.success("Items Quantity Increased successfully");
      } catch (error) {
        console.error("Error updating cart in Firestore:", error);
      }
    }
  };
  
  const handleDecQty = async (id) => {
    const index = cartItems.findIndex((cartItem) => cartItem.id === id);
    if (index !== -1) {
      if (cartItems[index].quantity > 0) {
        cartItems[index].quantity -= 1;
        setCartItems([...cartItems]);
        const newTotal = parseFloat(total) - parseFloat(cartItems[index].price);
        setTotal(newTotal.toFixed(2));
        try {
          const userRef = doc(db, "users", userId);
          await updateDoc(userRef, { cart: cartItems });
          toast.success("Items Quantity Decreased successfully");
        } catch (error) {
          console.error("Error updating cart in Firestore:", error);
        }
      } else {
        toast.error("Quantity cannot be less than zero");
      }
    }
  };
  
  const handleRemoveToCart = (id) => {
    const updatedCartItems = cartItems.filter((cartItem) => cartItem.id !== id);
    setCartItems(updatedCartItems);
    setTotal(total - cartItems[id - 1].price * cartItems[id - 1].quantity);
    toast.success("Cart Removed Successfully ");
  };

  const OrderItems = () => {
    if(checkUser){

      let OrderDate =
        date.toString() + "/" + Month.toString() + "/" + year.toString();
      setOrder([{ date: OrderDate, order: cartItems }, ...order]);
      setCartItems([]);
    }
  };

  const handlePriceChange = (e) => {
    setPriceFilter(e.target.value);
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;

    if (name === "SelectAll") {
      setCheckboxes({
        SelectAll: checked,
        men: checked,
        women: checked,
        jewelery: checked,
        electronics: checked,
      });
    } else {
      setCheckboxes({
        ...checkboxes,
        [name]: checked,
        SelectAll: false,
      });
    }
  };

  return (
    <productContext.Provider
      value={{
        products,
        setProducts,
        total,
        setTotal,
        cartItems,
        setCartItems,
        handleDecQty,
        handleIncQty,
        handleRemoveToCart,
        handleAddtoCart,
        order,
        setOrder,
        OrderItems,
        priceFilter,
        handlePriceChange,
        checkboxes,
        handleCheckboxChange,
        category,
        setCategory,
        handleSignUp,
        checkUser,
        handleEmailChange,
        handleNameChange,
        handlePasswordChange,
        handleSignIn,
        handlePasswordName,
        handleUserName,
        logOut,
      }}
    >
      {children}
      <ToastContainer />
    </productContext.Provider>
  );
}

export { productContext, useValue };
export default CustomItemContext;

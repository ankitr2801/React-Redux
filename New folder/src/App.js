// App.js
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Nav from "./Components/Navbar/Nav";
import MyOrder from "./Pages/MyOrder/MyOrder";
import Cart from "./Pages/Cart/Cart";
import Home from "./Components/Home/Home";
import SignIn from "./Pages/SignIn/SignIn";
import SignUp from "./Pages/SignUp/SignUp";
import "./App.css";
import CustomItemContext from "./Context/Product.Context";
// import { CustomUserContext } from "./Context/User.Context"; 

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Nav />,
      children: [
        { index: true, element: <Home /> },
        { path: "/MyOrder", element: <MyOrder /> },
        { path: "/Cart", element: <Cart /> },
        { path: "/SignIn", element: <SignIn /> },
        { path: "/SignUp", element: <SignUp /> },
      ],
    },
  ]);

  return (
    // <CustomUserContext> 
      <CustomItemContext>
        <div className="App">
          <RouterProvider router={router} />
        </div>
      </CustomItemContext>
    // </CustomUserContext>
  );
}

export default App;

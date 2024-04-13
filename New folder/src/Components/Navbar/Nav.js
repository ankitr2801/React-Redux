import React from 'react'
import styles from "./Nav.module.css"
import { NavLink, Outlet } from 'react-router-dom'

// import { useUserContext } from '../../Context/User.Context'
import { useValue } from '../../Context/Product.Context';

function Nav() {
  const {checkUser , logOut} = useValue();
  // console.log("INSIDE NAVBAR " , checkUser);
  return (
    <>
      <nav>
        <div className={styles.nav_Container}>
          <div className={styles.nav_title_wrapper}>
            <h3>E-Commerce Website</h3>
          </div>
          <div className={styles.links}>
            {checkUser ? (<ul>
              <li>
                <NavLink to="/">
                  <i className="fa-solid fa-house"></i>
                  <span className={styles.linkTags}>Home</span>
                </NavLink>
              </li>

              <li>
                <NavLink to="/MyOrder">
                  <i className="fa-sharp fa-solid fa-bag-shopping"></i>
                  <span  className={styles.linkTags}> My Orders</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/Cart">
                  <i className="fa-solid fa-cart-shopping"></i>
                  <span  className={styles.linkTags}> Cart</span>
                </NavLink>
              </li>
              <li>
                <NavLink>
                  <i className="fa-solid fa-right-to-bracket"></i>
                  <span  className={styles.linkTags} onClick={logOut}>LogOut</span>
                </NavLink>
              </li>
            </ul>) : (<ul>
              <li>
                <NavLink to="/">
                  <i className="fa-solid fa-house"></i>
                  <span className={styles.linkTags}>Home</span>
                </NavLink>
              </li>

              <li>
                <NavLink to="/SignIn">
                  <i className="fa-sharp fa-solid fa-bag-shopping"></i>
                  <span  className={styles.linkTags}>SignIn</span>
                </NavLink>
              </li> </ul>)}
          </div>
        </div>
      </nav >
      <Outlet />
    </>

  )
}

export default Nav

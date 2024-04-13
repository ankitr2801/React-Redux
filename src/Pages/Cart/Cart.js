
import styles from "./Cart.module.css";
import { useValue } from "../../Context/Product.Context";
import { Link } from "react-router-dom";



function Cart() {
 const { total , cartItems ,  handleDecQty , handleIncQty , handleRemoveToCart , OrderItems  } = useValue()

  return (
    <>
      {cartItems.length === 0 ? (<div className={styles.CartEmpty}>
        <h1 className={styles.Cart_Titles}>Your Cart is Empty</h1>
        <img src="https://img.freepik.com/premium-vector/shopping-cart-with-cross-mark-wireless-paymant-icon-shopping-bag-failure-paymant-sign-online-shopping-vector_662353-912.jpg" alt="cartEmpty" className={styles.imageCart} />
        <button className={styles.ShopBtn}>SHOP NOW</button>
      </div>) :
        (<div className={styles.Container}>
          <aside>
            <div className={styles.aside_Container}>
              <h2>Total Price : &#8377; {total}/-</h2>
             
              <Link to="/MyOrder">
              <button className={styles.OrderBtn} onClick={OrderItems}>Order Now</button>
              </Link>
           
            </div>
          </aside>
          <main>
            <div className={styles.main_Container}>
              {cartItems.map((cartItem, index) => (
                <div className={styles.card} key={index}>
                  <img src={cartItem.image} alt="Poster" className={styles.img} />
                  <h1 className={styles.title}>{cartItem.title}</h1>
                  <div className={styles.IncAndDecContanier}>
                    <p className={styles.price}>&#8377; {cartItem.price}</p>
                    <div className={styles.icons}>
                      <i className="fa-solid fa-plus" onClick={() => handleIncQty(cartItem.id)}></i>
                      <h1>{cartItem.quantity}</h1>
                      <i className="fa-solid fa-minus" onClick={() => handleDecQty(cartItem.id)}></i>
                    </div>
                  </div>
                  <button className={styles.addbutton} onClick={() => handleRemoveToCart(cartItem.id)}>Remove To Cart</button>
                </div>
              ))}

            </div>
          </main>
        </div>)}

    </>

  );
}

export default Cart;

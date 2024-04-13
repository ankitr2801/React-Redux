import React from 'react';
import styles from './MyOrder.module.css';
import { useValue } from '../../Context/Product.Context';

function MyOrder() {
  const { order} = useValue();

  return (
    <>
      {order.length === 0 ? (<h1 className={styles.OrderNotFound}>No Order Available </h1>) : (<div className={styles.Container}>
        <div className={styles.Cart_card}>
          <h1>Your Orders</h1>
          {order.map((orderItem, index) => (
            <div key={index}>
              <h1 className={styles.OrderDate}>Order On: {orderItem.date}</h1>
              <table className={styles.cartTable}>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total Price</th>
                  </tr>
                </thead>
                <tbody>
                  {orderItem.order.map((item, i) => (
                    <tr key={i}>
                      <td>{item.title}</td>
                      <td>{item.price}</td>
                      <td>{item.quantity}</td>
                      <td>{item.price * item.quantity}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan="4"className={styles.totalLabel}>Total:- &#8377;{orderItem.order.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          ))}
        </div>
      </div>)}
    </>
  );
}

export default MyOrder;

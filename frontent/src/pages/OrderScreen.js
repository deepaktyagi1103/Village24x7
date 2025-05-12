import React, { useEffect, useState } from "react";
import axios from "axios";

const OrderScreen = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const { data } = await axios.get("/api/orders/myorders");
      setOrders(data.data);
    };
    fetchOrders();
  }, []);

  return (
    <div>
      <h2>My Orders</h2>
      {orders.map((order) => (
        <div key={order._id}>
          <p>Order ID: {order._id}</p>
          <p>Total: ₹{order.totalPrice}</p>
          <p>Status: {order.status}</p>
        </div>
      ))}
    </div>
  );
};

export default OrderScreen;

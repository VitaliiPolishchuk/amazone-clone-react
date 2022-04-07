import React, { useState, useEffect } from "react";
import Order from "./Order";
import "./Orders.css";
import { useStateValue } from "./StateProvider";
import axios from "./axios";

function Orders() {
  const [{ basket, user, authTokens }, dispatch] = useStateValue();
  const [orders, setOrders] = useState([]);

  useEffect(async () => {
    if (user) {
      const response = await axios({
        method: "get",
        url: `/order/`,
        headers: {
          Authorization: "Bearer " + authTokens.access,
        },
      });
      setOrders(response.data.data.orders);
    } else {
      setOrders([]);
    }
  }, [user]);
  return (
    <div className="orders">
      <h1>Your Orders</h1>

      <div className="orders_container">
        {orders?.map((order) => (
          <Order order={order} />
        ))}
      </div>
    </div>
  );
}

export default Orders;

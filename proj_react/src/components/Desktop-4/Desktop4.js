import React, { useState, useEffect } from "react";
import "./style.css";

import { db } from "../../firebaseConfig";

import qrcode from "../../assets/imgs/qrcode.png";
import momo from "../../assets/imgs/momo.png";
import viettelpay from "../../assets/imgs/viettelpay.jpg";


export default function Desktop4(props) {
  const { userId } = props;

  const [totalPrice, setTotalPrice] = useState(0);
  const [userName, setUserName] = useState("");

  // const { price, user } = { price: "125,000", user: "Ngoc Man" };
  const time = new Date().toString().slice(0, 25);

  useEffect(() => {
    getTotalPrice();
  }, [totalPrice]);
  const getTotalPrice = () => {
    db.ref(`transaction/${userId}/`).on("value", (snapshot) => {
      console.log(snapshot.val());
      if (snapshot.val()) {
        setTotalPrice(snapshot.val().total_price);
        setUserName(snapshot.val().user_name);
      }
    });
  };
  return (
    <div class="desktop4">
      <div>
        <div class="desktop4__logo">Scago</div>
        <div class="desktop4__title">Billing</div>
        <div class="desktop4__price">
          <p>Total</p>
          <span>{totalPrice}</span>
        </div>
        <div class="desktop4__user">
          <p>User</p>
          <span>{userName}</span>
        </div>
        <div class="desktop4__time">
          <p>Time</p>
          <span>{time}</span>
        </div>
      </div>
      <div class="desktop4__payment">
        <img class="desktop4__payment__code" src={qrcode}></img>
        <div class="desktop4__payment__service">
          <img class="service1" src={momo}></img>
        </div>
      </div>
    </div>
  );
}

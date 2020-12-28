import React from "react";
import "./style.css";

export default function Desktop4(props) {
  const { price, user } = { price: "125,000", user: "Ngoc Man" };
  const time = new Date().toString().slice(0, 25);

  return (
    <div class="desktop4">
      <div>
        <div class="desktop4__logo">Scago</div>
        <div class="desktop4__title">Billing</div>
        <div class="desktop4__price">
          <p>Total</p>
          <span>{price}</span>
        </div>
        <div class="desktop4__user">
          <p>User</p>
          <span>{user}</span>
        </div>
        <div class="desktop4__time">
          <p>Time</p>
          <span>{time}</span>
        </div>
      </div>
      <div class="desktop4__payment">
        <div class="desktop4__payment__code">
        </div>
        <div class="desktop4__payment__service">
            <div class="service1">

            </div>
            <div class="service2">
                
            </div>
        </div>
      </div>
    </div>
  );
}

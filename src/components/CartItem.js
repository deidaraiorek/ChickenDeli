import React, { useEffect, useState } from "react";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { motion } from "framer-motion";
import { RiRefreshFill } from "react-icons/ri";
import f1 from "../img/f1.png";
import emptyCart from "../img/emptyCart.svg";
import { BiMinus, BiPlus } from "react-icons/bi";
import { useStateValue } from "../context/StateProvider";
const CartItem = ({ item, setFlag, flag }) => {
  const [qty, setQty] = useState(1);
  const [items, setItems] = useState([]);
  const [{ cartItems }, dispatch] = useStateValue();
  const addToCart = () => {
    dispatch({
      type: "SET_CART_ITEMS",
      cartItems: items,
    });
    localStorage.setItem("cartItems", JSON.stringify(items));
  };
  const updateQty = (action, id) => {
    if (action == "add") {
      setQty(qty + 1);
      cartItems.map((item) => {
        if (item.id === id) {
          item.qty += 1;
          setFlag(flag + 1);
        }
      });

      addToCart();
    }
    if (action == "remove") {
      if (qty == 1) {
        const filteredCartItems = cartItems.filter((item) => item.id !== id);
        setItems(filteredCartItems);
        setFlag(flag + 1);
        addToCart();
      } else {
        setQty(qty - 1);
        cartItems.map((item) => {
          if (item.id === id) {
            item.qty -= 1;
            setFlag(flag + 1);
          }
        });
        addToCart();
      }
    }
  };

  useEffect(() => {
    setItems(cartItems);
  }, [items, qty]);
  return (
    <div
      key={item.id}
      className="w-full p-1 px-2 rounded-lg bg-cartItem  flex items-center gap-2"
    >
      <img
        src={item.imageUrl}
        className="w-20 h-20 max-w-[60px] rounded-full object-contain"
      ></img>
      <div className="flex flex-col gap-2">
        <p className="text-base text-gray-50">{item.title}</p>
        <p className="text-base text-gray-50">
          $<span>{item.price * qty}</span>
        </p>
      </div>
      <div className="group flex items-center gap-2 ml-auto cursor-pointer">
        <motion.div
          whileTap={{ scale: 0.75 }}
          onClick={() => updateQty("remove", item.id)}
        >
          <BiMinus className="text-gray-50"></BiMinus>{" "}
        </motion.div>
        <p className="w-5 h-5 rounded-sm bg-cartBg text-gray-50 flex items-center justify-center">
          {item.qty}
        </p>
        <motion.div
          whileTap={{ scale: 0.75 }}
          onClick={() => updateQty("add", item.id)}
        >
          <BiPlus className="text-gray-50"></BiPlus>
        </motion.div>
      </div>
    </div>
  );
};

export default CartItem;

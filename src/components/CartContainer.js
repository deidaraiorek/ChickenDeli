import React, { useEffect, useState } from "react";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { motion } from "framer-motion";
import { RiRefreshFill } from "react-icons/ri";
import f1 from "../img/f1.png";
import emptyCart from "../img/emptyCart.svg";
import { BiMinus, BiPlus } from "react-icons/bi";
import { useStateValue } from "../context/StateProvider";
import CartItem from "./CartItem";
const CartContainer = () => {
  const [{ user, cartShow, cartItems }, dispatch] = useStateValue();
  const [tot, setTot] = useState(0);
  const [flag, setFlag] = useState(1);
  const showCart = () => {
    dispatch({
      type: "SET_CART_SHOW",
      cartShow: !cartShow,
    });
  };
  const clearCart = () => {
    dispatch({
      type: "SET_CART_ITEMS",
      cartItems: [],
    });
    localStorage.setItem("cartItems", JSON.stringify([]));
  };
  useEffect(() => {
    let totalPrice = cartItems.reduce(function (ac, item) {
      return ac + item.qty * item.price;
    }, 0);
    setTot(totalPrice);
  }, [tot, flag]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 200 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 200 }}
      className="fixed top-0 right-0 w-full md:w-375 h-screen z-[101] bg-white drop-shadow-md flex flex-col "
    >
      <div className="w-full flex items-center justify-between p-4">
        <motion.div whileTap={{ scale: 0.75 }} onClick={showCart}>
          <MdOutlineKeyboardBackspace className="text-textColor text-3xl cursor-pointer" />
        </motion.div>
        <p className="text-textColor text-lg font-semibold">Cart</p>
        <motion.p
          onClick={clearCart}
          whileTap={{ scale: 0.75 }}
          className="flex items-center gap-2 p-1 px-2 my-2 bg-gray-100 rounded-md hover:shadow-md duration-100 ease-in-out transition-all cursor-pointer text-textColor text-base"
        >
          Clear
          <RiRefreshFill />
        </motion.p>
      </div>
      <div className="w-full h-full bg-cartBg rounded-t-[2rem] flex flex-col">
        <div className="w-full h-340 md:h-42 px-6 py-10 flex flex-col gap-3 overflow-y-scroll scrollbar-none">
          {cartItems.length > 0 &&
            cartItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                setFlag={setFlag}
                flag={flag}
              />
            ))}
        </div>
        {cartItems && cartItems.length > 0 ? (
          <div className="w-fill flex-1 bg-cartTotal rounded-t-[2rem] flex flex-col items-center justify-evenly px-8 py-2">
            <div className="w-full flex items-center justify-between">
              <p className="text-gray-400 text-lg">Sub Total</p>
              <p className="text-gray-400 text-lg">${tot}</p>
            </div>
            <div className="w-full flex items-center justify-between">
              <p className="text-gray-400 text-lg">Delivery</p>
              <p className="text-gray-400 text-lg">$2.5</p>
            </div>
            <div className="w-full border-b border-gray-600 my-2"></div>
            <div className="w-full flex items-center justify-between">
              <p className="text-gray-400 text-xl font-semibold">Total</p>
              <p className="text-gray-400 text-xl font-semibold">
                ${tot + 2.5}
              </p>
            </div>
            {user ? (
              <motion.button
                whileTap={{ scale: 0.8 }}
                type="button"
                className="w-full p-2 rounded-full bg-gradient-to-tr from-orange-400 to-orange-600 text-gray-50 text-lg my-2 hover:shadow-lg transition-all duration-150 ease-in-out"
              >
                Check Out
              </motion.button>
            ) : (
              <motion.button
                whileTap={{ scale: 0.8 }}
                type="button"
                className="w-full p-2 rounded-full bg-gradient-to-tr from-orange-400 to-orange-600 text-gray-50 text-lg my-2 hover:shadow-lg transition-all duration-150 ease-in-out"
              >
                Log in to check out
              </motion.button>
            )}
          </div>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-6">
            <img src={emptyCart} className="w-300" />
            <p className="text-xl text-textColor font-semibold">
              Add some items to your cart
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default CartContainer;

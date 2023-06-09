import React, { useEffect, useRef, useState } from "react";
import { MdShoppingBasket } from "react-icons/md";
import { motion } from "framer-motion";
import NotFound from "../img/NotFound.svg";
import { useStateValue } from "../context/StateProvider";
import { fecthCart } from "../utils/fetchLocalStorageData";
const RowContainer = ({ flag, data, scrollVal }) => {
  const [items, setItems] = useState(fecthCart());
  const [{ cartItems }, dispatch] = useStateValue();
  const rowContainer = useRef();

  const addToCart = () => {
    dispatch({
      type: "SET_CART_ITEMS",
      cartItems: items,
    });
    localStorage.setItem("cartItems", JSON.stringify(items));
  };

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems"));
    if (storedCartItems) {
      setItems(storedCartItems);
    }
  }, []);

  useEffect(() => {
    rowContainer.current.scrollLeft += scrollVal;
  }, [scrollVal]);

  useEffect(() => {
    addToCart();
  }, [items]);

  return (
    <div
      ref={rowContainer}
      className={`w-full flex scroll-smooth items-center gap-3 my-12 ${
        flag
          ? "overflow-x-scroll scrollbar-none"
          : "overflow-x-hidden flex-wrap justify-center"
      }`}
    >
      {data ? (
        data.map((item) => (
          <div
            key={item.id}
            className=" w-275 h-[225px] min-w-[275px] md:w-300 md:min-w-[300px]  bg-cardOverlay rounded-lg py-2 px-4  my-12 backdrop-blur-lg hover:drop-shadow-lg flex flex-col items-center justify-evenly relative"
          >
            <div className="w-full flex items-center justify-between">
              <motion.div
                className="w-40 h-40 -mt-8 drop-shadow-2xl"
                whileHover={{ scale: 1.2 }}
              >
                <img
                  src={item?.imageUrl}
                  alt=""
                  className="w-full h-full object-contain"
                />
              </motion.div>

              <motion.div
                whileTap={{ scale: 0.75 }}
                className="w-8 h-8 rounded-full bg-red-400 flex items-center justify-center cursor-pointer hover:shadow-lg "
                onClick={() => setItems([...cartItems, item])}
              >
                <MdShoppingBasket className="text-white" />
              </motion.div>
            </div>
            <div className="w-full flex flex-col items-end justify-end">
              <p className="text-textColor font-semibold text-base md:text-lg">
                {item.title}
              </p>
              <p className="mt-1 text-sm text-gray-500">{item.calo}</p>
              <div className="flex items-center gap-8">
                <p className="text-lg text-headingColor font-semibold">
                  <span className="text-sm text-red-500">$</span>
                  {item.price}
                </p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="w-300 flex flex-col gap-4 items-center justify-center h-250">
          <img src={NotFound}></img>
          <p>Item Not Available</p>
        </div>
      )}
    </div>
  );
};

export default RowContainer;

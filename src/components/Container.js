import React, { useEffect, useRef, useState } from "react";
import delivery from "../img/delivery.png";
import HomeContainer from "./HomeContainer";
import { motion } from "framer-motion";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import RowContainer from "./RowContainer";
import { useStateValue } from "../context/StateProvider";
import MenuContainer from "./MenuContainer";
import CartContainer from "./CartContainer";

const Container = () => {
  const [{ foodItems, cartShow }, dispatch] = useStateValue();
  const [scrollVal, setScroll] = useState(0);

  // useEffect(() => {}, [scrollVal]);
  return (
    <div className=" w-full h-auto flex flex-col items-center justify-center ">
      <HomeContainer />
      <section className="w-full my-6">
        <div className="w-full flex items-center justify-between">
          <p className="text-2xl font-semibold capitalize text-headingColor relative  before:absolute before:rounded-lg before:content before:bg-gradient-to-tr from-orange-400 to-orange-600 before:w-32  before:h-1 before:-bottom-2 before:left-0 transition-all ease-in-out duration-100 ">
            Our fresh & Healthy Fruit
          </p>
          <div className="hidden items-center md:flex gap-3">
            <motion.div
              whileTap={{ scale: 0.75 }}
              onClick={() => setScroll((prevVal) => prevVal - 200)}
              className="w-8 h-8 rounded-lg bg-orange-300 flex hover:bg-orange-500 transition-all cursor-pointer ease-in-out duration-100 hover-shadow-lg items-center justify-center"
            >
              <MdChevronLeft className="text-lg text-white "></MdChevronLeft>
            </motion.div>
            <motion.div
              onClick={() => setScroll((prevVal) => prevVal + 200)}
              whileTap={{ scale: 0.75 }}
              className="w-8 h-8 rounded-lg bg-orange-300 flex hover:bg-orange-500 transition-all cursor-pointer ease-in-out duration-100 hover-shadow-lg items-center justify-center"
            >
              <MdChevronRight className="text-lg text-white "></MdChevronRight>
            </motion.div>
          </div>
        </div>
        <RowContainer
          scrollVal={scrollVal}
          flag={true}
          data={foodItems?.filter((n) => n.cate === "fruits")}
        />
      </section>
      <section className="w-full myy-6">
        <MenuContainer />
      </section>
      {cartShow && <CartContainer />}
    </div>
  );
};

export default Container;

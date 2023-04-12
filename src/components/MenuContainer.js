import React, { useEffect, useState } from "react";
import { IoFastFood } from "react-icons/io5";
import { cates } from "../utils/data";
import { motion } from "framer-motion";
import RowContainer from "./RowContainer";
import { useStateValue } from "../context/StateProvider";

const MenuContainer = () => {
  const [filter, setFilter] = useState("chicken");
  const [{ foodItems }, dispatch] = useStateValue();
  useEffect(() => {}, [filter]);
  return (
    <section className="w-full my-6" id="menu">
      <div className="w-full flex flex-col items-center justify-center">
        <p className="text-2xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg before:content before:bg-gradient-to-tr from-orange-400 to-orange-600 before:w-16 before:h-1 before:-bottom-2 before:left-0 transition-all ease-in-out duration-100 mr-auto">
          Our Hot Dishes
        </p>
        <div className="w-full flex items-center justify-start lg:justify-center gap-8 py-6 overflow-x-scroll scrollbar-none">
          {cates &&
            cates.map((cate) => (
              <motion.div
                whileTap={{ scale: 0.6 }}
                onClick={() => setFilter(cate.urlParamName)}
                key={cate.id}
                className={`group  hover:bg-red-600 ${
                  filter === cate.urlParamName ? "bg-cartNumBg" : "bg-white"
                } w-24 min-w-[94px] h-28 cursor-pointer rounded-lg drop-shadow-xl flex flex-col gap-3 items-center justify-center `}
              >
                <div
                  className={`w-10 h-10 shadow-lg rounded-full ${
                    filter === cate.urlParamName ? "bg-white" : "bg-cartNumBg"
                  }  group-hover:bg-white flex items-center justify-center`}
                >
                  <IoFastFood
                    className={` ${
                      filter === cate.urlParamName
                        ? "text-textColor0"
                        : "text-white"
                    } group-hover:text-textColor text-lg`}
                  />
                </div>
                <p
                  className={`text-sm text-textColor ${
                    filter === cate.urlParamName
                      ? "text-white"
                      : "text-textColor"
                  } group-hover:text-white`}
                >
                  {cate.name}
                </p>
              </motion.div>
            ))}
        </div>
        <div className="w-full">
          <RowContainer
            flag={false}
            data={foodItems?.filter((n) => n.cate === filter)}
          ></RowContainer>
        </div>
      </div>
    </section>
  );
};

export default MenuContainer;

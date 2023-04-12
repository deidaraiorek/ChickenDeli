import React, { useState } from "react";
import logo from "../img/logo.png";
import { IoMdBasket } from "react-icons/io";
import avata from "../img/avatar.png";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../firebase.config";
import { useStateValue } from "../context/StateProvider";
import { IoMdAdd, IoMdLogOut } from "react-icons/io";
const Header = () => {
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const [{ user, cartShow, cartItems }, dispatch] = useStateValue();
  const [isMenu, setIsMenu] = useState(false);
  const showCart = () => {
    dispatch({
      type: "SET_CART_SHOW",
      cartShow: !cartShow,
    });
  };
  const login = async () => {
    if (!user) {
      const {
        user: { refreshToken, providerData },
      } = await signInWithPopup(firebaseAuth, provider);
      dispatch({
        type: "SET_USER",
        user: providerData[0],
      });
      localStorage.setItem("user", JSON.stringify(providerData[0]));
    } else {
      setIsMenu(!isMenu);
    }
  };
  const logout = () => {
    setIsMenu(!isMenu);
    localStorage.clear();
    dispatch({
      type: "SET_USER",
      user: null,
    });
  };
  return (
    <header className="fixed z-50 w-screen p-3 px-4 md:p-6 md:px-16 bg-primary">
      {/* Desktop */}
      <div className="hidden md:flex w-full h-full items-center justify-between">
        <Link to={"/"} className="flex items-center gap-2">
          <img src={logo} className="w-8 object-cover" alt="logo" />
          <p className=" text-headingColor text-cl font-bold">Tampa</p>
        </Link>

        <div className="flex items-center gap-8">
          <motion.ul
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 200 }}
            className="flex items-center gap-8"
          >
            <li
              className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-ou cursor-pointer"
              onClick={() => setIsMenu(false)}
            >
              Home
            </li>
            <li
              className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-ou cursor-pointer"
              onClick={() => setIsMenu(false)}
            >
              Menu
            </li>
            <li
              className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-ou cursor-pointer"
              onClick={() => setIsMenu(false)}
            >
              About Us
            </li>
            <li
              className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-ou cursor-pointer"
              onClick={() => setIsMenu(false)}
            >
              Service
            </li>
          </motion.ul>
          <div
            className="relative flex items-center justify-center"
            onClick={showCart}
          >
            <IoMdBasket className="text-textColor text-2xl cursor-pointer" />
            {cartItems && cartItems.length > 0 && (
              <div className=" absolute -top-3 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center">
                <p className="text-xs text-white font-semibold">
                  {cartItems.length}
                </p>
              </div>
            )}
          </div>
          <div className="relative">
            <motion.img
              whileTap={{ scale: 0.6 }}
              src={user ? user.photoURL : avata}
              allt="Avata"
              className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl rounded-full"
              onClick={login}
            />
            {isMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                className="w-40 bg-primary shadow-xl flex flex-col rounded-lg absolute top-12 right-0"
              >
                {user && user.email === "huudangphamt1k11@gmail.com" && (
                  <Link to={"/createItem"}>
                    <p className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-200 transition-all duration-100 ease-in-out text-textColor text-base ">
                      New Item
                      <IoMdAdd />
                    </p>
                  </Link>
                )}
                <p
                  className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-200 transition-all duration-100 ease-in-out text-textColor text-base"
                  onClick={logout}
                >
                  Log Out
                  <IoMdLogOut className="ml-3" />
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
      {/* Mobile */}
      <div className="flex items-center justify-between md:hidden w-full h-full">
        <div className="relative flex items-center justify-center">
          <IoMdBasket
            className="text-textColor text-2xl cursor-pointer"
            onClick={showCart}
          />
          {cartItems && cartItems.length > 0 && (
            <div className=" absolute -top-3 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center">
              <p className="text-xs text-white font-semibold">2</p>
            </div>
          )}
        </div>
        <Link to={"/"} className="flex items-center gap-2">
          <img src={logo} className="w-8 object-cover" alt="logo" />
          <p className=" text-headingColor text-cl font-bold">City</p>
        </Link>

        <div className="relative">
          <motion.img
            whileTap={{ scale: 0.6 }}
            src={user ? user.photoURL : avata}
            allt="Avata"
            className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl rounded-full"
            onClick={login}
          />
          {isMenu && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              className="w-40 bg-primary shadow-xl flex flex-col rounded-lg absolute top-12 right-0"
            >
              {user && user.email === "huudangphamt1k11@gmail.com" && (
                <Link to={"/createItem"}>
                  <p className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-200 transition-all duration-100 ease-in-out text-textColor text-base">
                    New Item
                    <IoMdAdd />
                  </p>
                </Link>
              )}
              <ul
                initial={{ opacity: 0, x: 200 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 200 }}
                className="flex flex-col px-4 py-2 gap-5"
              >
                <li
                  className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-ou cursor-pointer"
                  onClick={() => () => setIsMenu(false)}
                >
                  Home
                </li>
                <li
                  className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-ou cursor-pointer"
                  onClick={() => () => setIsMenu(false)}
                >
                  Menu
                </li>
                <li
                  className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-ou cursor-pointer"
                  onClick={() => () => setIsMenu(false)}
                >
                  About Us
                </li>
                <li
                  className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-ou cursor-pointer"
                  onClick={() => () => setIsMenu(false)}
                >
                  Service
                </li>
              </ul>

              <p
                onClick={logout}
                className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-200 transition-all duration-100 ease-in-out text-textColor text-base"
              >
                Log Out
                <IoMdLogOut className="ml-3" />
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { CreateContainer } from "./components";
import Container from "./components/Container";
import { AnimatePresence } from "framer-motion";
import Header from "./components/Header";
import { useStateValue } from "./context/StateProvider";
import { async } from "@firebase/util";
import { getAllFoodItem } from "./utils/firebaseFunction";

const App = () => {
  const [{ foodItems }, dispatch] = useStateValue();
  const fetchData = async () => {
    const foodItem = await getAllFoodItem();
    dispatch({
      type: "SET_FOOD_ITEMS",
      foodItems: foodItem,
    });
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <AnimatePresence mode="wait">
      <div className="w-screen h-auto flex flex-col bg-primary">
        <Header />
        <main className="mt-14 md:mt-20 px-4 md:px-16 py-4 w-full">
          <Routes>
            <Route path="/" element={<Container />}></Route>
            <Route path="/createItem" element={<CreateContainer />}></Route>
          </Routes>
        </main>
      </div>
    </AnimatePresence>
  );
};

export default App;

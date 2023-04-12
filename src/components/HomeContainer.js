import React from "react";
import delivery from "../img/delivery.png";
import heroBg from "../img/heroBg.png";
import { heroData } from "../utils/data";
const HomeContainer = () => {
  return (
    <section
      className=" grid grid-cols-1 md:grid-cols-2 gap-2 w-full"
      id="home"
    >
      <div className="py-2 flex-1 flex flex-col items-start justify-center  gap-6">
        <div className="flex items-center gap-2 justify-center bg-orange-100  rounded-full px-4 py-1">
          <p className="text-base text-orange-500 font-semibold">
            Bike Delivery
          </p>
          <div className="w-8 h-8 rounded-full overflow-hidden drop-shadow-xl">
            <img
              src={delivery}
              alt="Bike Delivery"
              className="w-full h-full object-contain"
              color="bg-white"
            ></img>
          </div>
        </div>

        <p className="text-[2.5rem] lg:text-[4rem] font-bold tracking-wide text-headingColor ">
          The Fastest Delivery in
          <span className="text-orange-600 text-[3rem] lg:text-[5rem] ">
            Tampa{" "}
          </span>
        </p>
        <p className="text-base text-textColor text-center md:text-left md:w-[80%] ">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliquat. Duis aute
          irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
          fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
          sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>

        <button
          type="button"
          className="bg-gradient-to-br from-orange-400 to-orange-500 w-full px-4 py-2 rounded-lg hover:shadow-lg transition-all ease-in-out duration-300
          md:w-auto"
        >
          Order Now
        </button>
      </div>
      <div className="py-2 flex-1 flex items-center relative ">
        <img
          src={heroBg}
          className=" ml-auto h-420 w-full lg:w-auto lg:h-650"
          alt="Background"
        />
        <div className="w-full h-full absolute top-0 left-0  py-4 flex items-center justify-center gap-4 lg:px-32 flex-wrap ">
          {heroData &&
            heroData.map((n) => (
              <div
                key={n.id}
                className="lg:w-190 p-4 m bg-cardOverlay backdrop:blur-md rounded-3xl flex items-center justify-center flex-col "
              >
                <img
                  src={n.imgSrc}
                  className="w-20 lg:w-40 -mt-10 lg:-mt-20"
                ></img>
                <p className=" text-base lg:text-lg font-semibold text-textColor mt-2 lg:mt-4">
                  {n.name}
                </p>
                <p className="text-[10px] lg:text-md text-gray-500 font-semibold my-2 lg:my-3 ">
                  {n.description}{" "}
                </p>
                <p className="text-sm font-semibold text-headingColor">
                  {" "}
                  <span className="text-xs text-red-600">$</span>
                  {n.price}
                </p>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default HomeContainer;

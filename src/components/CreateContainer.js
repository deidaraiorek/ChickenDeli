import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  MdFastfood,
  MdCloudUpload,
  MdDelete,
  MdFoodBank,
  MdAttachMoney,
} from "react-icons/md";
import { cates } from "../utils/data";
import Loader from "./Loader";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { storage } from "../firebase.config";
import { getAllFoodItem, saveItem } from "../utils/firebaseFunction";
import { useStateValue } from "../context/StateProvider";

const CreateContainer = () => {
  const [title, setTitle] = useState("");
  const [calo, setCalo] = useState("");
  const [price, setPrice] = useState("");
  const [cate, setCate] = useState(null);
  const [field, setField] = useState(false);
  const [alertStatus, setAlurtStatus] = useState("danger");
  const [msg, setMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [imageAsset, setImageAsset] = useState(null);
  const [{ foodItems }, dispatch] = useStateValue();

  const uploadImage = (e) => {
    setIsLoading(true);
    const imageFile = e.target.files[0];
    console.log(imageFile);
    const storageRef = ref(storage, `Images/${Date.now()}-${imageFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const uploadProgress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + uploadProgress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        console.log(error);
        setField(true);
        setMsg("Error while uploading: Try again");
        setAlurtStatus("danger");
        setTimeout(() => {
          setField(false);
          setIsLoading(false);
        }, 4000);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageAsset(downloadURL);
          setIsLoading(false);
          setField(true);
          setMsg("Image uploaded successfully ^^!");
          setAlurtStatus("success");
          setTimeout(() => {
            setField(false);
          }, 4000);
          console.log("File available at", downloadURL);
        });
      }
    );
  };
  const deleteImage = () => {
    setIsLoading(false);
    const deleteRef = ref(storage, imageAsset);
    deleteObject(deleteRef).then(() => {
      setImageAsset(null);
      setIsLoading(false);
      setField(true);
      setMsg("Image deleted successfully ^^!");
      setAlurtStatus("success");
      setTimeout(() => {
        setField(false);
      }, 4000);
    });
  };
  const saveDetails = () => {
    setIsLoading(true);
    try {
      if (!title || !calo || !imageAsset || !price || !cate) {
        setField(true);
        setMsg("All fields must be filled");
        setAlurtStatus("danger");
        setTimeout(() => {
          setField(false);
          setIsLoading(false);
        }, 4000);
      } else {
        const data = {
          id: `${Date.now()}`,
          title: title,
          imageUrl: imageAsset,
          cate: cate,
          calo: calo,
          qty: 1,
          price: price,
        };
        saveItem(data);
        setIsLoading(false);
        setField(true);
        setMsg("Data uploaded successfully ^^!");
        clearData();
        setAlurtStatus("success");
        setTimeout(() => {
          setField(false);
        }, 4000);
      }
    } catch (error) {
      console.log(error);
      setField(true);
      setMsg("Error while uploading: Try again");
      setAlurtStatus("danger");
      setTimeout(() => {
        setField(false);
        setIsLoading(false);
      }, 4000);
    }
    fetchData();
  };
  const clearData = () => {
    setTitle("");
    setImageAsset(null);
    setCalo("");
    setPrice("");
    setCate("Select Category");
  };
  const fetchData = async () => {
    const foodItem = await getAllFoodItem();
    dispatch({
      type: "SET_FOOD_ITEMS",
      foodItems: foodItem,
    });
  };
  return (
    <div className="w-full min-h-screen h-auto flex items-center justify-center">
      <div className="w-[90%] md:w-[75%] border border-gray-300 rounded-lg  flex flex-col items-center justify-center p-4 gap-4">
        {field && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`w-full p-2 rounded-lg  text-lg  text-center ${
              alertStatus === "danger"
                ? `bg-red-400 text-red-800`
                : `bg-emerald-400 text-emerald-800`
            }`}
          >
            {msg}{" "}
          </motion.p>
        )}
        <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
          <MdFastfood className="text-xl text-gray-700" />
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Give me a title..."
            className="w-full h-full text-lg bg-transparent 
            outline-none
            border-none
            placeholder:text-gray-400
            text-text-color"
          ></input>
        </div>
        <div className="w-full">
          <select
            onChange={(e) => setCate(e.target.value)}
            className="outline-none w-full text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer "
          >
            <option value="other" className="bg-white">
              Select Category
            </option>
            {cates &&
              cates.map((i) => (
                <option
                  key={i.id}
                  className="text-base border-0 outline-none capitalize bg-white text-textColor"
                  value={i.urlParamName}
                >
                  {i.name}
                </option>
              ))}
          </select>
        </div>
        <div className="group flex justify-center items-center flex-col border-2 border-dotted border-gray-300 w-full h-225 md:420 cursor-pointer rounded-lg">
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {!imageAsset ? (
                <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                  <div className="w-full h-full gap-2 flex flex-col items-center justify-center">
                    <MdCloudUpload className="text-gray-500 text=3xl hover:text-gray-700 " />
                    <p className="text-gray-500 text-3xl hover:text-gray-700">
                      Click here to upload image
                    </p>
                  </div>
                  <input
                    type="file"
                    name="uploadimage"
                    accept="image/*"
                    onChange={uploadImage}
                    className="w-0 h-0"
                  />
                </label>
              ) : (
                <>
                  <div className="relative h-full ">
                    <img
                      src={imageAsset}
                      alt="uploaded image"
                      className="w-full h-full object-cover"
                    ></img>
                    <button
                      type="button"
                      className="absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md duration-500 transition-all ease-in-out"
                      onClick={deleteImage}
                    >
                      <MdDelete className="text-white" />
                    </button>
                  </div>
                </>
              )}
            </>
          )}{" "}
        </div>
        <div className="w-full flex flex-col md:flex-row items-center gap-3">
          <div className="w-full py-2 border-b-300 border-gray-300 flex items-center gap-2">
            <MdFoodBank className="text-gray-700 text-2xl" />
            <input
              type="text"
              required
              value={calo}
              onChange={(e) => setCalo(e.target.value)}
              placeholder="Calories"
              className="w-full h-full text-lg bg-transparent outline-none boder-none placeholder:text-gray-400"
            ></input>
          </div>
          <div className="w-full py-2 border-b-300 border-gray-300 flex items-center gap-2">
            <MdAttachMoney className="text-gray-700 text-2xl" />
            <input
              type="text"
              required
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full h-full text-lg bg-transparent outline-none boder-none placeholder:text-gray-400"
            ></input>
          </div>
        </div>
        <div className="flex items-center w-full">
          <button
            type="button"
            className="ml-0 md:ml-auto w-full md:w-auto border-none outline-none bg-emerald-500 px-12 py-2 rounded-lg text-lg text-white font-semibold "
            onClick={saveDetails}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateContainer;

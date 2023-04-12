import { fetchUser } from "../utils/fetchLocalStorageData";
import { fecthCart } from "../utils/fetchLocalStorageData";
const userInfo = fetchUser();
const cartInfo = fecthCart();
export const initialState = {
  user: userInfo,
  foodItems: null,
  cartShow: false,
  cartItems: cartInfo,
};

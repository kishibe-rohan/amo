import { GET_CATEGORIES } from "../constants/categoryConstants";
import axios from "axios";

//Get All Categories
export const getCategories = () => async (dispatch) => {
  const { data } = await axios.get("/api/v1/categories");
  dispatch({ type: GET_CATEGORIES, payload: data.categories });
};

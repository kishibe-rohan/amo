import { GET_CATEGORIES } from "../constants/categoryConstants";

export const categoriesReducer = (state = { categories: [] }, action) => {
  switch (action.type) {
    case GET_CATEGORIES:
      return {
        categories: action.payload,
      };

    default:
      return state;
  }
};

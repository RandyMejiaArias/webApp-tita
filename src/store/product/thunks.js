import nextSnkrsApi from "../../api/nextSnkrsApi";
import { fetchDataFailure, fetchDataStart, fetchDataSuccess } from "../api";
import { addFetchedProducts, setProducts } from "./productSlice";

export const startLoadingProducts = () => {
  return async (dispatch) => {
    dispatch(fetchDataStart());
    try {
      const { data: dataReceived } = await nextSnkrsApi.get(
        '/products'
      );

      const { data, total, message } = dataReceived;
      
      dispatch(fetchDataSuccess(message));
      dispatch(setProducts({
        products: data, total
      }));
    } catch ({ response, request, message, status }) {
      dispatch(fetchDataFailure(response.data));
      if (response) {
        console.log('response error');
        console.error(response.data);
      } else if (request) {
        dispatch(fetchDataFailure({
          message: 'Error on connect with server.',
          status: 500
        }));
      } else {
        console.log('Error', message);
      }
    }
  }
}

export const startSearchingProducts = (query) => {
  return async (dispatch) => {
    dispatch(fetchDataStart());
    try {
      const { data } = await nextSnkrsApi.get(
       `products/search?queryText=${query}`
      );
      dispatch(fetchDataSuccess(data));
      dispatch(addFetchedProducts({
        total: data.total,
        products: data.data
      }));
    } catch (error) {
      console.log(error)
      dispatch(fetchDataFailure(error.message));
    }
  }
}
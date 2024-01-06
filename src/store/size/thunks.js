import nextSnkrsApi from "../../api/nextSnkrsApi";
import { fetchDataFailure, fetchDataStart, fetchDataSuccess } from "../api/apiSizesSlice";
import { setSizes } from "./sizeSlice";

export const startLoadingSizesByProduct = (productId) => {
  return async (dispatch) => {
    dispatch(fetchDataStart());
    try {
      const { data: dataReceived } = await nextSnkrsApi.get(
        `/sizes/product/${productId}`
      );
      
      const { data, total } = dataReceived;
      
      dispatch(fetchDataSuccess({data}));
      dispatch(setSizes({
        sizes: data, total
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
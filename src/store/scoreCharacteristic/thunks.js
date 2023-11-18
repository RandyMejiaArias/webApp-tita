import nextSnkrsApi from "../../api/nextSnkrsApi";
import { setCharacteristics, setSavedCharacteristic, setSavingCharacteristic } from "./scoreCharacteristicSlice"

export const startSavingNewCharacteristic = (values = {}) => {
  return async (dispatch) => {
    dispatch(setSavingCharacteristic());

    const dataToUpload = values;

    try {
      const { data, status } = await nextSnkrsApi.post(
        '/scoringCharacteristics',
        dataToUpload
      );
      data.status = status;
      dispatch(setSavedCharacteristic(data));
    } catch ({ response, request, message, status }) {
      console.log('has error');
      if (response) {
        console.log('response error');
        console.error(response.data);
      } else if (request) {
        dispatch(setSavedCharacteristic({
          message: 'Error on connect with server.',
          status: 500
        }));
        console.error(request);
      } else {
        console.log('Error', message);
      }
    }
  }
}

export const startLoadingCharacteristics = () => {
  return async (dispatch) => {
    try {
      const { data: dataReceived, status } = await nextSnkrsApi.get(
        '/scoringCharacteristics'
      );

      const { data, total, message, error } = dataReceived;
      
      dispatch(setCharacteristics({
        characteristics: data,
        message,
        error
      }));
    } catch ({ response, request, message, status }) {
      console.log('has error');
      if (response) {
        console.log('response error');
        console.error(response.data);
      } else if (request) {
        dispatch(setSavedCharacteristic({
          message: 'Error on connect with server.',
          status: 500
        }));
        console.error(request);
      } else {
        console.log('Error', message);
      }
    }
  }
}
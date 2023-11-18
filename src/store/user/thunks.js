import nextSnkrsApi from "../../api/nextSnkrsApi";
import { setSavedUser, setSavingUser, setUsers } from "./userSlice";

export const startSavingNewUser = (values = {}) => {
  return async (dispatch) => {
    dispatch(setSavingUser());

    const dataToUpload = values;

    try {
      const { data, status } = await nextSnkrsApi.post(
        '/users',
        dataToUpload
      );
      data.status = status;
      dispatch(setSavedUser(data));
    } catch ({ response, request, message, status }) {
      console.log('has error');
      if (response) {
        console.log('response error');
        console.error(response.data);
      } else if (request) {
        dispatch(setSavedUser({
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

export const startLoadingUsers = () => {
  return async (dispatch) => {
    try {
      const { data: dataReceived, status } = await nextSnkrsApi.get(
        '/users'
      );

      const { data, total, message, error } = dataReceived;

      dispatch(setUsers({
        users: data,
        total,
        message,
        error
      }));
    } catch ({ response, request, message, status }) {
      console.log('has error');
      if (response) {
        console.log('response error');
        console.error(response.data);
      } else if (request) {
        dispatch(setSavedUser({
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
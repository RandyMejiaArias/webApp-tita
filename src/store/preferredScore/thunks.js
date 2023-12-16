import nextSnkrsApi from "../../api/nextSnkrsApi";
import { fetchDataFailure, fetchDataStart, fetchDataSuccess } from "../api";
import { setPreferredScores } from "./preferredScoreSlice"

export const startSavingPreferredScore = (values = {}) => {
  return async (dispatch) => {
    dispatch(fetchDataStart());
    const scoreItems = [];
    scoreItems.push(values);

    const dataToUpload = {scoreItems};

    try {
      const { data: dataReceived } = await nextSnkrsApi.post(
        '/preferredScoring',
        dataToUpload
      );
      const { message } = dataReceived;
      dispatch(fetchDataSuccess({ data: message }));
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
        console.error(request);
      } else {
        console.log('Error', message);
      }
    }
  }
}

export const startLoadingPreferredScore = () => {
  return async (dispatch) => {
    dispatch(fetchDataStart());
    try {
      const { data: dataReceived } = await nextSnkrsApi.get(
        '/preferredScoring'
      );
      
      const { scoringCharacteristics } = dataReceived;
      dispatch(fetchDataSuccess(scoringCharacteristics))
      dispatch(setPreferredScores({
        preferredScores: scoringCharacteristics
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
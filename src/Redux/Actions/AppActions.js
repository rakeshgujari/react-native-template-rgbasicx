import { DATA_LIST } from './Types.js';


export const getDataList = payload => {
  return {
    type: DATA_LIST,
    payload: payload
  }
  }


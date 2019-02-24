import { DATA_LIST } from "../Actions/Types.js";

const initialState = {
    list: []
};

const appReducer = (state = initialState, action) => {
   
  switch(action.type) {
    
    case DATA_LIST: {
      return {
        ...state,
        list: [...action.payload],
      }
    }
    default:
      return state;
  }
}

export default appReducer;
import { UPDATE_ALGORITHM, VISUALIZE_ALGORITHM } from '../Actions/actionType';

const initalState = { 
  algorithm: '',
  visualizeState: false
};
export default function(state = initalState, action){
  switch (action.type) {
    case UPDATE_ALGORITHM:
      return {
        ...state,
        algorithm: action.payload
      }
    case VISUALIZE_ALGORITHM:
        return {
          ...state,
          visualizeState: action.payload
        }
    default:
      return state;
  }
}



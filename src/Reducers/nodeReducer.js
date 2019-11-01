import { UPDATE_START_NODE, UPDATE_FINISH_NODE } from '../Actions/actionType';

const initialState = { 
  startNode: { x: 0, y: 0 },
  finishNode: { x: 10, y: 10 }
}

export default function (state = initialState, action) {
  switch (action.type) {
    case UPDATE_FINISH_NODE:
      return {
        ...state,
        finishNode: action.payload
      }
    case UPDATE_START_NODE:
      return {
        ...state,
        startNode: action.payload
      }
    default:
      return state;
  }
}
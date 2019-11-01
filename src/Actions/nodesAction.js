import { UPDATE_START_NODE, UPDATE_FINISH_NODE } from './actionType';

export const UpdateStartNode = (node) => {
  return (dispatch) => {
    dispatch({ type: UPDATE_START_NODE, payload: node })
  }
}

export const UpdateFinishNode = (node) => {
  return (dispatch) => {
    dispatch({ type: UPDATE_FINISH_NODE, payload: node })
  }
}

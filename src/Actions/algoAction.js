import { UPDATE_ALGORITHM, VISUALIZE_ALGORITHM } from './actionType';

export const UpdateAlgorithm = (algorithm) => {
  return (dispatch) => dispatch({ type: UPDATE_ALGORITHM, payload: algorithm })
}

export const VisualizeAlgorithm = (visualizeState) => {
  return (dispatch) => dispatch({ type: VISUALIZE_ALGORITHM, payload: visualizeState })  
}
import React from 'react';
import * as itemStates from '../../../constants/itemState';

import './item.css';

export const createItem = (index, value, state) => {
  return {
    state,
    index,
    value,
  }
}

export function getItemClass(state) {
  const stateClass = {
    [itemStates.Sorted]: 'sorted',
    [itemStates.Default]: 'default',
    [itemStates.Swapping]: 'swapping',
    [itemStates.Comparing]: 'comparing',
  }
  return `item ${stateClass[state]}`;
}


export default ({ state, height, width, id }) =>
  <div
    id={id}
    className={getItemClass(state)}
    style={{ height: height, width: width }} />

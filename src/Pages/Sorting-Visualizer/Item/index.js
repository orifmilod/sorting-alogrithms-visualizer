import React from 'react';
import * as itemStates from '../../../constants/itemState';
import styled, { css } from 'styled-components';

export const createItem = (index, value, state) => {
  return {
    state,
    index,
    value,
  }
}
const stateClass = {
  [itemStates.Sorted]: 'green',
  [itemStates.Default]: 'Blue',
  [itemStates.Swapping]: 'yellow',
  [itemStates.Comparing]: 'lightblue',
}

const Item = styled.div`
  margin: 0 2px;
  width: ${props => props.width};
  height: ${props => props.height};
  background: ${props => stateClass[props.state]}
`

export default ({ state, height, width, id }) => {
  console.log(id)
  return <Item key={id} height={height} width={width} state={state} />
}

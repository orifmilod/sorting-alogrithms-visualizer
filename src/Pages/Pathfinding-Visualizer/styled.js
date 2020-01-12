import styled from 'styled-components';

export const PageContainer = styled.div`
  text-align: center;
  width: 100vw;
`;

export const Grid = styled.div`
  margin: auto;
  width: fit-content;
  height: fit-content;

  display: grid;
  grid-row-gap: 0;
  grid-auto-flow: row;
  vertical-align: middle;
`

export const Column = styled.div`
  display: grid;
  grid-column-gap: 0;
  grid-auto-flow: column;
`


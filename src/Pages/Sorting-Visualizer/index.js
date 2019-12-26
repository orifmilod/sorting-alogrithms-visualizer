import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { Navbar, NavDropdown, Nav, Row } from 'react-bootstrap';

import Item, { createItem, getItemClass } from './Item';

import * as Algorithms from '../../constants/sorting';
import minimumValue from '../../constants/itemMinimum';
import * as itemStates from '../../constants/itemState';
import mergeSort from '../../Algorithms/Sorting/Merge';
import bubbleSort from '../../Algorithms/Sorting/Bubble';
import { Input } from '../../components/common';

const Container = styled.div`
  width: 100vw;
  height: fit-content;
`;

const Grid = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: row;

  overflow-y: scroll;
  overflow-x: hidden; 
`;


export default function SortingVisualizer() {
  const [numbers, setNumbers] = useState([]);
  const [isSorting, setIsSorting] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('');

  useEffect(() => {
    updateNumbers();
  }, []);

  function updateNumbers() {
    let numbers = [];
    for (let i = 150; i >= 0; i--) {
      numbers.push(createItem(i, i + minimumValue, itemStates.Default));
    }
    setNumbers(numbers);
  }

  function startSorting() {
    setIsSorting(true);
    startAlgorithm(selectedAlgorithm);
  }

  function startAlgorithm(algorithm) {
    if (!algorithm.trim()) {
      toast.error('Please select a sorting algorithm!');
      return
    }
    const options = {
      [Algorithms.Bubble]: bubbleSort(numbers),
      [Algorithms.Merge]: mergeSort(numbers),
    }
    const { sorted, history } = options[algorithm];
    animateGrid(history);
  }

  function animateGrid(historyOfComparisions) {
    for (let i = 0; i < historyOfComparisions.length - 1; i++) {
      setTimeout(() => {
        const currentNode = historyOfComparisions[i];
        const comparingNode = historyOfComparisions[i + 1];
        const nodeElem = document.getElementById(`bar-${currentNode.index}`)
        const comparingElem = document.getElementById(`bar-${comparingNode.index}`);
        const classname = getItemClass(currentNode.state);
        nodeElem.className = classname;
        comparingElem.className = classname;
        comparingElem.style.height = `${comparingElem.value}px`;
        nodeElem.style.height = `${currentNode.value}px`;
        if (i === historyOfComparisions.length - 2) {
          toast.success('Horray sorted all out');
          toast.warn('Please refresh the page to reset!', { autoClose: false })
        }
      }, i / speed)

    }
  }


  return (
    <Container>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand>Sorting visualizer</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link className='text-info' onClick={startSorting}> Start sorting </Nav.Link>

            <NavDropdown title="Algorithms" id="basic-nav-dropdown">
              <NavDropdown.Item active={selectedAlgorithm === Algorithms.Bubble} onClick={() => setSelectedAlgorithm(Algorithms.Bubble)}>
                Bubble Sort
              </NavDropdown.Item>
              <NavDropdown.Item active={selectedAlgorithm === Algorithms.Merge} onClick={() => setSelectedAlgorithm(Algorithms.Merge)}>
                Merge Sort
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link className='text-info' onClick={updateNumbers}> Reset  </Nav.Link>
          </Nav>

        </Navbar.Collapse>
      </Navbar>
      <Row className='justify-content-center'>
        <Input
          label='speed'
          value={speed}
          type='number'
          onChange={e =>
            setSpeed(e.target.value ? e.target.value : speed)
          }
        />
      </Row>
      <Grid>
        {
          numbers.map((bar, index) =>
            <Item
              state={bar.state}
              id={`bar-${index}`}
              height={`${bar.value}px`}
              width={`${(window.innerWidth - 100) / numbers.length / 2}px`}
            />)
        }
      </Grid>

    </Container>
  )
}

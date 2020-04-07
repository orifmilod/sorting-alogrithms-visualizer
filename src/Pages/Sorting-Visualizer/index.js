import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';

import { Link } from 'react-router-dom';
import { Input } from '../../components/common';
import Item, { createItem, getItemClass } from './Item';
import { Navbar, NavDropdown, Nav, Row } from 'react-bootstrap';
import * as Algorithms from '../../constants/sorting';
import minimumValue from '../../constants/itemMinimum';
import mergeSort from '../../Algorithms/Sorting/Merge';
import * as itemStates from '../../constants/itemState';
import bubbleSort from '../../Algorithms/Sorting/Bubble';
import insertionSort from '../../Algorithms/Sorting/Insertion';


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
  const [speed, setSpeed] = useState(10);
  const [numbers, setNumbers] = useState([]);
  const [isSorting, setIsSorting] = useState(false);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('');
  const [numberOfColumns, setnumberOfColumns] = useState(20);

  useEffect(() => {
    generateRandom();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numberOfColumns]);

  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  function generateRandom() {
    let numbers = [];
    for (let i = numberOfColumns; i >= 0; i--) {
      const number = getRandomInt(200);
      numbers.push(createItem(i, number + minimumValue, itemStates.Default));
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
      [Algorithms.Insertion]: insertionSort(numbers),
    }
    const { history } = options[algorithm];
    animateSorting(history);
  }

  function animateSorting(historyOfComparisions) {
    for (let i = 0; i < historyOfComparisions.length - 1; i++) {
      setTimeout(() => {
        const currentNode = historyOfComparisions[i];
        const comparingNode = historyOfComparisions[i + 1];
        const nodeElem = document.getElementById(`bar-${currentNode.index}`)
        const comparingElem = document.getElementById(`bar-${comparingNode.index}`);
        const classname = getItemClass(currentNode.state);
        nodeElem.className = classname;
        comparingElem.className = classname;
        comparingElem.style.height = `${comparingElem.value * 2}px`;
        nodeElem.style.height = `${currentNode.value * 2}px`;
        if (i === historyOfComparisions.length - 2) {
          toast.success('Horray sorted all out');
        }
      }, i / (speed / 500))
    }
  }

  function isActive(algorithm) {
    return selectedAlgorithm === algorithm
  }

  return (
    <Container>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand> Sorting visualizer </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link className='text-info' onClick={startSorting}>  Start visualization  </Nav.Link>

            <NavDropdown title="Algorithms" id="basic-nav-dropdown">
              <NavDropdown.Item active={isActive(Algorithms.Bubble)} onClick={() => setSelectedAlgorithm(Algorithms.Bubble)}>
                Bubble Sort
              </NavDropdown.Item>
              {/* <NavDropdown.Item active={selectedAlgorithm === Algorithms.Merge} onClick={() => setSelectedAlgorithm(Algorithms.Merge)}>
                Merge Sort
              </NavDropdown.Item> */}
              <NavDropdown.Item active={isActive(Algorithms.Insertion)} onClick={() => setSelectedAlgorithm(Algorithms.Insertion)}>
                Insertion Sort
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link className='text-info' onClick={generateRandom}>
              Reset
            </Nav.Link>
            <Nav.Link>
              <Link to='/path-finding'> Pathfinding Visualizer </Link>
            </Nav.Link>
          </Nav>

        </Navbar.Collapse>
      </Navbar>
      <Row className='justify-content-center'>
        <Input
          value={speed}
          type='number'
          label='Visulize speed'
          onChange={e => setSpeed(e.target.value ? e.target.value : speed)}
        />

        <Input
          type='number'
          label='Columns'
          value={numberOfColumns}
          onChange={e => setnumberOfColumns(e.target.value >= 5 ? e.target.value : numberOfColumns)}
        />
      </Row>
      <Grid>
        {
          numbers.map((bar, index) =>
            <Item
              state={bar.state}
              id={`bar-${index}`}
              height={`${bar.value * 2}px`}
              width={`${(window.innerWidth - 100) / numbers.length / 2}px`}
            />)
        }
      </Grid>
    </Container>
  )
}

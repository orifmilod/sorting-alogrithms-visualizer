import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify';
import styled from 'styled-components';

import Node from './Node';
import { Input } from '../../components/common';
import { Row, Col, Navbar, NavDropdown, Nav } from 'react-bootstrap';

import * as Algorithms from '../../constants/pathFinding';
import aStar from '../../Algorithms/PathFinding/A-Star';
import dijkstra from '../../Algorithms/PathFinding/Dijsktra';
import { getInitialGrid, getNewGridWithWallToggled } from './utils';

const PageContainer = styled.div`
  text-align: center;
  width: 100vw;
`;

const Grid = styled.div`
  margin: auto;
  width: fit-content;
  height: fit-content;

  display: grid;
  grid-row-gap: 0;
  grid-auto-flow: row;
  vertical-align: middle;
`

const Column = styled.div`
  display: grid;
  grid-column-gap: 0;
  grid-auto-flow: column;
`

export default function PathfindingVisualizer() {
  const [grid, updateGrid] = useState([]);
  const [isVisualizing, setIsVisualizing] = useState(false);
  const [startNodeX, setStartNodeX] = useState(0);
  const [startNodeY, setStartNodeY] = useState(0);

  const [finishNodeX, setFinishNodeX] = useState(10);
  const [finishNodeY, setFinishNodeY] = useState(10);

  const [mouseIsPressed, updateMousePressed] = useState(false);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('');

  useEffect(() => {
    const startNode = { x: startNodeX, y: startNodeY }
    const finishNode = { x: finishNodeX, y: finishNodeY }
    updateGrid(getInitialGrid(55, 25, startNode, finishNode));
  }, [finishNodeX, finishNodeY, startNodeX, startNodeY])

  function startAlgorithm(algorithm) {
    if (!algorithm.trim()) {
      toast.error('Please select an algorithm!');
      return;
    }
    const startNode = { x: startNodeX, y: startNodeY };
    const finishNode = { x: finishNodeX, y: finishNodeY };

    const options = {
      [Algorithms.Astar]: aStar(grid, startNode, finishNode),
      [Algorithms.Dijkstra]: dijkstra(grid, startNode, finishNode),
    }
    const result = options[algorithm];
    animateGrid(result.checked, result.path);
  }

  function animateShortestPath(nodesInShortestPathOrder) {
    if (nodesInShortestPathOrder === -1) {
      toast.error("Sorry, couldn't find the path.")
      return;
    }
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.x}-${node.y}`).className = 'node node-shortest-path';
      }, 50 * i);
    }
    toast.success("Horray, found the path.");
    toast.warn('Please refresh the page to visualize algorithm again, we haven not set up Clear button in website yet, work in progress!');

    setIsVisualizing(false);
  }

  function animateGrid(visitedNodesInOrder, nodesInShortestPathOrder) {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.x}-${node.y}`).className = 'node node-visited';
      }, 10 * i);
    }

  }

  function handleMouseDown(x, y) {
    if (isVisualizing)
      return;
    const newGrid = getNewGridWithWallToggled(grid, x, y);
    updateGrid(newGrid);
    updateMousePressed(true);
  }

  function handleMouseEnter(x, y) {
    if (!mouseIsPressed || isVisualizing)
      return;
    const newGrid = getNewGridWithWallToggled(grid, x, y);
    updateGrid(newGrid);
  }

  function handleMouseUp() {
    if (isVisualizing)
      return;
    updateMousePressed(false);
  }

  function startVisualization() {
    setIsVisualizing(true);
    startAlgorithm(selectedAlgorithm);
  }

  function resetGrid() {
    if (isVisualizing)
      return;

    setStartNodeX(0);
    setStartNodeY(0);
    setFinishNodeX(10);
    setFinishNodeY(10);
  }

  return (
    <PageContainer>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand>Pathfinding visualizer</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link className='text-info' onClick={startVisualization}> Start visualization </Nav.Link>
            <NavDropdown title="Algorithms" id="basic-nav-dropdown">
              <NavDropdown.Item href='' active={selectedAlgorithm === Algorithms.Astar} onClick={() => setSelectedAlgorithm(Algorithms.Astar)}>
                A Start
              </NavDropdown.Item>
              <NavDropdown.Item href='' active={selectedAlgorithm === Algorithms.Dijkstra} onClick={() => setSelectedAlgorithm(Algorithms.Dijkstra)}>
                Dijkstra
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link className='text-info' onClick={resetGrid}> Reset  </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Col className='d-flex justify-content-center'>
        <Col xs={5} xl={2}>
          <Row> Start Point </Row>
          <Row className='flex-nowrap'>
            <Input
              min={0}
              label='X='
              type='number'
              value={startNodeX}
              onChange={e => setStartNodeX(e.target.value ? parseInt(e.target.value) : startNodeX)}
            />
            <Input
              label='Y='
              type='number'
              value={startNodeY}
              onChange={e => setStartNodeY(e.target.value >= 0 ? parseInt(e.target.value) : startNodeY)}
            />
          </Row>
        </Col>
        <Col xs={5} xl={2}>
          <Row>Finish point</Row>
          <Row className='flex-nowrap'>
            <Input
              min={0}
              label='X='
              type='number'
              value={finishNodeX}
              onChange={e => setFinishNodeX(e.target.value ? parseInt(e.target.value) : finishNodeX)}
            />
            <Input
              min={0}
              label='Y='
              type='number'
              value={finishNodeY}
              onChange={e => setFinishNodeY(e.target.value >= 0 ? parseInt(e.target.value) : finishNodeY)}
            />
          </Row>
        </Col>
      </Col>

      <Grid>
        {grid.map((row, indexRow) =>
          <Column key={indexRow}>
            {row.map((node, nodeIndex) =>
              <Node
                node={node}
                key={nodeIndex}
                onMouseUp={handleMouseUp}
                onMouseDown={handleMouseDown}
                onMouseEnter={handleMouseEnter}
              />
            )}
          </Column>
        )}
      </Grid>

    </PageContainer>
  )
}
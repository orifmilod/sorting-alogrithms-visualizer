import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify';
import styled from 'styled-components';

import Node from './Node';
import { Input } from '../../components/common';
import { Row, Col, Navbar, NavDropdown, Nav } from 'react-bootstrap';
import * as Algorithms from '../../constants/Algorithms';
import AStar from '../../Algorithms/PathFinding/A-Star';
import Dijkstra from '../../Algorithms/PathFinding/Dijsktra';
import { getInitialGrid, getNewGridWithWallToggled } from './utils';

import './Pathfinding-Visualizer.css';

const PageContainer = styled.div`
  text-align: center;
  width: 100vw;
`;


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
      [Algorithms.ASTAR]: AStar(grid, startNode, finishNode),
      [Algorithms.DIJKSTRA]: Dijkstra(grid, startNode, finishNode),
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
    const newGrid = getNewGridWithWallToggled(grid, x, y);
    updateGrid(newGrid);
    updateMousePressed(true);
  }

  function handleMouseEnter(x, y) {
    if (!mouseIsPressed) return;
    const newGrid = getNewGridWithWallToggled(grid, x, y);
    updateGrid(newGrid);
  }

  function handleMouseUp() {
    updateMousePressed(false);
  }

  function startVisualization() {
    setIsVisualizing(true);
    startAlgorithm(selectedAlgorithm);
  }

  return (
    <PageContainer>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand>Pathfindin visualizer</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link className='text-info' onClick={startVisualization}> Start visualization </Nav.Link>

            <NavDropdown title="Algorithms" id="basic-nav-dropdown">
              <NavDropdown.Item href='' active={selectedAlgorithm === Algorithms.ASTAR} onClick={() => setSelectedAlgorithm(Algorithms.ASTAR)}>
                A Start
              </NavDropdown.Item>
              <NavDropdown.Item href='' active={selectedAlgorithm === Algorithms.DIJKSTRA} onClick={() => setSelectedAlgorithm(Algorithms.DIJKSTRA)}>
                Dijkstra
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>

        </Navbar.Collapse>
      </Navbar>
      {/* <Header>
        <p>Pathfinding visualizer</p>

        <Button onClick={startVisualization} className='m-1'>Visualize</Button>
      </Header> */}
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
              label='Y='
              type='number'
              value={finishNodeY}
              onChange={e => setFinishNodeY(e.target.value >= 0 ? parseInt(e.target.value) : finishNodeY)}
            />
          </Row>
        </Col>
      </Col>
      <div className='grid'>
        {
          grid.map((row, indexRow) =>
            <div className='column' key={indexRow}>
              {row.map((node, nodeIndex) =>
                <Node
                  node={node}
                  key={nodeIndex}
                  onMouseUp={handleMouseUp}
                  onMouseDown={handleMouseDown}
                  onMouseEnter={handleMouseEnter}
                />
              )}
            </div>
          )}
      </div>
      {/* <Button onClick={() => updateGrid(getInitialGrid(55, 25, startNode, finishNode))}> Clean </Button> */}
    </PageContainer>
  )
}
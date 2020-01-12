import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify';

import { Input } from '../../components/common';
import { Column, Grid, PageContainer } from './styled';
import Node, { createNode, getNodeClass, getNodeID } from './Node';
import { Row, Col, Navbar, NavDropdown, Nav } from 'react-bootstrap';

import * as nodeStates from '../../constants/nodeState';
import aStar from '../../Algorithms/PathFinding/A-Star';
import * as Algorithms from '../../constants/pathFinding';
import dijkstra from '../../Algorithms/PathFinding/Dijsktra';

import { getInitialGrid, updateNode } from './utils';

export default function PathfindingVisualizer({ onChangePage }) {
  const [grid, updateGrid] = useState([]);
  const [isVisualizing, setIsVisualizing] = useState(false);
  const [mouseIsPressed, updateMousePressed] = useState(false);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('');
  const [startNode, setStartNode] = useState(createNode(0, 0, nodeStates.Default))
  const [finishNode, setFinishNode] = useState(createNode(10, 10, nodeStates.Default))

  useEffect(() => {
    updateGrid(getInitialGrid(55, 25, startNode, finishNode));
  }, [finishNode, startNode])

  function startVisualization() {
    setIsVisualizing(true);
    startAlgorithm(selectedAlgorithm);
  }

  function startAlgorithm(algorithm) {
    if (!algorithm.trim()) {
      toast.error('Please select an algorithm!');
      return;
    }
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
        document.getElementById(getNodeID(node.x, node.y)).className = getNodeClass(nodeStates.ShortestPath);
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
        document.getElementById(getNodeID(node.x, node.y)).className = getNodeClass(nodeStates.Visited);
      }, 10 * i);
    }
  }

  function handleMouseDown(x, y) {
    if (isVisualizing)
      return;
    //Update node state, if Default change it to Wall, and vice versa
    const newNode = toggleWall(x, y);
    const newGrid = updateNode(grid, newNode);
    updateGrid(newGrid);
    updateMousePressed(true);
  }

  function toggleWall(x, y) {
    const updatedState = grid[y][x].state === nodeStates.Default ?
      nodeStates.Wall : nodeStates.Default;
    return createNode(x, y, updatedState);
  }

  function handleMouseEnter(x, y) {
    if (!mouseIsPressed || isVisualizing)
      return;
    const newNode = toggleWall(x, y)
    const newGrid = updateNode(grid, newNode);
    updateGrid(newGrid);
  }

  function handleMouseUp() {
    if (isVisualizing)
      return;
    updateMousePressed(false);
  }

  function resetGrid() {
    if (isVisualizing)
      return;
    // const grid = getInitialGrid(55, 25, startNode, finishNode)
    // updateGrid(grid);
  }

  return (
    <PageContainer>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand>
          Pathfinding visualizer
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link className='text-info' onClick={startVisualization}> Start visualization </Nav.Link>
            <NavDropdown title="Algorithms">
              <NavDropdown.Item active={selectedAlgorithm === Algorithms.Astar} onClick={() => setSelectedAlgorithm(Algorithms.Astar)}>
                A Start
              </NavDropdown.Item>
              <NavDropdown.Item active={selectedAlgorithm === Algorithms.Dijkstra} onClick={() => setSelectedAlgorithm(Algorithms.Dijkstra)}>
                Dijkstra
              </NavDropdown.Item>
            </NavDropdown>
            {/* <Nav.Link className='text-info' onClick={resetGrid}> Reset  </Nav.Link> */}
            <Nav.Link onClick={onChangePage}> Sorting Visualizer  </Nav.Link>
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
              value={startNode.x}
              onChange={e =>
                setStartNode(e.target.value
                  ? { ...startNode, x: parseInt(e.target.value) }
                  : startNode
                )
              }
            />
            <Input
              label='Y='
              type='number'
              value={startNode.y}
              onChange={e =>
                setStartNode(e.target.value
                  ? { ...startNode, y: parseInt(e.target.value) }
                  : startNode
                )
              }
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
              value={finishNode.x}
              onChange={e =>
                setFinishNode(e.target.value
                  ? { ...finishNode, x: parseInt(e.target.value) }
                  : finishNode
                )
              }
            />
            <Input
              min={0}
              label='Y='
              type='number'
              value={finishNode.y}
              onChange={e =>
                setFinishNode(e.target.value
                  ? { ...finishNode, y: parseInt(e.target.value) }
                  : finishNode
                )
              }
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

    </PageContainer >
  )
}
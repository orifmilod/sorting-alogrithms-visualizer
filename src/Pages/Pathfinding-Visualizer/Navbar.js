import React from 'react';
import { Link } from 'react-router-dom';
import {  Navbar, NavDropdown, Nav  } from 'react-bootstrap';
import * as Algorithms from '../../constants/pathFinding';

export default ({ startVisualization, setSelectedAlgorithm, selectedAlgorithm, resetGrid }) => {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand>
        Pathfinding visualizer
      </Navbar.Brand>

      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link className='text-info' onClick={startVisualization}>
              Start visualization 
          </Nav.Link>

          {/* Dropdown */}
          <NavDropdown title="Algorithms">
            <NavDropdown.Item active={selectedAlgorithm === Algorithms.Astar} onClick={() => setSelectedAlgorithm(Algorithms.Astar)}>
              A Start
            </NavDropdown.Item>
            <NavDropdown.Item active={selectedAlgorithm === Algorithms.Dijkstra} onClick={() => setSelectedAlgorithm(Algorithms.Dijkstra)}>
              Dijkstra
            </NavDropdown.Item>
          </NavDropdown>

          <Nav.Link className='text-info' onClick={() => document.location.reload()}> 
            Reset
          </Nav.Link>
          <Nav.Link>
            <Link to='/sorting'> 
              Sorting Visualizer
            </Link>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

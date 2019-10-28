import React from 'react';
import PathfindingVisualizer from './Pathfinding-Visualizer'
import Navbar from './components/Navbar'
import 'antd/dist/antd.css'
import { Route, BrowserRouter } from 'react-router-dom';

export default function App(params) {
  return (
    <BrowserRouter>
      <React.Fragment>
        <Navbar/>
        <Route to='/pathfinding-visualizer' component={PathfindingVisualizer} />
      </React.Fragment>
    </BrowserRouter>
  )
}

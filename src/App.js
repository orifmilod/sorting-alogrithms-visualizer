import React, { useState, useEffect } from 'react';
import PathfindingVisualizer from './Pages/Pathfinding-Visualizer';
import NotFound from './Pages/NotFound';

import Navbar from './components/Navbar'
import 'antd/dist/antd.css'
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom';

export default function App() {
  const [algorithm, updateAlgorithm] = useState(undefined);

  return (
    <BrowserRouter>
      <Navbar/>
        <Switch>
        <Route exact to='/asd' component={PathfindingVisualizer} />
        <Route component={NotFound}/>
      </Switch>
    </BrowserRouter>
  )
}

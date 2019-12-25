import React from 'react';
import { toast } from 'react-toastify';
import PathfindingVisualizer from './Pages/Pathfinding-Visualizer';
import SortingVisualizer from './Pages/Sorting-Visualizer';

import { Route, Switch, Redirect, BrowserRouter } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
  toast.configure();

  return (
    <BrowserRouter>
      <Switch>
        <Route path='/sorting' component={SortingVisualizer} />
        <Route path='/path-finding' component={PathfindingVisualizer} />

        <Redirect to='path-finding' />
      </Switch>
    </BrowserRouter>
  )
}


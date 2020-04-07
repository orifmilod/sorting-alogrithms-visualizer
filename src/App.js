import React from 'react';
import { toast } from 'react-toastify';

import Home from './Pages/Home';
import SortingVisualizer from './Pages/Sorting-Visualizer';
import PathfindingVisualizer from './Pages/Pathfinding-Visualizer';


import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom'

export default function App() {
  toast.configure();
  return (
    <BrowserRouter>
      <Switch>

        <Route exact path='/' component={Home} />
        <Route exact path='/sorting' component={SortingVisualizer} />
        <Route exact path='/path-finding' component={PathfindingVisualizer} />

        <Redirect to='/' />
      </Switch>
    </BrowserRouter>
  )
}


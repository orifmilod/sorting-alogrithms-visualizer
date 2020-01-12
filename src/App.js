import React, { useState } from 'react';
import { toast } from 'react-toastify';

import SortingVisualizer from './Pages/Sorting-Visualizer';
import PathfindingVisualizer from './Pages/Pathfinding-Visualizer';

import * as Pages from './constants/pages';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  const [activePage, setActivePage] = useState(Pages.PathFinding);

  toast.configure();
  function loadPage() {
    const options = {
      [Pages.PathFinding]:
        <PathfindingVisualizer onChangePage={() => setActivePage(Pages.Sorting)} />,
      [Pages.Sorting]:
        <SortingVisualizer onChangePage={() => setActivePage(Pages.PathFinding)} />,
    }
    return options[activePage];
  }
  return (loadPage())
}


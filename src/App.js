import React from 'react';
import PathfindingVisualizer from './Pages/Pathfinding-Visualizer';
import { toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
export default function App() {
  toast.configure();

  return (
    <div>
      <PathfindingVisualizer />
    </div>
  )
}


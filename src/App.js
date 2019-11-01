import React from 'react';
import PathfindingVisualizer from './Pages/Pathfinding-Visualizer';
import Navbar from './components/Navbar';
import 'antd/dist/antd.css';
import { Provider } from 'react-redux';
import store from './Store';

export default function App() {
  return (
    <Provider store={store}>
      <Navbar/>
      <PathfindingVisualizer/>
    </Provider>
  )
}


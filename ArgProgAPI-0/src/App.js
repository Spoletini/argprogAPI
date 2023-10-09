import React from 'react';
import './App.css';
import ClimaDashboard from './Modulos/modulosClima/climaDashboard';

import Dia from './Modulos/dia'
import './Assets/App.css'

function App() {
  return (
    <>
      <h1>Dashboard Clima</h1>
      <div className="dia">
        <Dia />
      </div>
      <div className="clima">
        <ClimaDashboard />
      </div>
      
    </>
  );
}

export default App;


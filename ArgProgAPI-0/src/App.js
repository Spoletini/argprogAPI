import React from 'react';
import './App.css';
import ClimaDashboard from './Modulos/modulosClima/climaDashboard';
import Colectivo from './Modulos/Colectivo';
import Dia from './Modulos/dia';
import './Assets/App.css';

const containerStyle = {
  display: 'flex',
  height: '100vh',
};

const halfScreenStyle = {
  flex: '0 0 50%',
  overflow: 'auto',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
};

function App() {
  return (
    <div style={containerStyle}>
      <div style={halfScreenStyle}>
        <h1>Dashboard con API</h1>
        <div className="clima">
          <Dia />
          <ClimaDashboard />
        </div>
      </div>
      <div style={halfScreenStyle}>
        <Colectivo />
      </div>
    </div>
  );
}

export default App;

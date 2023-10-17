import React from 'react';
import styled from 'styled-components';

import TarjetaEstatica from './TarjetaEstatica'
import ClimaAPI from './modulosClima/climaAPI.json'


const DiaContainer = styled.div`
display: grid;
grid-template-columns: repeat(2, 1fr); /* Divide en 3 columnas */
grid-template-rows: repeat(1, 1fr); /* Divide en 2 filas */
gap: 10px; /* Espacio entre las tarjetas */
`;

const Fecha = String(ClimaAPI.current_weather.time).slice(0, 10)
const Hora = String(ClimaAPI.current_weather.time).slice(-5)

function Dia() {
  return (

    <DiaContainer>
      <TarjetaEstatica
        titulo={"Fecha: " + Fecha}
        contenido={"Hora: " + Hora}
      />

      <TarjetaEstatica
        titulo={"Provincia: Santa Fe"}
        contenido={"Ciudad: Rosario"}
      />
    </DiaContainer>
  );
}


export default Dia;

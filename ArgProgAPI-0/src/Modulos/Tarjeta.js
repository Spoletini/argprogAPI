import React from 'react';
import styled from 'styled-components';

const TarjetaContainer = styled.div`
  width: 70%;
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.3s ease;
  position: relative;
  perspective: 1000px;
  transform: rotateX(2deg);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  background-color: #cce3de; /* Fondo principal de la tarjeta */
`;

const Frente = styled.div`
  color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  
  

  background-color: #f6fff8; /* Fondo del lado frontal */

  & img {
    height: 55%;
    width: 55%;
  }

 


`;

const Dorso = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  background-color: #eaf4f4; /* Fondo del lado trasero */

  & img {
    height: 55%;
    width: 55%;
  }



  .contenido {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const Tarjeta = ({
  tituloFrente,
  contenidoFrente,
  imagenFrente,
  tituloDorso,
  contenidoDorso,
  imagenDorso,
  colorFondoContenido,
}) => {
  return (
    <TarjetaContainer>
      <Frente>
        
        <p>{tituloFrente}</p>
        <p>{contenidoFrente}</p>
       
        <p>{tituloDorso}</p>
        <div className="contenido">
          <p>{contenidoDorso}</p>
        </div>
      </Frente>
     
    </TarjetaContainer>
  );
};

export default Tarjeta;

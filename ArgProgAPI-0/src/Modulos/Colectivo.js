import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useEffect, useState } from "react";
import L from "leaflet";


// json con la informacion de los colores de las lineas



// este es el componente principal de Las lineas de colectivos

export function Colectivo() {
  const [Lista, setLista] = useState(null);
  const [Linea, setLinea] = useState(null);
  const [Carga, setCarga] = useState(false);

  const [Posicion, setPosicion] = useState([-34.6, -58.46667]);

  // url para llamar a la api con props para que cambie el route_id dependiendo de cada linea
  const UrlApi = `https://datosabiertos-transporte-apis.buenosaires.gob.ar:443/colectivos/vehiclePositionsSimple?route_id=${Linea}&client_id=cb6b18c84b3b484d98018a791577af52&client_secret=3e3DB105Fbf642Bf88d5eeB8783EE1E6`;

  // funcion para hacer la llamada a la api anterior
  const LlamadaApi = () => { 
    fetch(UrlApi)
      .then((response) => {
        while (!response.ok) {
          // Error
        }
        return response.json();
      })
      .then((data) => {
        // se cambia el estado de carga para cambiar de pantalla
        setCarga(true);
        // se llama a la funcion para que renderize los componentes de los colectivos
        asignar(data);
      })
      .catch((ex) => {
        console.error(ex);
      });
  };

  // primer useEffect que ante cambio de linea hace una nueva llamada

  useEffect(() => {
    LlamadaApi();
  }, [Linea]);

  // segundo useEffect que hace la llamada cada 31 segundos para actualizar la posicion de los colectivos
  useEffect(
    () => {
      const interval = setInterval(() => {
        LlamadaApi();
      }, 31000);
      return () => clearInterval(interval);
    },
    // esta parte no entendi porque le tengo que poner dependecias con algo interno
    // si la dejo sin dependencia se renderiza muchas veces seguidas
    // si dejo la dependencia vacia me renderiza solo una vez
    [Linea]
  );

  // funcion para crear el icono personalizado para cada bondi con su color de linea,  posicion e informacion mostrada en PopUp
  const IconoPersonalizado = ({ linea, color, position, bondi }) => {
    const iconoPersonalizado = L.divIcon({
      className: "iconoPersonalizado",
      html: `<div className = "iconoDiv" style= "border-radius: 40% ; border: solid ${color[1]} 0.5vh ; width: 2vh; height: 2vh;  background-color: ${color[0]} ; font-size: 1.5vh ; display: flex;
      justify-content: center;
      align-items: center;"></div>`,
      iconSize: [20, 20],
    });

    return (
      <Marker position={Posicion} icon={iconoPersonalizado}>
        <Popup>
          <ul>
            <li>Linea : {linea} </li>
            <li>Velocidad : {Math.round(bondi.speed)} km/h</li>
            <li>Nombre Agencia : {bondi.agency_name}</li>
            <li>Recorrido : {bondi.trip_headsign} </li>
          </ul>
        </Popup>
      </Marker>
    );
  };

  // funcion que recibe los datos, los mapea y setea una lista con tantos iconos como colectivos reciba de la api

  const asignar = (Datos) => {
    // es esta seccion trate de tomar el la posicion del primer colectivo de la lista para poder centrar el mapa en esa misma, pero no funciono
    setPosicion([Datos[0].latitude, Datos[0].longitude]);
    const nuevalista = Datos.map((bondi) => (
      <IconoPersonalizado
        key={bondi.id}
        linea={bondi.route_short_name}
        bondi={bondi}
        numero={bondi.route_short_name}
        
        position={[bondi.latitude, bondi.longitude]}
      />
    ));
    setLista(nuevalista);
  };

  return (
    // se crea el select con cada linea y su route_id por valor corresponda
    <div className="DatosSol">
      <div className="TituloLinea">
        <p> Seleccione su Linea :</p>
        {/* se llama a la funcion con el valor de route_id de cada linea */}
        <select name="select" onChange={(e) => setLinea(e.target.value)}>
          <option value="vacio">Linea</option>
          <option value="1468">153A a B° Nuevo</option>
          <option value="1467">321A a Est. CASTELAR</option>
          <option value="1700">159J a Correo Central</option>
          <option value="982">219R3R</option>
          <option value="1">7A</option>
          <option value="556">158A</option>
          <option value="1632">148A C - Cementerio</option>
          <option value="1696">159E 2 hacia C Central</option>
          <option value="995">372 a Don Bosco - Achaga - B° San Juan</option>
        </select>
      </div>
      <MapContainer center={Posicion} zoom={10} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* se llama a la lista anterior para renderizar los colectivos*/}
        <div>{Lista}</div>
      </MapContainer>
    </div>
  );
}


export default Colectivo;
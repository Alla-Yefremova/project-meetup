import React, { useCallback, useEffect, useState } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
  MarkerClusterer,
} from '@react-google-maps/api'
import { useDispatch, useSelector } from 'react-redux'

const containerStyle = {
  width: '70vw',
  height: '70vh',
  borderRadius: '4px',
}
const options = {
  disableDefaultUI: true,
  zoomControl: true,
  streetViewControl: true,
  navigation: true,
  fullscreenControl: true,
}

function Map() {
  const center = {
    lat: 59.93848,
    lng: 30.312481,
  }

  const [selected, setSelected] = useState(null);
  const dispatch = useDispatch();
  // const store = useSelector((store) => store)

  useEffect(() => {
    dispatch({ type: 'INIT_MAP', payload: { visibility: true } });
    dispatch({
      type: 'INIT_MARKS', payload: [
        { lat: 59.9381841762223, lng: 30.31536517097182, user: 'Ann' },
        { lat: 59.938017673154, lng: 30.312043967568645, user: 'Mike' },
        { lat: 59.938915343840016, lng: 30.30861916384227, user: 'Jeck' },
        { lat: 59.94098222939891, lng: 30.314060360105106, user: 'Monika' },
      ]
    });
  }, [])

  const { coords, visibility, markers } = useSelector((store) => store.map)

  // console.log(coords, 'coords');
  // console.log(visibility, 'visibility');

  // const [markers, setMarkers] = useState([]);

  const createMarkers =
    useCallback(
      (event) => {
        dispatch({
          type: 'MY_COORDS', payload: {
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
            time: new Date(),
          }
        }
          , []);
        // setMarkers((current) => [...current,
        // {
        //   lat: event.latLng.lat(),
        //   lng: event.latLng.lng(),
        //   time: new Date(),
        // }]
        // )
      })

  // установка ключа google
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_KEY,
  })

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading maps";

  return isLoaded ? (
    <>
      {/* <h1>
        <span role="img" aria-label="tent">Our logo</span>
      </h1> */}
      <GoogleMap
        zoom={17}
        mapContainerStyle={containerStyle}
        center={center}
        options={options}
        onClick={createMarkers}
      // onLoad={} //возможно здесь будет логика при загрузке карты
      >
        {/* {markers.map((marker) => ( */}
        {visibility && <Marker
          // key={coords.time.toISOString()}
          position={coords}
          icon={{
            url: '/me.png',
            scaledSize: new window.google.maps.Size(30, 30), // масштабировать иконку
            anchor: new window.google.maps.Point(15, 15) // поставить в центр иконки
          }}
        // onClick={(event) => {
        //   console.log(coords);
        //   setSelected('coords');
        // }}
        />}
        {visibility && markers.length != 0 ? markers.map((marker) =>
          <Marker
            key={performance.now()}
            position={
              // coords
              { lat: marker.lat, lng: marker.lng }
            }
            onClick={(event) => {
              console.log(coords);
              setSelected(marker);
            }}
          />) : null}

        {selected ? (
          <InfoWindow
            position={{ lat: selected.lat, lng: selected.lng }}
            onCloseClick={() => {
              setSelected(null);
            }}
          >
            <div>
              <h2>
                {selected.user}
              </h2>
            </div>
          </InfoWindow>
        ) : null}

        {/* <Marker
          position={center}
          onClick={() => {
            setSelected(!selected);
          }}
        /> */}
        {/* {selected && defaultCity.name ? (
          <InfoWindow position={center}>
            <div style={{ color: "black" }}>
              <p>{!defaultCity.address && "Концертный зал:"}</p>
              <p>{defaultCity.name && defaultCity.name}</p>
              <p>{defaultCity.address && defaultCity.address}</p>
            </div>
          </InfoWindow>
        ) : null} */}
      </GoogleMap>

      {/* определение авто-координат. Пока в разработке */}
      {/* <span className={styles.mapstyle} onClick={() => {
        navigator.geolocation.getCurrentPosition((position) => {
          dispatch({ type: 'MY_COORDS', payload: { lat: position.coords.latitude, lng: position.coords.longitude } })
        }, () => null)
      }}>
        <img src="" alt="locate me" style={{ width: "48px", height: '48px' }}></img>
      </span> */}
    </>
  ) : (
      <div></div>
    )
}

export default React.memo(Map)

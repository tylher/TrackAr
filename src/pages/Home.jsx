import {
  AdvancedMarker,
  InfoWindow,
  Map,
  Marker,
} from "@vis.gl/react-google-maps";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { mapApiKey } from "../main";

const Home = () => {
  const position = { lat: 61.2176, lng: -149.8997 };
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [locationAddress, setLocationAddress] = useState(null);

  const onClickMap = () => {
    if (selectedMarker) {
      setSelectedMarker(null);
    }
  };

  useEffect(() => {
    axios
      .get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.lat},${position.lng}&key=${mapApiKey}`
      )
      .then((res) => {
        const location = res.data.results[0].formatted_address;
        setLocationAddress(location);
      });
  }, [position]);
  return (
    <div className="h-full overflow-auto pb-20 ">
      <section className="min-h-screen w-full p-10 flex flex-col gap-5">
        <h2 className="text-2xl font-semibold">Current Location</h2>
        <div className="rounded-xl shadow-xl w-full h-[100vh] overflow-hidden">
          <Map
            center={position}
            defaultZoom={12}
            gestureHandling={"greedy"}
            disableDefaultUI={true}
            mapId={"gateundlf"}
            onClick={onClickMap}
          >
            <Marker
              position={position}
              onMouseOver={() => {
                setSelectedMarker(position);
                console.log(position);
              }}
            />
            {selectedMarker && (
              <InfoWindow
                position={position}
                onCloseClick={() => setSelectedMarker(null)}
              >
                <div className="w-2/3 text-wrap flex gap-3 flex-col">
                  <h2 className="text-lg font-semibold">Current Location</h2>
                  <span>{locationAddress}</span>
                </div>
              </InfoWindow>
            )}

            {/* <AdvancedMarker
              position={position}
              className="w-[250px] bg-white hover:hidden flex-col items-center gap-1 py-3 px-3 rounded-xl shadow-xl hidden "
            >
              <h2 className="text-[20px] font-medium">I am so customized</h2>
              <p>That is pretty awesome!</p>

              <svg
                className="absolute text-white h-10 w-full left-0 top-full"
                x="0px"
                y="0px"
                viewBox="0 0 255 255"
                xmlSpace="preserve"
              >
                <polygon
                  className="fill-current shadow-lg"
                  points="0,0 127.5,127.5 255,0"
                />
              </svg>
            </AdvancedMarker> */}
          </Map>
        </div>
      </section>
      <section>
        <table className="w-full table table-auto">
          <tr>
            <th>Time</th>
            <th>Longitude</th>
            <th>Latitude</th>
            <th>Address</th>
          </tr>
        </table>
      </section>
    </div>
  );
};

export default Home;

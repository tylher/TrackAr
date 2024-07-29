import {
  AdvancedMarker,
  InfoWindow,
  Map,
  Marker,
} from "@vis.gl/react-google-maps";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { mapApiKey } from "../main";
import { sendGetRequest } from "../services/api/axios-util";
import { useWebSocket } from "../context/websocket-context";
import { ENDPOINTS } from "../services/api/endpoints";
import { convertTimeStampToLocalDate } from "../utils/timeUtils";

const Home = () => {
  const [locations, setLocations] = useState([]);
  const [currentPosition, setCurrentPosition] = useState({
    time: "",
    latitude: "1.2344",
    longitude: "20.1930",
    address: "",
  });

  const { stompClient, isConnected } = useWebSocket();

  const [selectedMarker, setSelectedMarker] = useState(null);
  const [locationAddress, setLocationAddress] = useState(null);
  const [isMobileView, setIsMobileView] = useState(
    () => window.innerWidth <= 768
  );

  const onClickMap = () => {
    if (selectedMarker) {
      setSelectedMarker(null);
    }
  };

  const locationsData = async () => {
    const { data } = await sendGetRequest(ENDPOINTS.ALL_LOCATIONS);

    setLocations(data);
    if (data && data.length > 0) {
      const initialPosition = data[0];
      setCurrentPosition({
        time: initialPosition.time,
        latitude: initialPosition.latitude,
        longitude: initialPosition.longitude,
        address: initialPosition.address,
      });
    }
  };
  const fetchData = async () => {
    const { data } = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${currentPosition.latitude},${currentPosition.longitude}&key=${mapApiKey}`
    );
    if (data.results && data.results[0]) {
      const location = data.results[0].formatted_address;
      setLocationAddress(location);
      console.log(location);
    }
  };

  useEffect(() => {
    if (!stompClient) return;

    const subscription = stompClient.subscribe("/topic/locations", (loc) => {
      console.log(JSON.parse(loc.body));
      if (loc) {
        setCurrentPosition(JSON.parse(loc.body));
      }
    });

    return () => {
      if (isConnected) {
        subscription.unsubscribe();
      }
    };
  }, [stompClient, isConnected]);

  useEffect(() => {
    locationsData();
  }, []);

  useEffect(() => {
    fetchData();
  }, [currentPosition]);

  const center = {
    lat: parseFloat(currentPosition.latitude),
    lng: parseFloat(currentPosition.longitude),
  };
  return (
    <div className="h-full  pb-20 font-raleway text-[#181616]">
      <section className="lg:min-h-screen w-full md:px-10 px-5 py-10 flex flex-col gap-5">
        <h2 className="text-2xl font-semibold">Current Location</h2>
        <div className="rounded-xl shadow-xl w-full lg:h-[100vh] md:h-[70vh] h-[58vh] overflow-hidden">
          <Map
            center={center}
            defaultZoom={10}
            gestureHandling={"cooperative"}
            disableDefaultUI={true}
            mapId={"gateundlf"}
            onClick={onClickMap}
            zoomControl={true}
          >
            <Marker
              position={center}
              onMouseOver={() => {
                setSelectedMarker(currentPosition);
              }}
              onClick={
                isMobileView && !selectedMarker
                  ? () => {
                      setSelectedMarker(currentPosition);
                    }
                  : () => {
                      setSelectedMarker(null);
                    }
              }
            />
            {selectedMarker && (
              <InfoWindow
                position={center}
                onCloseClick={() => setSelectedMarker(null)}
              >
                <div className="md:w-4/5 text-wrap flex gap-3 flex-col">
                  <h2 className="text-lg font-semibold">Current Location</h2>
                  <span>{locationAddress}</span>
                </div>
              </InfoWindow>
            )}
          </Map>
        </div>
      </section>
      <section className="px-5 md:px-10 overflow-x-auto">
        <table className="w-full table table-auto border-collapse text-nowrap">
          <thead className="text-left ">
            <tr className="border-0 border-b-[2px] border-gray-400 text-nowrap">
              <th className="p-2">Time</th>
              <th className="p-2">Longitude</th>
              <th className="p-2">Latitude</th>
              <th className="p-2">Address</th>
            </tr>
          </thead>
          <tbody>
            {locations.map((loc, index) => {
              return (
                <tr
                  key={index}
                  className={
                    `${
                      index != locations.length - 1
                        ? "border-b-[2px] text-nowrap"
                        : ""
                    }` + "border-0 border-gray-400"
                  }
                >
                  <td className="p-2 text-nowrap">
                    {convertTimeStampToLocalDate(loc.timeStamp)}
                  </td>
                  <td className="p-2 text-nowrap">{loc.longitude}</td>
                  <td className="p-2 text-nowrap">{loc.latitude}</td>
                  <td className="p-2 text-nowrap">{loc.address}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default Home;

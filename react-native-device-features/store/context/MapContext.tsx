import React, { createContext, useMemo, useContext, useState } from "react";

import { IMapState } from "../../types/types";

interface IMapProviderProps {
  children: React.ReactNode;
}

interface IMapContext extends IMapState {
  addLocation: (location: IMapState) => void;
}

const MapContext = createContext<IMapContext>({} as IMapContext);

export default function MapProvider({ children }: IMapProviderProps) {
  const [location, setLocation] = useState<IMapState>({
    lat: -6.21462,
    lng: 106.84513,
  });

  function addLocationHandler(location: IMapState) {
    setLocation({ lat: location.lat, lng: location.lng });
  }

  const value = useMemo(() => {
    return {
      lat: location.lat,
      lng: location.lng,
      addLocation: addLocationHandler,
    };
  }, [location.lat, location.lng, addLocationHandler]);

  return <MapContext.Provider value={value}>{children}</MapContext.Provider>;
}

export function useMaps() {
  return useContext(MapContext);
}

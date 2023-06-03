import { createContext, useMemo, useContext, useReducer } from "react";

import { IMapState, IPlace } from "../../types/types";

interface IMapProviderProps {
  children: React.ReactNode;
}

type LocationAction =
  | { type: "ADD_COORDINATES"; payload: IMapState }
  | { type: "ADD_PLACE"; payload: IPlace };

interface IMapContext extends IMapState {
  places: IPlace[];
  addLocation: (location: IMapState) => void;
  addPlace: (place: IPlace) => void;
}

const MapContext = createContext<IMapContext>({} as IMapContext);

const initialState: {
  placeList: IPlace[];
  coords: IMapState;
} = {
  placeList: [],
  coords: {
    latitude: -6.21462,
    longitude: 106.84513,
  },
};

function reducer(state: typeof initialState, action: LocationAction) {
  switch (action.type) {
    case "ADD_COORDINATES": {
      const newLocation = action.payload;
      return { ...state, coords: { ...newLocation } };
    }
    case "ADD_PLACE": {
      const id = new Date().toISOString() + Math.random().toString();
      const newPlace = { ...action.payload, id };
      return {
        ...state,
        placeList: [newPlace, ...state.placeList],
      };
    }
    default:
      return initialState;
  }
}

export default function MapProvider({ children }: IMapProviderProps) {
  const [locationState, dispatch] = useReducer(reducer, initialState);

  function addLocationHandler(location: IMapState) {
    dispatch({ type: "ADD_COORDINATES", payload: location });
  }

  function addPlaceHandler(place: IPlace) {
    dispatch({ type: "ADD_PLACE", payload: place });
  }

  const value = useMemo(() => {
    return {
      latitude: locationState.coords.latitude,
      longitude: locationState.coords.longitude,
      places: locationState.placeList,
      addLocation: addLocationHandler,
      addPlace: addPlaceHandler,
    };
  }, [locationState, addLocationHandler, addPlaceHandler]);

  return <MapContext.Provider value={value}>{children}</MapContext.Provider>;
}

export function useMaps() {
  return useContext(MapContext);
}

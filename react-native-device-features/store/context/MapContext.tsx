import { createContext, useMemo, useContext, useReducer } from "react";

import { IMapState } from "../../types/types";
import { Place } from "../../models/Place";

interface IMapProviderProps {
  children: React.ReactNode;
}

type LocationAction =
  | { type: "ADD_COORDINATES"; payload: IMapState }
  | { type: "ADD_PLACE"; payload: Place };

interface IMapContext extends IMapState {
  places: Place[];
  addLocation: (location: IMapState) => void;
  addPlace: (place: Place) => void;
}

interface IInitialState {
  placeList: Place[];
  coords: IMapState;
}

const MapContext = createContext<IMapContext>({} as IMapContext);

const initialState: IInitialState = {
  placeList: [],
  coords: {
    latitude: -6.21462,
    longitude: 106.84513,
  },
};

function reducer(state: IInitialState, action: LocationAction) {
  switch (action.type) {
    case "ADD_COORDINATES": {
      const newLocation = action.payload;
      return { ...state, coords: { ...newLocation } };
    }
    case "ADD_PLACE": {
      const newPlace = action.payload;
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

  function addPlaceHandler(place: Place) {
    dispatch({
      type: "ADD_PLACE",
      payload: new Place(
        place.title,
        place.address,
        place.image,
        place.location
      ),
    });
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

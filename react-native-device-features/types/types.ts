import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

export interface IMapState {
  latitude: number;
  longitude: number;
}

export interface IPlace {
  id?: string;
  title: string;
  address: string;
  image: string;
  location: IMapState;
}

export type RootStackParamList = {
  AllPlaces: undefined;
  AddPlace: undefined;
  PlaceDetail: undefined;
  Maps: undefined;
};

export type AllPlacesScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "AllPlaces"
>;

export type AddPlaceScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "AddPlace"
>;

export type MapsScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Maps"
>;

import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RouteProp } from "@react-navigation/native";

export interface IMapState {
  lat: number;
  lng: number;
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
  PlaceDetail: { placeId: string };
  Maps: { lat: number; lng: number };
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

export type PlaceDetailScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "PlaceDetail"
>;

export type PlaceDetailScreenRouteProp = RouteProp<
  RootStackParamList,
  "PlaceDetail"
>;

export type MapsScreenRouteProp = RouteProp<RootStackParamList, "Maps">;

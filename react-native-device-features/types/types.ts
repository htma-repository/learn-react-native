import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RootStackParamList = {
  AllPlaces: undefined;
  AddPlace: undefined;
  PlaceDetail: undefined;
};

export type AllPlacesScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "AllPlaces"
>;

export type AddPlaceScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "AddPlace"
>;

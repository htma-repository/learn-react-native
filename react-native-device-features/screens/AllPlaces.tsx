import { useState, useEffect } from "react";
import { useNavigation, useIsFocused } from "@react-navigation/native";

import IconButton from "../components/ui/IconButton";
import PlacesList from "../components/Places/PlacesList";

import { fetchPlace } from "../services/database";

import { AllPlacesScreenNavigationProp } from "../types/types";
import { Place } from "../models/Place";

export default function AllPlaces() {
  const [places, setPlaces] = useState<Place[]>([]);

  const navigation = useNavigation<AllPlacesScreenNavigationProp>();
  const isFocused = useIsFocused();

  function addPlaceHandler() {
    navigation.navigate("AddPlace");
  }

  useEffect(() => {
    async function fetcherPlaces() {
      try {
        if (isFocused) {
          const places = await fetchPlace();
          setPlaces(places);
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetcherPlaces();
  }, [isFocused]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <IconButton
          iconName="add"
          size={24}
          color={tintColor as string}
          onPress={addPlaceHandler}
        />
      ),
    });
  }, []);

  return <PlacesList PlacesData={places} />;
}

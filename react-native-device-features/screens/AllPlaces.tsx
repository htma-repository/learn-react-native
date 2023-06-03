import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

import IconButton from "../components/ui/IconButton";
import PlacesList from "../components/Places/PlacesList";

import { AllPlacesScreenNavigationProp } from "../types/types";

export default function AllPlaces() {
  const navigation = useNavigation<AllPlacesScreenNavigationProp>();

  function addPlaceHandler() {
    navigation.navigate("AddPlace");
  }

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

  return <PlacesList PlacesData={[]} />;
}

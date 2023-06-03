import { useLayoutEffect } from "react";
import { View, StyleSheet } from "react-native";
import MapView, { Marker, MapPressEvent } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";

import IconButton from "../components/ui/IconButton";
import { useMaps } from "../store/context/MapContext";
import { MapsScreenNavigationProp } from "../types/types";

export default function Maps() {
  const { latitude, longitude, addLocation } = useMaps();
  const navigation = useNavigation<MapsScreenNavigationProp>();

  console.log("coordinate", { latitude, longitude });

  const initialRegion = {
    latitude: latitude as number,
    longitude: longitude as number,
    latitudeDelta: 1,
    longitudeDelta: 1,
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <IconButton
          iconName="save"
          color={tintColor as string}
          size={24}
          onPress={saveLocationMapHandler}
        />
      ),
    });
  }, [navigation]);

  function saveLocationMapHandler() {
    navigation.navigate("AddPlace");
  }

  function getMapLocationHandler(event: MapPressEvent) {
    const { latitude, longitude } = event.nativeEvent.coordinate;

    console.log("running");

    addLocation({ latitude, longitude });
  }

  return (
    <View style={styles.mapContainer}>
      <MapView
        style={styles.mapView}
        initialRegion={initialRegion}
        onPress={getMapLocationHandler}
      >
        <Marker
          coordinate={{
            latitude: latitude as number,
            longitude: longitude as number,
          }}
          draggable
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  mapContainer: {
    flex: 1,
  },
  mapView: {
    width: "100%",
    height: "100%",
  },
});

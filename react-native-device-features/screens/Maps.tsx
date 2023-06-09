import { useLayoutEffect } from "react";
import { View, StyleSheet } from "react-native";
import MapView, { Marker, MapPressEvent } from "react-native-maps";
import { useNavigation, useRoute } from "@react-navigation/native";

import IconButton from "../components/ui/IconButton";
import { useMaps } from "../store/context/MapContext";
import { MapsScreenNavigationProp, MapsScreenRouteProp } from "../types/types";

export default function Maps() {
  const { lat, lng, addLocation } = useMaps();
  const navigation = useNavigation<MapsScreenNavigationProp>();
  const route = useRoute<MapsScreenRouteProp>();

  const initialLocationDetail = route.params && {
    lat: route.params.lat,
    lng: route.params.lng,
  };

  const initialRegion = {
    latitude: initialLocationDetail ? initialLocationDetail.lat : lat,
    longitude: initialLocationDetail ? initialLocationDetail.lng : lng,
    latitudeDelta: 0.5,
    longitudeDelta: 0.5,
  };

  useLayoutEffect(() => {
    if (initialLocationDetail) {
      return;
    }
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
  }, [navigation, initialLocationDetail, saveLocationMapHandler]);

  function saveLocationMapHandler() {
    navigation.navigate("AddPlace");
  }

  function getMapLocationHandler(event: MapPressEvent) {
    if (initialLocationDetail) {
      return;
    }
    const { latitude, longitude } = event.nativeEvent.coordinate;
    addLocation({ lat: latitude, lng: longitude });
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
            latitude: lat,
            longitude: lng,
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

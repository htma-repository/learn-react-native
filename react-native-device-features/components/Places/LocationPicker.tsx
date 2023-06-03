import { View, StyleSheet, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  PermissionStatus,
  getCurrentPositionAsync,
  LocationAccuracy,
  useForegroundPermissions,
} from "expo-location";
import {
  AnimationType,
  INFINITE_ANIMATION_ITERATIONS,
  LeafletView,
} from "react-native-leaflet-view";

import OutlineButton from "../ui/OutlineButton";
import { useMaps } from "../../store/context/MapContext";

import type { AddPlaceScreenNavigationProp } from "../../types/types";

export default function LocationPicker() {
  const navigation = useNavigation<AddPlaceScreenNavigationProp>();
  const { addLocation, latitude, longitude } = useMaps();

  console.log("new coordinate", { latitude, longitude });

  const [locationPermissionInformation, requestLocationPermission] =
    useForegroundPermissions();

  async function verifyPermission() {
    if (
      locationPermissionInformation?.status === PermissionStatus.UNDETERMINED
    ) {
      const result = await requestLocationPermission();
      return result.granted;
    }

    if (locationPermissionInformation?.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Sufficient Permission",
        "You need grant location permission to use this app"
      );

      return false;
    }

    return true;
  }

  async function getLocationHandler() {
    const permission = await verifyPermission();

    if (!permission) {
      return;
    }

    const location = await getCurrentPositionAsync({
      accuracy: LocationAccuracy.BestForNavigation,
    });

    addLocation({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
  }

  function pickOnMapHandler() {
    navigation.navigate("Maps");
  }

  return (
    <View style={styles.locationContainer}>
      <View style={styles.locationView}>
        <LeafletView
          mapCenterPosition={{ lat: latitude, lng: longitude }}
          mapMarkers={[
            {
              id: "1",
              position: { lat: latitude, lng: longitude },
              icon: "📍",
              size: [24, 24],
              animation: {
                type: AnimationType.PULSE,
                duration: 3,
                delay: 1,
                iterationCount: INFINITE_ANIMATION_ITERATIONS,
              },
            },
          ]}
        />
      </View>
      <View style={styles.buttonContainer}>
        <OutlineButton iconName="map" onPress={getLocationHandler}>
          get Location
        </OutlineButton>
        <OutlineButton iconName="add-location" onPress={pickOnMapHandler}>
          Pick Location
        </OutlineButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  locationContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 16,
    rowGap: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    flex: 1,
    width: "100%",
  },
  locationView: {
    width: "100%",
    height: 300,
    borderRadius: 4,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

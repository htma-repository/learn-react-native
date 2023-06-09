import { useState, useEffect, useLayoutEffect } from "react";
import { View, ScrollView, Text, Image, StyleSheet } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";

import { fetchPlace, fetchPlaceDetail } from "../services/database";
import OutlineButton from "../components/ui/OutlineButton";
import { useMaps } from "../store/context/MapContext";

import { Place } from "../models/Place";
import {
  PlaceDetailScreenNavigationProp,
  PlaceDetailScreenRouteProp,
} from "../types/types";
import { Colors } from "../constants/colors";

export default function PlaceDetail() {
  const [placeDetail, setPlaceDetail] = useState<Place>({} as Place);

  const { addLocation } = useMaps();

  const route = useRoute<PlaceDetailScreenRouteProp>();
  const navigation = useNavigation<PlaceDetailScreenNavigationProp>();

  const placeId = route.params?.placeId;

  useLayoutEffect(() => {
    navigation.setOptions({ title: placeDetail.title });
  }, [placeDetail]);

  useEffect(() => {
    async function fetcherDetail() {
      try {
        const place = await fetchPlaceDetail(placeId);
        if (place) {
          setPlaceDetail(place);
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetcherDetail();
  }, [placeId]);

  function openMapsHandler() {
    navigation.navigate("Maps", {
      lat: placeDetail.location.lat,
      lng: placeDetail.location.lng,
    });
    addLocation({
      lat: placeDetail.location.lat,
      lng: placeDetail.location.lng,
    });
  }

  return (
    <ScrollView>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: placeDetail?.imageUri }} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.textTitle}>{placeDetail?.title}</Text>
        <Text style={styles.textAddress}>{placeDetail?.address}</Text>
        <OutlineButton iconName={"add-location"} onPress={openMapsHandler}>
          Open Maps
        </OutlineButton>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 300,
  },
  textContainer: {
    alignItems: "flex-start",
    rowGap: 16,
    padding: 16,
  },
  textTitle: {
    fontSize: 24,
    fontWeight: "500",
    color: Colors.accent500,
  },
  textAddress: {
    fontSize: 16,
    fontWeight: "400",
    color: Colors.primary700,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

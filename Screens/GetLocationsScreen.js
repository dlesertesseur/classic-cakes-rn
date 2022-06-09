import Screen from "./Screen";
import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import { StyleSheet, View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { useWindowDimensions, Image } from "react-native";
import { stringTable } from "../Styles/StringTable";
import { colors } from "../Styles/Colors";
import { useSelector, useDispatch } from "react-redux";
import { getMap, getReverseGeoCodeUrl } from "../Features/Locations";

const GetLocationsScreen = (props) => {
  const { navigation } = props;
  const { height } = useWindowDimensions();

  const [location, setLocation] = useState(null);

  const dispatch = useDispatch();
  
  const { mapUrl, address, loading } = useSelector((state) => state.locations.value);

  const onConfirmAddress = () => {
    navigation.navigate("NewLocation", {address})
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      let loc = await Location.getCurrentPositionAsync({});

      setLocation({
        lat: loc.coords.latitude,
        lng: loc.coords.longitude,
      });
    })();
  }, []);

  useEffect(() => {
    if (location) {
      dispatch(getMap({ location: location }));
      dispatch(getReverseGeoCodeUrl({ location: location }));
    }
  }, [location]);

  return (
    <Screen>
      {mapUrl ? (
        <View style={styles.container}>
          <Image source={{ uri: mapUrl }} style={styles.image} />

          <View style={styles.streetPanel}>
            <Text style={styles.text}> {address} </Text>
          </View>

          <TouchableOpacity style={styles.btConfirm} onPress={onConfirmAddress}>
            <Text style={styles.btConfirmText}> {stringTable.BT_CONFIRM} </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.panel}>
          <ActivityIndicator
            style={styles.indicator}
            size="small"
            color={colors.textInputBack}
          />
        </View>
      )}
    </Screen>
  );
};

export default GetLocationsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryLighter,
    justifyContent: "flex-start",
    alignItems: "center",
    margin:10,
  },

  panel: {
    flex: 1,
    backgroundColor: colors.primaryLighter,
    justifyContent: "center",
    alignItems: "center",
  },

  image: {
    height: 500,
    width: "100%",
    margin: 5,
    borderRadius: 4,
  },

  btConfirm: {
    flexDirection: "row",
    width: "100%",
    borderRadius: 6,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.confirmButtom,
  },

  btConfirmText: {
    fontSize: 18,
    fontWeight: "bold",
  },

  text: {
    fontSize: 18,
    fontWeight: "bold",
    borderRadius:4,
  },

  streetPanel: {
    flexDirection: "row",
    width: "100%",
    borderRadius: 6,
    height: 40,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: colors.primaryDarker,
    marginBottom: 15,
  },
});

import Screen from "./Screen";
import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { stringTable } from "../Styles/StringTable";
import { colors } from "../Styles/Colors";
import { useSelector, useDispatch } from "react-redux";
import { getMap, getReverseGeoCodeUrl, resetLocationData } from "../Features/Locations";

const GetLocationsScreen = (props) => {
  const { navigation, route } = props;

  const [location, setLocation] = useState(null);

  const dispatch = useDispatch();

  const { mapUrl, address } = useSelector((state) => state.locations.value);

  const onConfirmAddress = () => {
    navigation.navigate("NewLocation", { address });
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
      <View style={styles.container}>
        <View style={styles.panel}>
          {mapUrl ? (
            <Image source={{ uri: mapUrl }} style={styles.image} />
          ) : (
            <View style={styles.indicator}>
              <ActivityIndicator size="large" color={colors.secondary} />
            </View>
          )}
        </View>
        <View style={styles.streetPanel}>
          <Text style={styles.text}> {address} </Text>
        </View>

        <TouchableOpacity
          style={mapUrl ? styles.btConfirm : styles.btDisabledConfirm}
          onPress={onConfirmAddress}
          disabled={mapUrl ? false : true}
        >
          <Text
            style={mapUrl ? styles.btConfirmText : styles.btDisabledConfirmText}
          >
            {" "}
            {stringTable.BT_CONFIRM}{" "}
          </Text>
        </TouchableOpacity>
      </View>
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
    marginHorizontal: 10,
  },

  panel: {
    flex: 3 / 4,
    width: "100%",
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.border,
  },

  image: {
    flex: 1,
    backgroundColor: colors.primaryLighter,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
  },

  btConfirm: {
    flexDirection: "row",
    width: "100%",
    borderRadius: 6,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.confirmButton,
  },

  btDisabledConfirm: {
    flexDirection: "row",
    width: "100%",
    borderRadius: 6,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.disabledButton,
  },

  btConfirmText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },

  btDisabledConfirmText: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.disabledFont,
  },

  text: {
    fontSize: 18,
    borderRadius: 4,
  },

  streetPanel: {
    flexDirection: "row",
    width: "100%",
    borderRadius: 6,
    height: 40,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: colors.primaryDarker,
    marginVertical: 10,
  },

  indicator: {
    flex: 1,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
  },
});

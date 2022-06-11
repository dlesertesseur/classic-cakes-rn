import Screen from "./Screen";
import MapView, { Marker } from "react-native-maps";
import CustomButton from "../Components/CustomButton";
import * as Location from "expo-location";
import {
  StyleSheet,
  ActivityIndicator,
  View,
  Text,
} from "react-native";
import { stringTable } from "../Styles/StringTable";
import { colors } from "../Styles/Colors";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getReverseGeoCodeUrl } from "../Features/Locations";

const SetLocationsScreen = (props) => {
  const { navigation } = props;

  const dispatch = useDispatch();
  const { address } = useSelector((state) => state.locations.value);

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [confirmButtonDisabled, setConfirmButtonDisabled] = useState(true);

  const onConfirmAddress = () => {
    if (location) {
      dispatch(getReverseGeoCodeUrl({ location: location }));

      console.log("onConfirmAddress() -> " + address);
      navigation.navigate("NewLocation", { address });
    }
  };

  const onLocation = (position) => {
    setLocation({
      lat: position.nativeEvent.coordinate.latitude,
      lng: position.nativeEvent.coordinate.longitude,
    });
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
      dispatch(getReverseGeoCodeUrl({ location: location }));
      setConfirmButtonDisabled(false);
    }
  }, [location]);

  return (
    <Screen>
      <>
        {errorMsg ? (
          <Text>{errorMsg}</Text>
        ) : location != null ? (
          <>
            <MapView
              onPress={onLocation}
              initialRegion={{
                latitude: location.lat,
                longitude: location.lng,
                latitudeDelta: 0.09,
                longitudeDelta: 0.04,
              }}
              style={styles.mapViewPanel}
            >
              <Marker
                title="Ubicación seleccionada"
                coordinate={{
                  latitude: location.lat,
                  longitude: location.lng,
                }}
              />
            </MapView>
            <View style={styles.streetPanel}>
              <Text style={styles.text}> {address} </Text>
            </View>
            <View style={styles.buttonPanel}>
              <CustomButton
                onPress={onConfirmAddress}
                disabled={confirmButtonDisabled}
                text={stringTable.BT_CONFIRM}
                color={colors.confirmButtom}
              />
            </View>
          </>
        ) : (
          <View style={styles.panel}>
            <ActivityIndicator
              style={styles.indicator}
              size="large"
              color={colors.secondary}
            />
          </View>
        )}
      </>
    </Screen>
  );
};

export default SetLocationsScreen;

const styles = StyleSheet.create({
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

  mapViewPanel: {
    flex: 4 / 5,
    marginHorizontal: 10,
  },

  panel: {
    flex: 1,
    backgroundColor: colors.primaryLighter,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },

  buttonPanel: {
    height: 40,
    backgroundColor: colors.primaryLighter,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },

  streetPanel: {
    height: 40,
    backgroundColor: colors.primaryDarker,
    justifyContent: "center",
    alignItems: "flex-start",
    borderRadius: 6,
    margin: 10,
    padding: 5
  },
});

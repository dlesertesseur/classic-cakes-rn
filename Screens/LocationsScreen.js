import Screen from "./Screen";
import LocationItem from "../Components/LocationItem";
import AlertDialog from "../Components/AlertDialog";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import { useWindowDimensions, FlatList } from "react-native";
import { stringTable } from "../Styles/StringTable";
import { colors } from "../Styles/Colors";
import { useSelector, useDispatch } from "react-redux";
import { getLocations, removeLocation, removeLocationDb } from "../Features/Locations";
import { useEffect, useState } from "react";

const LocationsScreen = (props) => {
  const { navigation, route } = props;
  const { height } = useWindowDimensions();

  const dispatch = useDispatch();

  const [showAlerDialog, setShowAlerDialog] = useState(false);
  const [locationSelected, setLocationSelected] = useState(null);

  const { locations, loading } = useSelector((state) => state.locations.value);

  useEffect(() => {
    dispatch(getLocations());
  }, []);

  const onRemove = (location) => {
    setLocationSelected(location);
    setShowAlerDialog(true);
  }

  const onConfirmDelete = () => {
    dispatch(removeLocationDb({ id: locationSelected.id }))
    dispatch(removeLocation({ id: locationSelected.id }))
    setShowAlerDialog(false);
  }

  const renderElement = ({ item }) => {
    return <LocationItem location={item} onRemove={onRemove}></LocationItem>;
  };

  return (
    <Screen>
      {loading ? (
        <View style={styles.panel}>
          <ActivityIndicator
            style={styles.indicator}
            size="large"
            color={colors.activityIndicator}
          />
        </View>
      ) : (
        <>
          {locations !== null && locations.length > 0 ? (
            <View style={{ ...styles.container, height: height - 170 }}>
              <View style={styles.topPanel}>
                <FlatList
                  style={styles.list}
                  data={locations}
                  renderItem={renderElement}
                  keyExtractor={(item) => item.id}
                />
              </View>

              <AlertDialog
                visible={showAlerDialog}
                text={stringTable.REMOVE_ADDRESS_TEXT}
                onAction={onConfirmDelete}
                onCancel={() => {
                  setShowAlerDialog(false);
                  setLocationSelected(null);
                }}
              />
            </View>
          ) : (
            <View style={styles.panel}>
              <Text style={styles.textNoData}>{stringTable.NO_DATA}</Text>
            </View>
          )}
        </>
      )}
    </Screen>
  );
};

export default LocationsScreen;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    backgroundColor: colors.primaryLighter,
    alignItems: "center",
    justifyContent: "flex-start",
  },

  list: {
    width: "100%",
    height: "100%",
  },

  topPanel: {
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
  },

  text: {
    fontSize: 22,
    color: "#000000",
  },

  panel: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  textNoData: {
    fontSize: 16,
  },

  indicator: {},
});

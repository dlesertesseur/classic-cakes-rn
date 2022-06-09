import Screen from "./Screen";
import OrderItem from "../Components/OrderItem";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import { useWindowDimensions, FlatList } from "react-native";
import { stringTable } from "../Styles/StringTable";
import { colors } from "../Styles/Colors";
import { useSelector, useDispatch} from "react-redux";
import LocationItem from "../Components/LocationItem";
import { setLocationSelected } from "../Features/Locations";

const LocationsScreen = (props) => {
  const { navigation, route } = props;
  const { height } = useWindowDimensions();

  const dispatch = useDispatch();

  const { locations, loading } = useSelector((state) => state.locations.value);

  const onPress = (location) => {
    dispatch(setLocationSelected(location.id));
    console.log("LocationsScreen::onPress");
  };

  const onDelete = (order) => {
    console.log("LocationsScreen::onDelete");
  };

  const renderElement = ({ item }) => {
    return (
      <LocationItem location={item} onPress={onPress} onDelete={onDelete}></LocationItem>
    );
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

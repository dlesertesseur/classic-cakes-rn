import Screen from "./Screen";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import { useWindowDimensions, FlatList } from "react-native";
import { stringTable } from "../Styles/StringTable";
import { colors } from "../Styles/Colors";
import { useSelector, useDispatch } from "react-redux";

const SetLocationsScreen = (props) => {
  const { navigation, route } = props;
  const { height } = useWindowDimensions();

  const dispatch = useDispatch();
  const { locations, loading } = useSelector((state) => state.locations.value);

  return (
    <Screen>
      <View style={styles.panel}>
      </View>
    </Screen>
  );
};

export default SetLocationsScreen;

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

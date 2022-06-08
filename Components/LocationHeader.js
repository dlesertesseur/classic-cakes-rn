import React from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { colors } from "../Styles/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";

const LocationHeader = ({ title = "< TITLE >", navigation }) => {
  const dispatch = useDispatch();

  const onAdd = () => {
    navigation.navigate("NewLocation");
  }

  return (
    <View style={styles.container}>
      <View style={styles.panel}>
        <View style={styles.button}></View>

        <Text style={styles.title}>{title}</Text>

        <TouchableOpacity style={styles.button} onPress={onAdd}>
          <MaterialIcons name="add-circle" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LocationHeader;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 10,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.primaryLighter,
  },

  panel: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 5,
    margin: 10,
    borderRadius: 8,
    backgroundColor: colors.primaryDarker,
  },

  button: {
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    padding: 5,
  },

  title: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
  },
});

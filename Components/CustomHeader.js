import React from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { colors } from "../Styles/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { resetAuthData } from "../Features/Auth";

const CustomHeader = ({
  title = "< TITLE >",
  navigation = null,
  logoutButton = true,
}) => {
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(resetAuthData());
  };

  const onBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.panel}>
        {navigation != null ? (
          <TouchableOpacity style={styles.button} onPress={onBack}>
            <MaterialIcons name="arrow-back-ios" size={24} color="black" />
          </TouchableOpacity>
        ) : (
          <View style={styles.button}></View>
        )}

        <Text style={styles.title}>{title}</Text>

        {logoutButton ? (
          <TouchableOpacity style={styles.button} onPress={onLogout}>
            <MaterialIcons name="logout" size={24} color="black" />
          </TouchableOpacity>
        ) : (
          <View style={styles.button}></View>
        )}
      </View>
    </View>
  );
};

export default CustomHeader;

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

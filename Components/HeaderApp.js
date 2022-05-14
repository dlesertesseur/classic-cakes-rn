import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../Styles/Colors";

const HeaderApp = (props) => {

  const {title = "APP TITLE"} = props;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default HeaderApp;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 80,
    backgroundColor: colors.primaryDarker,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

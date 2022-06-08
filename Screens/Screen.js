import React from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { colors } from "../Styles/Colors";

const Screen = (props) => {
  const { children, onBack = null } = props;

  return (
    <View style={styles.container}>
      <View style={styles.body}>{children}</View>
      <View style={styles.controls}>
        {onBack !== null ? (
          <TouchableOpacity style={styles.button} onPress={onBack}>
            <Text style={styles.text}>Volver</Text>
          </TouchableOpacity>
        ) : (
          <></>
        )}
      </View>
    </View>
  );
};

export default Screen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: colors.primaryLighter,
    alignItems: "center",
    justifyContent: "flex-start",
  },

  body: {
    flex: 1,
    width: "100%",
  },

  controls: {
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },

  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.secondary,
    borderRadius: 6,
    height: 40,
    margin: 10,
    width: "100%",
  },

  text: {
    fontSize: 16,
  },
});

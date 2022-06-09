import { StyleSheet, TouchableOpacity, Text } from "react-native";
import React from "react";

const CustomButton = ({ disabled, text, color, onPress }) => {
  return (
    <TouchableOpacity
      style={
        disabled
          ? styles.disabled
          : [styles.enabled, { backgroundColor: color }]
      }
      onPress={onPress}
      disabled={disabled}
    >
      <Text
        style={
          disabled
            ? styles.textDisabled
            : styles.textEnabled
        }>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  enabled: {
    width: "100%",
    borderRadius: 6,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },

  disabled: {
    width: "100%",
    borderRadius: 6,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    backgroundColor: "#cccccc",
  },

  textEnabled: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },

  textDisabled: {
    fontSize: 18,
    fontWeight: "bold",
    color: "gray",
  },
});

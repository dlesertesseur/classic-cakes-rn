import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors } from "../Styles/Colors";

const PropertyRow = (props) => {
  const { label=null, value, extraStyle } = props;
  return (
    <View style={styles.container}>
        {label !== null
        ?
        <Text style={styles.text}>{label}</Text>
        :
        <></>
        }
      <Text style={{...styles.text, ...extraStyle}}>{value}</Text>
    </View>
  );
};

export default PropertyRow;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: colors.primaryLighter,
    minHeight: 30,
    width: "100%",
  },
  text: {
    fontSize: 16,
  },
});

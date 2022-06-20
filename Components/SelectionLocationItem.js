import React from "react";
import { colors } from "../Styles/Colors";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const SelectionLocationItem = (props) => {
  const { location, onPress, selected = false} = props;

  const onLocalPress = () => {
    onPress(location);
  }

  return (
    <TouchableOpacity style={styles.container} onPress={onLocalPress}>
      <View style={styles.row}>
        <Image style={styles.image} source={{ uri: location.picture }} />
        <View style={styles.itemData}>
          <View style={styles.itemDataRow}>
            <Text style={styles.text}>{location.title}</Text>
          </View>
          <View style={styles.itemDataRow}>
            <Text style={styles.text}>{location.address}</Text>
          </View>
        </View>

        {selected ?
        <MaterialIcons name="check-circle" size={32} color="green" style={styles.icon}/>
        :<></>}
      </View>
    </TouchableOpacity>
  );
};

export default SelectionLocationItem;

const styles = StyleSheet.create({
  container: {
    height: 90,
    margin: 5,
    marginBottom: 5,
  },

  text: {
    fontSize: 18,
    color: "#000000",
    fontFamily: "LatoItalic",
  },

  textTitle: {
    fontSize: 22,
    color: "#000000",
    fontWeight: "bold",
  },

  text: {
    fontSize: 18,
    color: "#000000",
    fontFamily: "LatoItalic",
  },

  row: {
    width: "100%",
    height: "100%",
    borderRadius: 6,
    padding: 5,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: colors.primaryDarker,
  },

  itemDataRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 5,
  },

  itemData: {
    flex: 1,
    height: "100%",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    marginLeft: 5,
  },

  buttons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },

  image: {
    width: 80,
    height: 80,
    borderRadius: 4,
    marginRight: 5,
  },

  icon: {
    marginRight: 15,
  },

  button: {},
});

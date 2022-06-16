import React from "react";
import { colors } from "../Styles/Colors";
import { MaterialIcons } from '@expo/vector-icons'; 
import { StyleSheet, Text, View, Image, TouchableOpacity} from "react-native";

const LocationItem = (props) => {
  const { location, onRemove } = props;

   const onLocalRemove = () => {
    onRemove(location);
  }

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Image style={styles.image} source={{uri: location.picture}} />
        <View style={styles.itemData}>
          <View style={styles.itemDataRow}>
            <Text style={styles.text}>{location.title}</Text>
          </View>
          <View style={styles.itemDataRow}>
            <Text style={styles.text}>{location.address}</Text>
          </View>
        </View>
        <View style={styles.buttons}>
          <TouchableOpacity style={styles.button} onPress={onLocalRemove}>
            <MaterialIcons name="highlight-remove" size={32} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default LocationItem;

const styles = StyleSheet.create({
  container: {
    height: 90,
    marginHorizontal: 10,
    marginBottom:10,
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

  button: {
    //justifyContent: "center",
    //alignItems: "flex-start",
  },
});

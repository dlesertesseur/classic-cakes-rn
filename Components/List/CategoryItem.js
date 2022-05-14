import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import React from "react";
import { colors } from "../../Styles/Colors";

const CategoryItem = (props) => {
  const { category, onPress } = props;

  const localOnPress = () => {
    onPress(category);
  };

  return (
    <View style={styles.container}>
      <View style={styles.image}>
        <TouchableOpacity style={styles.button} onPress={localOnPress}>
          <Text style={styles.text}>{category.text}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CategoryItem;

const styles = StyleSheet.create({
  container: {
    flex: 1 / 2,
    height: 150,
    margin: 10,
    borderRadius: 4,
    backgroundColor: colors.secondary
  },
  text: {
    fontSize: 18,
    color: "#000000",
    fontFamily: 'LatoItalic'
  },

  image: {
    width: "100%",
    height: "100%",
    borderRadius: 4,
    overflow: "hidden",
  },
  button: {
    padding: 10,
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
});

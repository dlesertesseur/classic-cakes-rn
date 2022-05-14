import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
} from "react-native";

import React from "react";
import { colors } from "../../Styles/Colors";

const ProductItem = (props) => {
  const { product, onPress } = props;
  const localOnPress = () => {
    onPress(product);
  };

  return (
    <View style={styles.container}>
      <View style={styles.image}>
        <TouchableOpacity style={styles.button} onPress={localOnPress}>
          <Text style={styles.text}>{product.title}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProductItem;

const styles = StyleSheet.create({
  container: {
    flex: 1 / 2,
    height: 150,
    margin: 10,
    borderRadius: 4,
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
    backgroundColor: colors.primaryDarker
  },
  button: {
    padding: 10,
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
});

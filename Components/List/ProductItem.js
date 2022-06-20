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
      <TouchableOpacity style={styles.panel} onPress={localOnPress}>
        <View style={styles.imagePanel}>
          <View style={styles.image} />
        </View>
        <View style={styles.textPanel}>
          <Text style={styles.text}>{product.title}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ProductItem;

const styles = StyleSheet.create({
  container: {
    flex: 1 / 2,
    height: 150,
    marginBottom: 10,
    marginHorizontal: 5,
  },

  panel: {
    width: "100%",
    height: "100%",
    backgroundColor: colors.secondary,
    borderRadius: 6,
  },

  text: {
    fontSize: 18,
    color: "#000000",
    fontFamily: "LatoItalic",
    marginRight: 10,
  },

  image: {
    backgroundColor: colors.secondary,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    marginTop: 3,
    marginLeft: 3,
    marginRight: 3,
    flex: 1,
  },

  imagePanel: {
    flex: 1,
    backgroundColor: colors.primary,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  },

  textPanel: {
    height: 30,
    justifyContent: "center",
    alignItems: "flex-end",
    backgroundColor: colors.primary,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
  },
});

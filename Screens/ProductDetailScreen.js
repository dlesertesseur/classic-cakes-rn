import { StyleSheet, Text, View, Image } from "react-native";
import { stringTable } from "../Styles/StringTable";
import { useWindowDimensions } from "react-native";
import React from "react";
import Screen from "./Screen";
import PropertyRow from "../Components/PropertyRow";

const onPress = () => {};

const ProductDetailScreen = (props) => {
  const { product, onBack } = props;

  const { height, width } = useWindowDimensions();
  const imgW = width - 20;
  const imgH = imgW;

  return (
    <Screen title={stringTable.APP_TITLE} onBack={onBack}>
      <View style={styles.container}>
        <Image
          style={{ ...styles.image, ...{ width: imgW, height: imgH } }}
          source={{ uri: "https://picsum.photos/250" }}
        />
      </View>
      <View style={styles.properties}>
        <PropertyRow value={product.title} extraStyle={{ fontSize: 22, fontWeight: "bold" }} />
        <PropertyRow value={product.description} />
        <PropertyRow label="Precio $" value={product.price} />
      </View>
    </Screen>
  );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  image: {
    borderRadius: 4,
    overflow: "hidden",
  },

  properties: {
    justifyContent: "flex-start",
    alignItems: "center",
  },

  title: { fontSize: 20, fontWeight: "bold" },
});

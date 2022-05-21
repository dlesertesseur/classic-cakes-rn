import React, { useEffect, useState } from "react";
import Screen from "./Screen";
import PropertyRow from "../Components/PropertyRow";
import { StyleSheet, View, Image, ActivityIndicator } from "react-native";
import { useWindowDimensions } from "react-native";
import { stringTable } from "../Styles/StringTable";
import { PRODUCTS } from "../Data/data";

const ProductDetailScreen = (props) => {
  const { navigation, route } = props;

  const { height, width } = useWindowDimensions();
  const imgW = width - 20;
  const imgH = imgW;

  const { productId } = route.params;

  const [product, setProduct] = useState(null);

  useEffect(() => {
    const prod = PRODUCTS.find((p) => p.id === productId);
    setProduct(prod);
  }, [productId]);

  return (
    <Screen title={stringTable.APP_TITLE}>
      {product != null ? (
        <>
          <View style={styles.container}>
            <Image
              style={{ ...styles.image, ...{ width: imgW, height: imgH } }}
              source={{ uri: "https://picsum.photos/250" }}
            />
          </View>
          <View style={styles.properties}>
            <PropertyRow
              value={product.title}
              extraStyle={{ fontSize: 22, fontWeight: "bold" }}
            />
            <PropertyRow value={product.description} />
            <PropertyRow label="Precio $" value={product.price} />
          </View>
        </>
      ) : (
        <>
          <ActivityIndicator />
        </>
      )}
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

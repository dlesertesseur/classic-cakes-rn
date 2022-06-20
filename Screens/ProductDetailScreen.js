import React, { useEffect, useState } from "react";
import Screen from "./Screen";
import PropertyRow from "../Components/PropertyRow";
import { StyleSheet, View, Image, TouchableOpacity, Text, ActivityIndicator } from "react-native";
import { useWindowDimensions } from "react-native";
import { stringTable } from "../Styles/StringTable";
import { useDispatch, useSelector } from 'react-redux'
import { addItem } from '../Features/Cart'
import { colors } from "../Styles/Colors";

const ProductDetailScreen = (props) => {
  const { navigation, route } = props;

  const { width } = useWindowDimensions();
  const imgW = width - 20;
  const imgH = imgW;

  const dispatch = useDispatch();
  const {productSelected} = useSelector(state => state.products.value);

  const addProduct = () => {
    dispatch(addItem(productSelected));
    navigation.navigate("Products");
  }

  return (
    <Screen title={stringTable.APP_TITLE}>
      {productSelected != null ? (
        <>
          <View style={styles.container}>
            <Image
              style={{ ...styles.image, ...{ width: imgW, height: imgH } }}
              source={{ uri: "https://picsum.photos/250" }}
            />
          </View>
          <View style={styles.properties}>
            <PropertyRow
              value={productSelected.title}
              extraStyle={{ fontSize: 22, fontWeight: "bold" }}
            />
            <PropertyRow value={productSelected.description} />
            <PropertyRow label="Precio $" value={productSelected.price} />
          </View>

          <View style={styles.buttons}>
            <TouchableOpacity style={styles.buttonAdd} onPress={addProduct}>
              <Text style={styles.buttonAddTitle}>
                {stringTable.LB_ADD_PRODUCT}
              </Text>
            </TouchableOpacity>
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
    //padding: 10,
    justifyContent: "flex-start",
    alignItems: "center",
  },

  image: {
    borderRadius: 4,
    overflow: "hidden",
    marginBottom: 10,
  },

  properties: {
    justifyContent: "flex-start",
    alignItems: "center",
  },

  buttons: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },

  buttonAdd: {
    width: "100%",
    height: 40,
    borderRadius: 4,
    backgroundColor: colors.secondary,
    justifyContent: "center",
    alignItems: "center"
  },

  title: { fontSize: 20, fontWeight: "bold" },
  buttonAddTitle: { fontSize: 16, fontWeight: "bold" },
});

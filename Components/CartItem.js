import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { colors } from "../Styles/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { stringTable } from "../Styles/StringTable";

const CartItem = (props) => {
  const { product, onDelete = null } = props;

  const localOnDelete = () => {
    onDelete(product);
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.itemData}>
          <View style={styles.itemDataRow}>
            <Text style={styles.textTitle}>{product.title}</Text>
          </View>
          <View style={styles.itemDataRow}>
            <Text style={styles.text}>{"Cantidad: " + product.quantity}</Text>
          </View>
          <View style={styles.itemDataRow}>
            <Text style={styles.text}>
              {stringTable.LB_UNIT_PRICE + product.price}
            </Text>
            {product.quantity > 1 ? (
              <Text style={[styles.text, styles.spacer]}>
                {stringTable.LB_SUB_TOTAL + product.price * product.quantity}
              </Text>
            ) : (
              <></>
            )}
          </View>
        </View>

        {onDelete !== null ? (
          <View style={styles.buttons}>
            <TouchableOpacity style={styles.button} onPress={localOnDelete}>
              <MaterialIcons name="highlight-remove" size={32} color="black" />
            </TouchableOpacity>
          </View>
        ) : (
          <></>
        )}
      </View>
    </View>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  container: {
    height: 90,
    marginHorizontal: 10,
    marginBottom: 10,
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
    padding: 10,
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
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  },

  buttons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },

  button: {},

  spacer: {
    marginLeft: 10,
  },
});

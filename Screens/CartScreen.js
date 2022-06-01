import Screen from "./Screen";
import CartItem from "../Components/CartItem";
import PaymentPanel from "../Components/PaymentPanel";

import {
  StyleSheet,
  View,
  Text,
  FlatList,
  useWindowDimensions,
} from "react-native";

import { stringTable } from "../Styles/StringTable";
import { useState } from "react";
import { colors } from "../Styles/Colors";
import { useSelector, useDispatch } from "react-redux";
import { confirmPurchase } from "../Features/Cart";

const CartScreen = (props) => {
  const { navigation, route } = props;

  const { height } = useWindowDimensions();

  const dispatch = useDispatch();

  const {products} = useSelector(state => state.cart.value)

  const [totalToPay, setTotalToPay] = useState(4400.00);

  const onDelete = () => {
    console.log("CartScreen::onDelete");
  };

  const onPress = () => {
    dispatch(confirmPurchase(products));
  };

  const renderElement = ({ item }) => {
    return <CartItem product={item} onDelete={onDelete}></CartItem>;
  };

  return (
    <Screen>
      {products !== null && products.length > 0 ? (
        <View style={{ ...styles.container, height: height - 140 }}>
          <FlatList
            style={styles.list}
            data={products}
            renderItem={renderElement}
            keyExtractor={(item) => item.id}
          />
          <PaymentPanel onPress={onPress} totalToPay={totalToPay}/>
        </View>
      ) : (
        <View style={styles.panel}>
          <Text style={styles.text}>{stringTable.NO_DATA}</Text>
        </View>
      )}
    </Screen>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: colors.primaryLighter,
  },

  list: {
    width: "100%",
  },
});

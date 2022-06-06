import Screen from "./Screen";
import CartItem from "../Components/CartItem";
import PaymentPanel from "../Components/PaymentPanel";
import AlertDialog from "../Components/AlertDialog";

import {
  StyleSheet,
  View,
  Text,
  FlatList,
  useWindowDimensions,
} from "react-native";

import { stringTable } from "../Styles/StringTable";
import { useState, useEffect } from "react";
import { colors } from "../Styles/Colors";
import { useSelector, useDispatch } from "react-redux";
import { confirmPurchase, removeItem, clearData } from "../Features/Cart";
import NotificationDialog from "../Components/NotificacionDialog";
import { getOrders } from "../Features/Orders";

const CartScreen = (props) => {
  const { navigation, route } = props;

  const { height } = useWindowDimensions();

  const dispatch = useDispatch();

  const { products, error } = useSelector((state) => state.cart.value);

  const [totalToPay, setTotalToPay] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [showAlerDialog, setShowAlerDialog] = useState(false);
  const [showPurchaseConfirmedDialog, setShowPurchaseConfirmedDialog] = useState(false);

  useEffect(() => {
    let total = 0;
    products.map((p) => (total += p.price));
    setTotalToPay(total);
  }, [products]);

  const onDelete = (product) => {
    setSelectedProduct(product);
    setShowAlerDialog(true);
  };

  const onConfirmDelete = () => {
    dispatch(removeItem(selectedProduct));
    setShowAlerDialog(false);
  }

  const onConfirm = () => {
    dispatch(confirmPurchase(products));
    
    /*RECARGA LAS ORDENES AL CREAR UNA NUEVA*/
    dispatch(getOrders());

    setShowPurchaseConfirmedDialog(true);
  };

  const renderElement = ({ item }) => {
    return <CartItem product={item} onDelete={onDelete}></CartItem>;
  };

  return (
    <Screen>
      {products !== null && products.length > 0 ? (
        <View style={{ ...styles.container, height: height - 160 }}>
          <FlatList
            style={styles.list}
            data={products}
            renderItem={renderElement}
            keyExtractor={(item) => item.id}
          />
          <PaymentPanel onPress={onConfirm} totalToPay={totalToPay} />

          <AlertDialog
            visible={showAlerDialog}
            text={stringTable.REMOVE_PRODUCT_TEXT}
            onAction={onConfirmDelete}
            onCancel={ () => {setShowAlerDialog(false)}}
          />

          <NotificationDialog
            visible={showPurchaseConfirmedDialog}
            text={stringTable.PURCHASE_CONFIRMED_TEXT}
            type={error ? 'error' : "notification"}
            onClose={ () => {
              setShowPurchaseConfirmedDialog(false)
              dispatch(clearData());
            }}
          />
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

  panel: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  text: {
    fontSize: 16,
  },
});

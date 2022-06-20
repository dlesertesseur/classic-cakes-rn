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

import NotificationDialog from "../Components/NotificacionDialog";
import { stringTable } from "../Styles/StringTable";
import { useState, useEffect } from "react";
import { colors } from "../Styles/Colors";
import { useSelector, useDispatch } from "react-redux";
import { confirmPurchase, removeItem, clearData } from "../Features/Cart";
import { getOrders } from "../Features/Orders";
import SelectionDialog from "../Components/SelectionDialog";
import { getLocations } from "../Features/Locations";

const CartScreen = (props) => {
  const { navigation, route } = props;

  const { height } = useWindowDimensions();

  const dispatch = useDispatch();

  const { products, error, total } = useSelector((state) => state.cart.value);
  const { locations } = useSelector((state) => state.locations.value);
  const { user } = useSelector((state) => state.auth.value);

  const [showPurchaseConfirmedDialog, setShowPurchaseConfirmedDialog] = useState(false);
  const [locationSelectionVisible, setLocationSelectionVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showAlerDialog, setShowAlerDialog] = useState(false);
  const [orderId, setOrderId] = useState(null);

  const getNextId = () => {
    const ret = new Date().getTime();
    return ret;
  };

  useEffect(() => {
    dispatch(getLocations());
  }, []);

  const onDelete = (product) => {
    setSelectedProduct(product);
    setShowAlerDialog(true);
  };

  const onConfirmDelete = () => {
    dispatch(removeItem(selectedProduct));
    setShowAlerDialog(false);
  };

  const onConfirmLocation = (location) => {

    setLocationSelectionVisible(false);

    const id = getNextId();

    dispatch(confirmPurchase({ orderId: id, email: user.email, items: products, address: location.address}));
    setOrderId(id);

    //RECARGA LAS ORDENES AL CREAR UNA NUEVA
    dispatch(getOrders());
    setShowPurchaseConfirmedDialog(true);
  };

  const onConfirm = () => {
    setLocationSelectionVisible(true);
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
          <PaymentPanel onPress={onConfirm} totalToPay={total} />

          <SelectionDialog
            visible={locationSelectionVisible}
            locations={locations}
            title={stringTable.SCREEN_LOCATIONS}
            onCancel={() => {
              setLocationSelectionVisible(false);
            }}
            onAction={onConfirmLocation}
          />

          <AlertDialog
            visible={showAlerDialog}
            text={stringTable.REMOVE_PRODUCT_TEXT}
            onAction={onConfirmDelete}
            onCancel={() => {
              setShowAlerDialog(false);
            }}
          />

          <NotificationDialog
            visible={showPurchaseConfirmedDialog}
            text={
              error
                ? stringTable.PURCHASE_ERROR_TEXT
                : stringTable.PURCHASE_CONFIRMED_TEXT
            }
            detail={
              error ? null : stringTable.PURCHASE_CONFIRMED_TEXT_ID + orderId
            }
            type={error ? "error" : "notification"}
            onClose={() => {
              setShowPurchaseConfirmedDialog(false);
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

import Screen from "./Screen";
import OrderItem from "../Components/OrderItem";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import { useWindowDimensions, FlatList } from "react-native";
import { stringTable } from "../Styles/StringTable";
import { colors } from "../Styles/Colors";
import { useSelector, useDispatch} from "react-redux";
import { setOrderSelected, getOrdersByEmail } from "../Features/Orders";
import { useEffect } from "react";

const LocationScreen = (props) => {
  const { navigation, route } = props;
  const { height } = useWindowDimensions();

  const dispatch = useDispatch();

  const { orders, loading} = useSelector((state) => state.orders.value);
  const { user } = useSelector((state) => state.auth.value);

/*   useEffect(() => {
    dispatch(getOrdersByEmail({email: user.email}));
  }, []); */

  const onPress = (order) => {
    dispatch(setOrderSelected(order.id));
    console.log("OrderScreen::onPress");
  };

  const onDelete = (order) => {
    console.log("OrderScreen::onDelete");
  };

  const renderElement = ({ item }) => {
    return (
      <OrderItem order={item} onPress={onPress} onDelete={onDelete}></OrderItem>
    );
  };

  return (
    <Screen>
      {loading ? (
        <View style={styles.panel}>
          <ActivityIndicator
            style={styles.indicator}
            size="large"
            color={colors.activityIndicator}
          />
        </View>
      ) : (
        <>
          {orders !== null && orders.length > 0 ? (
            <View style={{ ...styles.container, height: height - 170 }}>
              <View style={styles.topPanel}>
                <FlatList
                  style={styles.list}
                  data={orders}
                  renderItem={renderElement}
                  keyExtractor={(item) => item.id}
                />
              </View>
            </View>
          ) : (
            <View style={styles.panel}>
              <Text style={styles.textNoData}>{stringTable.NO_DATA}</Text>
            </View>
          )}
        </>
      )}
    </Screen>
  );
};

export default LocationScreen;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    backgroundColor: colors.primaryLighter,
    alignItems: "center",
    justifyContent: "flex-start",
  },

  list: {
    width: "100%",
    height: "100%",
  },

  topPanel: {
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
  },

  text: {
    fontSize: 22,
    color: "#000000",
  },

  panel: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  textNoData: {
    fontSize: 16,
  },

  indicator: {},
});

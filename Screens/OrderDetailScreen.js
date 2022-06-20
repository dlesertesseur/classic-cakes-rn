import Screen from "./Screen";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import { useWindowDimensions, FlatList } from "react-native";
import { stringTable } from "../Styles/StringTable";
import { colors } from "../Styles/Colors";
import CartItem from "../Components/CartItem";

const OrderDetailScreen = (props) => {
  const { navigation, route } = props;
  const { height } = useWindowDimensions();

  const renderElement = ({ item }) => {
    return <CartItem product={item}></CartItem>;
  };

  const params = route.params;
  const products = params.products;

  return (
    <Screen>
      {products !== null && products.length > 0 ? (
        <View style={{ ...styles.container, height: height - 170 }}>
          <View style={styles.topPanel}>
            <FlatList
              style={styles.list}
              data={products}
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
    </Screen>
  );
};

export default OrderDetailScreen;

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

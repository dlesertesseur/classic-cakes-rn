import CartScreen from "../../../Screens/CartScreen";
import React from "react";
import CustomHeader from "../../../Components/CustomHeader";
import { StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { stringTable } from "../../../Styles/StringTable";

const Stack = createNativeStackNavigator();

const CartStack = () => {
  return (
    <Stack.Navigator initialRouteName="Cart">
      <Stack.Screen
        name="Cart"
        component={CartScreen}
        options={{
          header: () => <CustomHeader title = {stringTable.SCREEN_CART}/>,
        }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};

export default CartStack;

const styles = StyleSheet.create({});

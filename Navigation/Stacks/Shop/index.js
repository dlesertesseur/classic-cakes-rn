import React from "react";
import ProductsScreen from "../../../Screens/ProductsScreen";
import CategoriesScreen from "../../../Screens/CategoriesScreen";
import ProductDetailScreen from "../../../Screens/ProductDetailScreen";
import CustomHeader from "../../../Components/CustomHeader";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";
import { stringTable } from "../../../Styles/StringTable";

const Stack = createNativeStackNavigator();

const ShopNavigator = () => {
  const { categorySelected } = useSelector((state) => state.categories.value);
  const { productSelected } = useSelector((state) => state.products.value);

  return (
    <Stack.Navigator initialRouteName="Categories">
      <Stack.Screen
        name="Categories"
        component={CategoriesScreen}
        options={{
          header: ({navigation}) => <CustomHeader title={stringTable.SCREEN_CATEGORIES} />,
        }}
      />

      <Stack.Screen
        name="Products"
        component={ProductsScreen}
        options={{
          header: ({navigation}) => <CustomHeader title={categorySelected.text} navigation={navigation}/>,
        }}
      />

      <Stack.Screen
        name="Detail"
        component={ProductDetailScreen}
        options={{
          header: ({navigation}) => <CustomHeader title={productSelected.title} navigation={navigation}/>,
        }}
      />
    </Stack.Navigator>
  );
};

export default ShopNavigator;

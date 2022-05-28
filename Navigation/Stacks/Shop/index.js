import React from "react";
import ProductsScreen from "../../../Screens/ProductsScreen";
import CategoriesScreen from "../../../Screens/CategoriesScreen";
import ProductDetailScreen from "../../../Screens/ProductDetailScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { colors } from "../../../Styles/Colors";
import { useSelector } from "react-redux";

const Stack = createNativeStackNavigator();

const ShopNavigator = () => {

  const {categorySelected} = useSelector(state => state.categories.value);
  const {productSelected} = useSelector(state => state.products.value);

  return (
      <Stack.Navigator
        initialRouteName="Categories">
        <Stack.Screen 
          name="Categories" 
          component={CategoriesScreen} 
          options={{
              title:"Categorias",
              headerStyle: {backgroundColor: colors.primaryLighter}}}
          />

        <Stack.Screen 
          name="Products" 
          component={ProductsScreen} 
          options={({route}) => ({ title: categorySelected.text,
            headerStyle: {backgroundColor: colors.secondary}})}/>

        <Stack.Screen
          name="Detail" 
          component={ProductDetailScreen}
          options={({route}) => ({ title: productSelected.title,
            headerStyle: {backgroundColor: colors.primaryDarker}})}
          />
      </Stack.Navigator>
  );
};

export default ShopNavigator;

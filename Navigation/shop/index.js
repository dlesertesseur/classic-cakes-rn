import React from "react";
import CategoriesScreen from "../../Screens/CategoriesScreen";
import ProductsScreen from "../../Screens/ProductsScreen";
import ProductDetailScreen from "../../Screens/ProductDetailScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { colors } from "../../Styles/Colors";

const Stack = createNativeStackNavigator();

const MainNavigator = () => {
  return (
    <NavigationContainer>
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
          options={({route}) => ({ title: route.params.categoryTitle,
            headerStyle: {backgroundColor: colors.secondary}})}/>

        <Stack.Screen
          name="Detail" 
          component={ProductDetailScreen}
          options={({route}) => ({ title: route.params.productTitle,
            headerStyle: {backgroundColor: colors.primaryDarker}})}
          />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;

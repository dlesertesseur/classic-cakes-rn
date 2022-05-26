import { StyleSheet} from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CartScreen from '../../../Screens/CartScreen';
import { colors } from '../../../Styles/Colors';

const Stack = createNativeStackNavigator();

const CartStack = () => {
  return (
    <Stack.Navigator initialRouteName="">
        <Stack.Screen
          name= "Cart"
          component={CartScreen}
          options={{
            title:"Carrito",
            headerStyle: {backgroundColor: colors.primaryLighter}}}
        >
        </Stack.Screen> 
    
    </Stack.Navigator>
  )
}

export default CartStack

const styles = StyleSheet.create({})
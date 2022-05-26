import OrderScreen from '../../../Screens/OrderScreen';
import React from 'react'
import { StyleSheet} from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { colors } from '../../../Styles/Colors';

const Stack = createNativeStackNavigator();

const OrderStack = () => {
  return (
    <Stack.Navigator initialRouteName="">
        <Stack.Screen
          name= "Order"
          component={OrderScreen}
          options={{
            title:"Ordenes",
            headerStyle: {backgroundColor: colors.primaryLighter}}}
        >
        </Stack.Screen> 
    
    </Stack.Navigator>
  )
}

export default OrderStack

const styles = StyleSheet.create({})
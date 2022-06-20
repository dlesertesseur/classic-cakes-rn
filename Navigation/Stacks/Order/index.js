import React from 'react'
import OrderScreen from '../../../Screens/OrderScreen';
import CustomHeader from '../../../Components/CustomHeader';
import { StyleSheet} from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { stringTable } from '../../../Styles/StringTable';
import OrderDetailScreen from '../../../Screens/OrderDetailScreen';


const Stack = createNativeStackNavigator();

const OrderStack = () => {
  return (
    <Stack.Navigator initialRouteName="Orders">
        <Stack.Screen
          name="Orders"
          component={OrderScreen}
          options={{
            header: () => <CustomHeader title = {stringTable.SCREEN_ORDERS}/>,
          }}
        >
        </Stack.Screen> 

        <Stack.Screen
          name="OrderDetail"
          component={OrderDetailScreen}
          options={{
            header: ({navigation}) => <CustomHeader title = {stringTable.SCREEN_ORDER_DETAIL} navigation={navigation} logoutButton={false}/>,
          }}
        >
        </Stack.Screen> 
    </Stack.Navigator>
  )
}

export default OrderStack

const styles = StyleSheet.create({})
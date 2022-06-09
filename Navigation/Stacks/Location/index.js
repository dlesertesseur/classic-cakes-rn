import LocationsScreen from '../../../Screens/LocationsScreen';
import React from 'react'
import LocationHeader from '../../../Components/LocationHeader';
import CustomHeader from '../../../Components/CustomHeader';
import NewLocationScreen from '../../../Screens/NewLocationScreen';
import GetLocationsScreen from '../../../Screens/GetLocationsScreen';
import SetLocationsScreen from '../../../Screens/SetLocationsScreen';
import { StyleSheet} from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { stringTable } from '../../../Styles/StringTable';

const Stack = createNativeStackNavigator();

const LocationStack = () => {
  return (
    <Stack.Navigator initialRouteName="Locations">
        <Stack.Screen
          name="Locations"
          component={LocationsScreen}
          options={{
            header: ({navigation}) => <LocationHeader title = {stringTable.SCREEN_LOCATIONS} navigation={navigation}/>,
          }}
        >
        </Stack.Screen> 
    
        <Stack.Screen
          name="NewLocation"
          component={NewLocationScreen}
          options={{
            header: ({navigation}) => <CustomHeader title = {stringTable.SCREEN_NEW_LOCATIONS} navigation={navigation} logoutButton={false}/>,
          }}
        >
        </Stack.Screen> 

        <Stack.Screen
          name="GetLocation"
          component={GetLocationsScreen}
          options={{
            header: ({navigation}) => <CustomHeader title = {stringTable.SCREEN_GET_LOCATION} navigation={navigation} logoutButton={false}/>,
          }}
        >
        </Stack.Screen> 

        <Stack.Screen
          name="SetLocation"
          component={SetLocationsScreen}
          options={{
            header: ({navigation}) => <CustomHeader title = {stringTable.SCREEN_SET_LOCATION} navigation={navigation} logoutButton={false}/>,
          }}
        >
        </Stack.Screen> 

    </Stack.Navigator>
  )
}

export default LocationStack

const styles = StyleSheet.create({})
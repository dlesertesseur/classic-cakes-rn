import LocationScreen from '../../../Screens/LocationScreen';
import React from 'react'
import LocationHeader from '../../../Components/LocationHeader';
import { StyleSheet} from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { stringTable } from '../../../Styles/StringTable';


const Stack = createNativeStackNavigator();

const LocationStack = () => {
  return (
    <Stack.Navigator initialRouteName="Orders">
        <Stack.Screen
          name="Orders"
          component={LocationScreen}
          options={{
            header: () => <LocationHeader title = {stringTable.SCREEN_LOCATIONS}/>,
          }}
        >
        </Stack.Screen> 
    
    </Stack.Navigator>
  )
}

export default LocationStack

const styles = StyleSheet.create({})
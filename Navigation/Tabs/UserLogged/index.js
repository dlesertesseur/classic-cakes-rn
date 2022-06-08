import React from 'react'
import ShopNavigator from '../../Stacks/Shop'
import CartStack from '../../Stacks/Cart';
import OrderStack from '../../Stacks/Order';
import { StyleSheet, Text, View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../../../Styles/Colors';
import LocationStack from '../../Stacks/Location';

const BottomTabs = createBottomTabNavigator()

const TabNavigatorLogged = () => {
  return (
    <BottomTabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar
      }}
    >
      <BottomTabs.Screen
        name="ShopTab"
        component={ShopNavigator}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View style={styles.item}>
                <MaterialIcons name="storefront" size={24} color="black" />
                <Text>Shop</Text>
              </View>
            )
          }
        }}
      />
      <BottomTabs.Screen
        name="CartTab"
        component={CartStack}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View style={styles.item}>
                <MaterialIcons name="shopping-cart" size={24} color="black" />
                <Text>Cart</Text>
              </View>
            )
          }
        }}
      />

      <BottomTabs.Screen
        name="OrderTab"
        component={OrderStack}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View style={styles.item}>
                <MaterialIcons name="view-list" size={24} color="black" />
                <Text>Orders</Text>
              </View>
            )
          }
        }}
      />
      <BottomTabs.Screen
        name="LocationTab"
        component={LocationStack}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View style={styles.item}>
                <MaterialIcons name="location-pin" size={24} color="black" />
                <Text>Location</Text>
              </View>
            )
          }
        }}
      />
    </BottomTabs.Navigator>
  )
}

export default TabNavigatorLogged

const styles = StyleSheet.create({
  tabBar: {
    shadowColor: colors.primaryDarker,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 0.25,
    elevation: 2,
    position: "absolute",
    bottom: 10,
    left: 10,
    right: 10,
    borderRadius: 4,
    height: 70,
    backgroundColor: colors.primary
  },
  item: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})
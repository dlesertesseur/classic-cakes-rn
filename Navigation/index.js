import TabNavigatorLogged from "./Tabs/UserLogged";
import AuthStack from "./Stacks/Auth";
import { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../Styles/Colors";
import { StyleSheet } from "react-native";

const MainNavigator = () => {
  const { user } = useSelector((state) => state.auth.value);

  const [userLogged, setUserLogged] = useState(false);

  useEffect(() => {
    if (user) {
      if (user.token) {
        setUserLogged(user.token.length > 0);
      } else {
        setUserLogged(false);
      }
    } else {
      setUserLogged(false);
    }
  }, [user]);

  return (
    <NavigationContainer>
      <SafeAreaView style={styles.container}>
        {userLogged ? <TabNavigatorLogged /> : <AuthStack />}
      </SafeAreaView>
    </NavigationContainer>
  );
};

export default MainNavigator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryLighter,
  },
});

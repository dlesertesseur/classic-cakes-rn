import { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useSelector } from "react-redux";
import TabNavigatorLogged from "./Tabs/UserLogged";
import AuthStack from "./Stacks/Auth";

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
      {userLogged ? <TabNavigatorLogged /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default MainNavigator;

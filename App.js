import MainNavigator from "./Navigation";
import store from './Store';
import { ActivityIndicator, StyleSheet } from "react-native";
import { useFonts } from "expo-font";
import { Provider } from 'react-redux'
import { SafeAreaProvider} from "react-native-safe-area-context";

export default function App() {

  const [loaded] = useFonts({
    LatoItalic: require("./assets/fonts/lato/Lato-Italic.ttf"),
  });

  if (!loaded) {
    return <ActivityIndicator />;
  }

  return (
    <Provider store={store}>
      <SafeAreaProvider style={styles.container}>
        <MainNavigator />
      </SafeAreaProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

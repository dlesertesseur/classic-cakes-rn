import MainNavigator from "./Navigation";
import store from './Store';
import { SafeAreaView, ActivityIndicator, StyleSheet } from "react-native";
import { useFonts } from "expo-font";
import { Provider } from 'react-redux'

export default function App() {

  const [loaded] = useFonts({
    LatoItalic: require("./assets/fonts/lato/Lato-Italic.ttf"),
  });

  if (!loaded) {
    return <ActivityIndicator />;
  }

  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
        <MainNavigator />
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

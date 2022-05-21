import { SafeAreaView, ActivityIndicator, StyleSheet } from "react-native";
import { useFonts } from "expo-font";
import MainNavigator from "./Navigation/shop";

export default function App() {

  const [loaded] = useFonts({
    LatoItalic: require("./assets/fonts/lato/Lato-Italic.ttf"),
  });

  if (!loaded) {
    return <ActivityIndicator />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <MainNavigator />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

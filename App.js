import { SafeAreaView, ActivityIndicator, StyleSheet } from "react-native";
import { useState } from "react";
import { useFonts } from 'expo-font';
import CategoriesScreen from "./Screens/CategoriesScreen";
import ProductsScreen from "./Screens/ProductsScreen";
import ProductDetailScreen from "./Screens/ProductDetailScreen";

export default function App() {
  const [categorySelected, setCategorySelected] = useState(null);
  const [productSelected, setProductSelected] = useState(null);

  const toCategoriesScreen = () => {
    setCategorySelected(null);
  };

  const toProductsScreen = () => {
    setProductSelected(null);
  };

  const [loaded] = useFonts({
    LatoItalic: require('./assets/fonts/lato/Lato-Italic.ttf')
  });
  
  if (!loaded) {
    return <ActivityIndicator/>;
  }

  return (
    <SafeAreaView style={styles.container}>
      {categorySelected === null ? (
        <CategoriesScreen
          setCategorySelected={setCategorySelected}
          placeholder={"Buscar categoria..."}
        />
      ) : productSelected === null ? (
        <ProductsScreen
          setProductSelected={setProductSelected}
          setCategorySelected={setCategorySelected}
          category={categorySelected}
          placeholder={"Buscar producto..."}
          onBack={toCategoriesScreen}
        />
      ) : (
        <ProductDetailScreen
          setProductSelected={setProductSelected}
          setCategorySelected={setCategorySelected}
          product={productSelected}
          onBack={toProductsScreen}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});


import { StyleSheet } from "react-native";
import { stringTable } from "../Styles/StringTable";
import { PRODUCTS } from "../Data/data";
import React from "react";
import Screen from "../Screens/Screen";
import Searcher from "../Components/Searcher";
import ProductItem from "../Components/List/ProductItem";

const ProductsScreen = (props) => {
  const {
    placeholder,
    navigation,
    route
  } = props;

  const {categoryId} = route.params;

  const [productsInCategory, setProductsInCategory] = React.useState([]);
  const [filteredProducts, setFilteredProducts] = React.useState([]);

  const onSelectProduct = (product) => {
    navigation.navigate("Detail", {productId: product.id, productTitle: product.title});
  };

  React.useEffect(() => {
    const filtered = PRODUCTS.filter((p) => p.category_id === categoryId);
    setProductsInCategory(filtered);
  }, []);

  React.useEffect(() => {
    setFilteredProducts(productsInCategory);
  }, [productsInCategory]);

  const renderElement = ({ item }) => {
    return <ProductItem product={item} onPress={onSelectProduct} />;
  };

  const filteredElements = (toFilterText) => {
    if (toFilterText !== null) {
      const ret = productsInCategory.filter((element) => {
        const sz = element.title.toLowerCase();
        return sz.includes(toFilterText.toLowerCase());
      });
      setFilteredProducts(ret);
    } else {
      setFilteredProducts(productsInCategory);
    }
  };

  return (
    <Screen title={stringTable.APP_TITLE}>
      <Searcher
        data={filteredProducts}
        columns={2}
        renderElement={renderElement}
        filteredElements={filteredElements}
        placeholder={placeholder}
      />
    </Screen>
  );
};

export default ProductsScreen;

const styles = StyleSheet.create({});

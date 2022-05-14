import { StyleSheet } from "react-native";
import { stringTable } from "../Styles/StringTable";
import { PRODUCTS } from "../Data/data";
import React from "react";
import Screen from "../Screens/Screen";
import Searcher from "../Components/Searcher";
import ProductItem from "../Components/List/ProductItem";

const ProductsScreen = (props) => {
  
  const {setProductSelected, category, placeholder, onBack} = props;

  const [productsInCategory, setProductsInCategory] = React.useState([]);
  const [filteredProducts, setFilteredProducts] = React.useState([]);

  React.useEffect(() => {
    const filtered = PRODUCTS.filter(p => p.category_id === category.id);
    setProductsInCategory(filtered);
  }, []);

  React.useEffect(() => {
    setFilteredProducts(productsInCategory);
  }, [productsInCategory]);

  const renderElement = ({ item }) => {
    return <ProductItem product={item} onPress={setProductSelected}/>;
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
    <Screen title={stringTable.APP_TITLE} onBack={onBack}>
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

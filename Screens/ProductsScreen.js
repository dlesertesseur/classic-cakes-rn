import React from "react";
import Screen from "../Screens/Screen";
import Searcher from "../Components/Searcher";
import ProductItem from "../Components/List/ProductItem";
import { StyleSheet } from "react-native";
import { stringTable } from "../Styles/StringTable";
import { useSelector, useDispatch } from "react-redux";
import { setProductSelected } from '../Features/Products'

const ProductsScreen = (props) => {
  const {
    placeholder,
    navigation
  } = props;

  const {productsByCategory} = useSelector(state => state.products.value)
  const [filteredProducts, setFilteredProducts] = React.useState([]);

  const dispatch = useDispatch();

  const onSelectProduct = (product) => {
    dispatch(setProductSelected(product.id));
    navigation.navigate("Detail");
  };

  React.useEffect(() => {
    setFilteredProducts(productsByCategory);
  }, [productsByCategory]);

  const renderElement = ({ item }) => {
    return <ProductItem product={item} onPress={onSelectProduct} />;
  };

  const filteredElements = (toFilterText) => {
    if (toFilterText !== null) {
      const ret = productsByCategory.filter((element) => {
        const sz = element.title.toLowerCase();
        return sz.includes(toFilterText.toLowerCase());
      });
      setFilteredProducts(ret);
    } else {
      setFilteredProducts(productsByCategory);
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

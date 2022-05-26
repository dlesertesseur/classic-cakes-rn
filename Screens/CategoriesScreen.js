import React, { useState } from "react";
import Screen from "../Screens/Screen";
import Searcher from "../Components/Searcher";
import CategoryItem from "../Components/List/CategoryItem";
import { StyleSheet } from "react-native";
import { stringTable } from "../Styles/StringTable";
import { useSelector, useDispatch } from "react-redux";
import { selectCategory } from '../Features/Categories'
import { setProductsByCategory } from '../Features/Products'

const CategoriesScreen = (props) => {
  const { placeholder, navigation } = props;
  const {categories} = useSelector(state => state.categories.value)

  const [filteredCategories, setSetFilteredCategories] = useState(categories);
  const dispatch = useDispatch();

  const onSelectCategory = (category) => {

    dispatch(setProductsByCategory(category.id))
    dispatch(selectCategory(category.id));

    navigation.navigate("Products");
  };

  const renderElement = ({ item }) => {
    return <CategoryItem category={item} onPress={onSelectCategory} />;
  };

  const filteredElements = (toFilterText) => {
    if (toFilterText !== null) {
      const ret = categories.filter((element) => {
        const sz = element.text.toLowerCase();
        return sz.includes(toFilterText.toLowerCase());
      });
      setSetFilteredCategories(ret);
    } else {
      setSetFilteredCategories(categories);
    }
  };

  return (
    <Screen title={stringTable.APP_TITLE}>
      <Searcher
        data={filteredCategories}
        columns={2}
        renderElement={renderElement}
        filteredElements={filteredElements}
        placeholder={placeholder}
      />
    </Screen>
  );
};

export default CategoriesScreen;

const styles = StyleSheet.create({});

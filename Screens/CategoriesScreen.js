import { StyleSheet, View } from "react-native";
import { colors } from "../Styles/Colors";
import { stringTable } from "../Styles/StringTable";
import { CATEGORIES } from "../Data/data";
import React from "react";
import Screen from "../Screens/Screen";
import Searcher from "../Components/Searcher";
import CategoryItem from "../Components/List/CategoryItem";

const CategoriesScreen = (props) => {

  const {setCategorySelected, placeholder} = props;

  const [filteredCategories, setSetFilteredCategories] = React.useState(CATEGORIES);

  const renderElement = ({ item }) => {
    return <CategoryItem category={item} onPress={setCategorySelected}/>;
  };

  const filteredElements = (toFilterText) => {
    if (toFilterText !== null) {
      const ret = CATEGORIES.filter((element) => {
        const sz = element.text.toLowerCase();
        return sz.includes(toFilterText.toLowerCase());
      });
      setSetFilteredCategories(ret);
    } else {
      setSetFilteredCategories(CATEGORIES);
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

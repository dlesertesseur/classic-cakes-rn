import React from "react";
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../../Styles/Colors";

const radius = 6; 

const CategoryItem = (props) => {
  const { category, onPress } = props;

  const localOnPress = () => {
    onPress(category);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.panel} onPress={localOnPress}>
        <View style={styles.imagePanel}>
          <View style={styles.image}/>
        </View>
        <View style={styles.textPanel}>
          <Text style={styles.text}>{category.text}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CategoryItem;

const styles = StyleSheet.create({
  container: {
    flex: 1 / 2,
    height: 150,
    marginBottom:10,
    marginHorizontal: 5,
  },
  
  panel: {
    width: "100%",
    height: "100%",
    backgroundColor: colors.secondary,
    borderRadius: radius,
    //borderWidth:1,
    //borderColor: colors.border,
  },

  text: {
    fontSize: 18,
    color: "#000000",
    fontFamily: "LatoItalic",
    marginRight: 10,
  },

  image: {
    backgroundColor: colors.primaryDarker,
    borderTopLeftRadius: radius - 2,
    borderTopRightRadius: radius - 2,
    marginTop: 3,
    marginLeft:3,
    marginRight:3,
    flex: 1,
    borderWidth:1,
    borderColor: colors.border,
  },

  imagePanel: {
    flex: 1,
    backgroundColor: colors.primary,
    borderTopLeftRadius: radius,
    borderTopRightRadius: radius,
  },

  textPanel: {
    height: 30,
    justifyContent: "center",
    alignItems: "flex-end",
    backgroundColor: colors.primary,
    borderBottomLeftRadius: radius,
    borderBottomRightRadius: radius,
  },
});

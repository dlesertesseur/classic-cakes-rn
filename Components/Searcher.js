import {
  StyleSheet,
  ActivityIndicator,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";

import { colors } from "../Styles/Colors";
import List from "../Components/List";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

const Searcher = (props) => {
  const {
    data,
    columns = 1,
    renderElement,
    filteredElements,
    placeholder = "Buscar...",
    loading,
  } = props;
  const [filteredText, setFilteredText] = React.useState("");

  React.useEffect(() => {
    if (filteredText.trim() == "") {
      filteredElements(null);
    } else {
      filteredElements(filteredText);
    }
  }, [filteredText]);

  const onPress = () => {
    setFilteredText("");
  };

  return (
    <View style={styles.container}>
      <View style={styles.panel}>
        <TextInput
          style={styles.textInput}
          onChangeText={setFilteredText}
          value={filteredText}
          placeholder={placeholder}
        />
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Ionicons name="md-remove-circle" size={36} color="black" />
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.activityPanel}>
          <ActivityIndicator
            style={styles.indicator}
            size="large"
            color={colors.activityIndicator}
          />
        </View>
      ) : (
        <List data={data} columns={columns} renderElement={renderElement} />
      )}
    </View>
  );
};

export default Searcher;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },

  panel: {
    margin: 10,
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.primary,
    borderRadius: 4,
    height: 60,
  },

  textInput: {
    flex: 1,
    paddingHorizontal: 5,
    backgroundColor: "white",
    borderRadius: 4,
    height: 40,
  },

  button: {
    marginLeft: 10,
    padding: 0,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    height: 40,
    width: 40,
  },

  activityPanel: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
  },

  indicator: {},
});

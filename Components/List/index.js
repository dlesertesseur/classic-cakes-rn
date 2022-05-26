import { StyleSheet, FlatList, View, Text } from "react-native";
import React from "react";
import { stringTable } from "../../Styles/StringTable";

const index = (props) => {
  const { columns = 1, data, renderElement } = props;

  return (
    <>
      {data !== null && data.length > 0 ? (
        <FlatList
          numColumns={columns}
          data={data}
          renderItem={renderElement}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <View style={styles.panel}>
          <Text style={styles.text}>{stringTable.NO_DATA}</Text>
        </View>
      )}
    </>
  );
};

export default index;

const styles = StyleSheet.create({
  panel: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
  },
});

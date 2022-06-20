import React, { useState } from "react";
import SelectionLocationItem from "./SelectionLocationItem";
import { StyleSheet, View, Text, TouchableOpacity, Modal, FlatList } from "react-native";
import { colors } from "../Styles/Colors";
import { stringTable } from "../Styles/StringTable";

const SelectionDialog = (props) => {
  const { visible, title = "NO DEF", onAction, onCancel, locations } = props;

  const [selectLocation, setselectLocation] = useState(null);

  const onSeletLocation = (location) => {
    setselectLocation(location);
  }
  
  const isSelected = (id) => {
    let ret = false;
    if(selectLocation != null){
      ret = selectLocation.id === id;
    }
    return(ret);
  }

  const renderElement = ({ item }) => {
    return <SelectionLocationItem location={item} onPress={onSeletLocation} selected={isSelected(item.id)} ></SelectionLocationItem>;
  };

  const onLocalAction = () => {
    onAction(selectLocation);
  }

  return (
    <Modal
      animationType={"fade"}
      transparent={true}
      visible={visible}
    >
      <View style={styles.centeredView}>
        <View style={styles.panel}>
          <View style={styles.textPanel}>
            <Text style={styles.text}> {title} </Text>
          </View>

          <View style={styles.bodyPanel}>
            {locations !== null && locations.length > 0 ? (
              <View style={styles.listPanel}>
                <FlatList
                  style={styles.list}
                  data={locations}
                  renderItem={renderElement}
                  keyExtractor={(item) => item.id}
                />
              </View>
            ) : (
              <View style={styles.panelNoData}>
                <Text style={styles.textNoData}>{stringTable.NO_DATA}</Text>
              </View>
            )}
          </View>

          <View style={styles.bottomPanel}>
            <TouchableOpacity style={selectLocation === null ? styles.buttonSelectionDisabled : styles.buttonSelection} 
            onPress={onLocalAction} disabled={selectLocation === null}>
              <Text style={selectLocation === null ? styles.buttonDisabledText : styles.buttonText}>{stringTable.BT_SELECT}</Text>
            </TouchableOpacity>
            <View style={styles.separator}></View>
            <TouchableOpacity style={styles.button} onPress={onCancel}>
              <Text style={styles.buttonText}>{stringTable.BT_CANCEL}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default SelectionDialog;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
  },

  panel: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 8,
    backgroundColor: colors.primary,
    borderWidth: 1,
    borderColor: colors.border,
  },

  panelNoData: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 8,
  },

  textPanel: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },

  bodyPanel: {
    height: 300,
    width: "100%",
    margin: 10,
    backgroundColor: colors.primaryLighter,
    borderWidth: 1,
    borderColor: colors.border,
  },

  bottomPanel: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },

  text: {
    fontSize: 18,
    fontWeight: "bold",
  },

  button: {
    flex: 1,
    height: 40,
    borderRadius: 4,
    backgroundColor: colors.secondary,
    justifyContent: "center",
    alignItems: "center",
  },

  buttonSelection: {
    flex: 1,
    height: 40,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.confirmButton
  },

  buttonSelectionDisabled: {
    flex: 1,
    height: 40,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.disabledButton
  },

  buttonText: { fontSize: 16, fontWeight: "bold" , color: "black"},
  buttonDisabledText: { fontSize: 16, fontWeight: "bold", color: colors.disabledFont},

  separator: { width: 10 },

  listPanel: {
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
  },

  list: {
    width: "100%",
    height: "100%",
  },
});

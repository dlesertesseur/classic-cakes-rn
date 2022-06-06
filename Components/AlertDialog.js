import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Modal } from "react-native";
import { colors } from "../Styles/Colors";
import { stringTable } from "../Styles/StringTable";

const AlertDialog = (props) => {
  const {
    visible,
    text = "NO DEF",
    onAction,
    onCancel,
  } = props;

  return (
    <Modal
      animationType={"fade"}
      transparent={true}
      visible={visible}
      //onRequestClose={onAction}
    >
      <View style={styles.centeredView}>
        <View style={styles.panel}>
          <View style={styles.textPanel}>
            <Text style={styles.text}> {text} </Text>
          </View>
          <View style={styles.bottomPanel}>
            <TouchableOpacity style={styles.button} onPress={onAction}>
              <Text style={styles.buttonText}>{stringTable.BT_REMOVE}</Text>
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

export default AlertDialog;

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
    backgroundColor: colors.backDialog,
  },

  textPanel: {
    minHeight: 60,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },

  bottomPanel: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginTop: 10,
  },

  text: {
    fontSize: 18,
    fontWeight: "bold",
  },

  button: {
    flex: 1,
    height: 40,
    borderRadius: 4,
    backgroundColor: colors.buttonDialog,
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: { fontSize: 16, fontWeight: "bold" },

  separator: { width: 10 },
});

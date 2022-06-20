import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Modal } from "react-native";
import { colors } from "../Styles/Colors";
import { stringTable } from "../Styles/StringTable";

const NotificationDialog = (props) => {
  const {
    type = "notification",
    visible,
    text = "NO DEF",
    detail = null,
    onClose,
  } = props;

  const determineStyle = (type) => {
    //Se utiliza el switch para tratar posibles nuevos tipos
    let ret = null;
    switch (type) {
      case "error":
        ret = styles.panelError;
        break;
      case "alert":
        ret = styles.panelAlert;
        break;
    }
    return ret;
  };

  return (
    <Modal
      animationType={"fade"}
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={[styles.panel, determineStyle(type)]}>
          <View style={styles.textPanel}>
            <Text style={styles.text}> {text} </Text>
            {detail !== null ? (
              <Text style={styles.text}> {detail} </Text>
            ) : (
              <></>
            )}
          </View>

          <View style={styles.bottomPanel}>
            <TouchableOpacity style={styles.button} onPress={onClose}>
              <Text style={styles.buttonText}>{stringTable.BT_CLOSE}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default NotificationDialog;

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

  panelError: {
    backgroundColor: "red",
  },

  panelAlert: {
    backgroundColor: "yellow",
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

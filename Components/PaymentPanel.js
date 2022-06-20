import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { stringTable } from "../Styles/StringTable";
import { colors } from "../Styles/Colors";
import { MaterialIcons } from "@expo/vector-icons";

const PaymentPanel = (props) => {
  const { onPress, totalToPay } = props;

  const localOnPress = () => {
    onPress();
  };

  return (
    <View style={styles.bottomPanel}>
      <View style={styles.bottomPanelLeft}>
        <Text style={styles.textLabel}>
          {stringTable.LB_TOTAL + stringTable.LB_MONEY_SIGN + totalToPay}
        </Text>
      </View>
      <View style={styles.bottomPanelRight}>
        <TouchableOpacity style={styles.button} onPress={localOnPress}>
          <Text style={styles.text}>{stringTable.BT_CONFIRM}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PaymentPanel;

const styles = StyleSheet.create({
  button: {
    height: "100%",
    borderRadius: 4,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.confirmButton,
  },

  text: {
    fontSize: 22,
    color: "black",
  },

  textLabel: {
    fontSize: 22,
    color: "black",
  },

  bottomPanelRight: {
    marginLeft: 10,
    height: "100%",
  },

  bottomPanelLeft: {
    flex: 1,
    height: "100%",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.confirmPanel,
    borderWidth: 1,
    borderColor: colors.confirmPanelBorder,
  },

  bottomPanel: {
    width: "100%",
    padding: 10,
    height: 80,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});

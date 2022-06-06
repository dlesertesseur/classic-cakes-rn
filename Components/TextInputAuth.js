import { StyleSheet, Text, View, TextInput } from "react-native";
import { colors } from "../Styles/Colors";

const TextInputAuth = (props) => {
  const { label, password = false, value, setValue, error, focusRef } = props;

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.inputText}
        placeholder={label}
        secureTextEntry={password}
        value={value}
        onChangeText={setValue}
        ref={focusRef}
      />
      {error
      ? 
      <Text style={styles.error}>{error}</Text>
      :
      <View style={styles.separator}></View>}
    </View>
  );
};

export default TextInputAuth;

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },

  inputText: {
    width: "100%",
    height: 40,
    borderRadius: 6,
    backgroundColor: colors.textInputBack,
    padding: 10,
    color: colors.textInputColor,
    fontSize: 18,
  },

  error: {
    width: "100%",
    padding: 2,
    color: colors.error,
    fontSize: 11,
    marginBottom: 15,
  },
  
  separator: {
    width: "100%",
    padding: 2,
    marginBottom: 15,
  },

});

import Screen from "./Screen";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useWindowDimensions, FlatList } from "react-native";
import { stringTable } from "../Styles/StringTable";
import { colors } from "../Styles/Colors";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import CustomTextInput from "../Components/CustomTextInput";

const NewLocationScreen = (props) => {
  const { navigation, route } = props;
  const { height } = useWindowDimensions();

  const [address, setAddress] = useState("");
  const [addressError, setAddressError] = useState("");

  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth.value);

  const focusRef = useRef(null);

  useEffect(() => {
    focusRef.current.focus();
  }, []);

  /*   useEffect(() => {
    dispatch(getOrdersByEmail({email: user.email}));
  }, []); */

  const onTakePhoto = () => {
    console.log("NewLocationScreen::onTakePhoto");
  };

  const onLocation = () => {
    console.log("NewLocationScreen::onLocation");
  };

  const onMap = () => {
    console.log("NewLocationScreen::onMap");
  };

  return (
    <Screen>
      <View style={styles.container}>
        <CustomTextInput
          label={stringTable.LB_ADDRESS}
          value={address}
          setValue={setAddress}
          error={addressError}
          focusRef={focusRef}
          aditionalStyle={{backgroundColor:"#F9EBC8"}}
        />

        <TouchableOpacity style={styles.button} onPress={onTakePhoto}>
          <Text style={styles.textButton}> {stringTable.BT_TAKE_PHOTO} </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={onLocation}>
          <Text style={styles.textButton}> {stringTable.BT_LOCATION} </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={onMap}>
          <Text style={styles.textButton}> {stringTable.BT_MAP} </Text>
        </TouchableOpacity>

      </View>
    </Screen>
  );
};

export default NewLocationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 10,
    backgroundColor: colors.primaryLighter,
  },

  button: {
    flexDirection: "row",
    width: "100%",
    borderRadius: 6,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.secondary,
    marginBottom: 15,
  },

  textButton: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
});

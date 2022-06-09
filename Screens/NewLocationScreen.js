import Screen from "./Screen";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import { useWindowDimensions } from "react-native";
import { stringTable } from "../Styles/StringTable";
import { colors } from "../Styles/Colors";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { addLocation } from "../Features/Locations";
import CustomTextInput from "../Components/CustomTextInput";
import * as ImagePicker from 'expo-image-picker';

const NewLocationScreen = (props) => {
  const { navigation, route } = props;
  const { height } = useWindowDimensions();

  const [address, setAddress] = useState("");
  const [addressError, setAddressError] = useState("");
  const [picture, setPicture] = useState("");

  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth.value);

  const focusRef = useRef(null);

  useEffect(() => {
    focusRef.current.focus();
  }, []);

  /*   useEffect(() => {
    dispatch(getOrdersByEmail({email: user.email}));
  }, []); */

  const onLocation = () => {
    console.log("NewLocationScreen::onLocation");
  };

  const onMap = () => {
    console.log("NewLocationScreen::onMap");
  };

  const getPermission = async () => {
    const { status } = await ImagePicker.getCameraPermissionsAsync()

    console.log(status);
    if (status !== 'granted')
    {
      return false
    }
    return true
  }

  const onTakePhoto = async () => {
    const isVerified = getPermission();
    if (!isVerified) {
      return
    }

    const image = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    })

    console.log("onTakePhoto: " + image.uri);
    setPicture(image.uri);
  }
  
  const onConfirm = async () => {
    // const path = await renamePathAndMove(picture);
    // console.log(path);
    if(address !== '')
    {
      dispatch(addLocation({title, picture, id: Date.now()}))
      setAddress("");
      setAddressError("");
      setPicture("");
    }
    else{
      setAddressError(stringTable.MANDATORY_FIELD);
    }
  }

  const onSelectPhoto = () => {
    console.log("onSelectPhoto()");
  }

  return (
    <Screen>
      <View style={styles.container}>
        <CustomTextInput
          label={stringTable.LB_ADDRESS}
          value={address}
          setValue={setAddress}
          error={addressError}
          focusRef={focusRef}
          aditionalStyle={{ backgroundColor: "#F9EBC8" }}
        />

        {picture ? (
          <Image source={{ uri: picture }} style={styles.image} />
        ) : null}

        <TouchableOpacity style={styles.button} onPress={onTakePhoto}>
          <Text style={styles.textButton}> {stringTable.BT_TAKE_PHOTO} </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={onSelectPhoto}>
          <Text style={styles.textButton}> {"SELECCIONAR DE GALARIA"} </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={onLocation}>
          <Text style={styles.textButton}> {stringTable.BT_LOCATION} </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={onMap}>
          <Text style={styles.textButton}> {stringTable.BT_MAP} </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonConfirm} onPress={onConfirm}>
          <Text style={styles.textButton}> {stringTable.BT_CONFIRM} </Text>
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

  buttonConfirm: {
    flexDirection: "row",
    width: "100%",
    borderRadius: 6,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.confirmButtom,
    marginBottom: 15,
  },

  textButton: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },

  image: {
    width: '100%',
    height: 200,
    borderWidth: 2,
    borderRadius: 8,
    borderColor: colors.lightBlue,
    marginBottom: 15,
  }
});

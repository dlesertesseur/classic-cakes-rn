import Screen from "./Screen";
import CustomTextInput from "../Components/CustomTextInput";
import * as ImagePicker from 'expo-image-picker';
import CustomButton from "../Components/CustomButton";
//mport renamePathAndMove from "../Util/FileUtil";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import { stringTable } from "../Styles/StringTable";
import { colors } from "../Styles/Colors";
import { useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { addLocation } from "../Features/Locations";

const NewLocationScreen = (props) => {
  const { navigation, route } = props;
 
  const [title, setTitle] = useState("");
  const [picture, setPicture] = useState("");
  const [confirmButtonDisabled, setConfirmButtonDisabled] = useState(true);

  const dispatch = useDispatch();

  const params = route.params;

  const focusRef = useRef(null);

  useEffect(() => {
    focusRef.current.focus();   
  }, []);

  useEffect(() => {
    validateConfirm();
  },[title, picture, params?.address]);

  const onGetLocation = () => {
    navigation.navigate("GetLocation");
  };

  const onSetLocation = () => {
    navigation.navigate("SetLocation");
  };

  const getPermission = async () => {
    const { status } = await ImagePicker.getCameraPermissionsAsync()
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

    setPicture(image.uri);
  }
  
  const validateData = (value) => {
    setTitle(value);
  }

  const validateConfirm = () => {
    const validate = !(title.length > 0 && picture != null && picture.length > 0 && params?.address)
    setConfirmButtonDisabled(validate);
  }

  const onConfirm = async () => {
    //const path = await renamePathAndMove(picture);
    dispatch(addLocation({title, picture, id: Date.now(), address:params?.address}));
    setTitle("");
    setPicture("");
  }

  const onSelectPhoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setPicture(result.uri);
    }
  }

  return (
    <Screen>
      <View style={styles.container}>
        <CustomTextInput
          label={stringTable.LB_ADDRESS}
          value={title}
          setValue={validateData}
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
          <Text style={styles.textButton}> {stringTable.BT_GALLERY} </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={onGetLocation}>
          <Text style={styles.textButton}> {stringTable.BT_LOCATION} </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={onSetLocation}>
          <Text style={styles.textButton}> {stringTable.BT_MAP} </Text>
        </TouchableOpacity>

        <CustomButton 
          onPress={onConfirm} 
          disabled ={confirmButtonDisabled}
          text = {stringTable.BT_CONFIRM}
          color = {colors.confirmButtom}/>
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

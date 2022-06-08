import Screen from "./Screen";
import TextInputAuth from "../Components/TextInputAuth";
import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { getErrorMessage, stringTable } from "../Styles/StringTable";
import { resetAuthData, signUp } from "../Features/Auth";
import { schemaEmail, schemaPassword } from "../Util/validateSchemas";
import { useDispatch, useSelector } from "react-redux";
import { colors } from "../Styles/Colors";

const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [btBackToLoginVisble, setBtBackToLoginVisble] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordConfirmError, setPasswordConfirmError] = useState("");

  const { loading, error } = useSelector((state) => state.auth.value);

  const dispatch = useDispatch();

  const focusRef = useRef(null);

  const onBackToLogin = () => {
    navigation.navigate("Login");
    dispatch(resetAuthData());
  };

  useEffect(() => {
    focusRef.current.focus();
  }, []);

  useEffect(() => {
    if (error.trim() != "") {
      setLoginError(getErrorMessage(error));
      setBtBackToLoginVisble(error === "EMAIL_EXISTS");
    }
  }, [error]);

  const onLogin = () => {
    navigation.navigate("Login");
  };

  const onSignUp = () => {
    const validateEmail = schemaEmail.validate({ email: email });
    const validatePassword = schemaPassword.validate({ password: password });

    if (validateEmail.error) {
      setEmailError(validateEmail.error.message);
    } else {
      setEmailError("");
      if (validatePassword.error) {
        setPasswordError(validatePassword.error.message);
      } else {
        setPasswordError("");
        if (password === confirmPassword) {
          dispatch(signUp({ email: email, password: password }));
        } else {
          setPasswordConfirmError(stringTable.CONFIRM_PASSWORD_ERROR);
        }
      }
    }
  };

  return (
    <Screen>
      <View style={styles.container}>
        <TextInputAuth
          label={stringTable.LB_EMAIL}
          value={email}
          setValue={setEmail}
          error={emailError}
          focusRef={focusRef}
        />
        <TextInputAuth
          label={stringTable.LB_PASSWORD}
          password={true}
          value={password}
          setValue={setPassword}
          error={passwordError}
        />
        <TextInputAuth
          label={stringTable.LB_CONFIRM_PASSWORD}
          password={true}
          value={confirmPassword}
          setValue={setConfirmPassword}
          error={passwordConfirmError}
        />

        <TouchableOpacity style={styles.btSignUp} onPress={onSignUp}>
          <Text style={styles.btLoingText}> {stringTable.BT_SIGNUP} </Text>
          {loading ? (
            <ActivityIndicator
              style={styles.indicator}
              size="small"
              color={colors.textInputBack}
            />
          ) : (
            <></>
          )}
        </TouchableOpacity>

        <TouchableOpacity style={styles.btText} onPress={onLogin}>
          <Text style={styles.text}> {stringTable.BT_ALREADY_HAVE_USER} </Text>
        </TouchableOpacity>

        {loginError ? (
          <Text style={styles.textError}>{loginError}</Text>
        ) : (
          <></>
        )}

        {btBackToLoginVisble ? (
          <TouchableOpacity style={styles.btBack} onPress={onBackToLogin}>
            <Text style={styles.btLoingText}>
              {stringTable.BT_BACK_TO_LOGIN}
            </Text>
          </TouchableOpacity>
        ) : (
          <></>
        )}
      </View>
    </Screen>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.authScreensBack,
    padding: 10,
  },

  btText: {
    width: "100%",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },

  text: {
    fontSize: 18,
    color: colors.textInputColor,
    fontWeight: "bold",
  },

  btSignUp: {
    flexDirection: "row",
    width: "100%",
    borderRadius: 6,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.textInputColor,
    marginBottom: 15,
  },

  btBack: {
    flexDirection: "row",
    width: "100%",
    borderRadius: 6,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.textInputColor,
    marginBottom: 15,
  },

  btLoingText: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.textInputBack,
  },

  indicator: {
    marginHorizontal: 5,
  },

  textError: {
    color: colors.error,
    fontSize: 15,
    fontWeight: "bold",
    marginBottom:15,
  },
});

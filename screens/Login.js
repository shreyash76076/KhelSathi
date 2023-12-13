import Checkbox from "expo-checkbox";
import { LinearGradient } from "expo-linear-gradient";
import React, { useContext, useState } from "react";
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from "react-native";
import { login } from "../Util/auth";
import Button from "../components/Button";
import TextInputContainer from "../components/TextInputContainer";
import { AuthContext } from "../store/auth-context";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailValid, setisEmailValid] = useState(false);
  const [isPasswordValid, setisPasswordValid] = useState(false);
  const [isChecked, setChecked] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const authCtx = useContext(AuthContext);
  async function loginHandler() {
    setIsAuthenticating(true);
    try {
      const token = await login(email, password);
      authCtx.authenticate(token);
    } catch (error) {
      Alert.alert(
        'Authentication failed!',
        'Could not log you in. Please check your credentials or try again later!'
      );
      setIsAuthenticating(false);
    }
  }
  function setValue(data) {
    setEmail(data);
    setisEmailValid(true);
  }
  function setValuePass(data) {
    setPassword(data);
    setisPasswordValid(true);
  }

  function signUpHandler() {
    navigation.navigate("SignUp");
  }

  function validatonCheck() {
    if (!isEmailValid) {
      ToastAndroid.show("Invalid Email", ToastAndroid.SHORT);
    } else if (!isPasswordValid) {
      ToastAndroid.show("Invalid Password", ToastAndroid.SHORT);
    } else if (isEmailValid && isPasswordValid) {
      loginHandler();
    } else {
      ToastAndroid.show("Please Fill the Details", ToastAndroid.SHORT);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        // Background Linear Gradient
        style={{ flex: 1 }}
        colors={["#BC1342", "#571262"]}
      >
        <ScrollView>
          <View style={styles.halfCurcular}>
            <View
              style={{
                width: "40%",
                backgroundColor: "white",
                borderWidth: 6,
                borderColor: "white",
                alignItems: "flex-end",
                borderTopEndRadius: 80,
                borderBottomEndRadius: 80,
              }}
            >
              <Image
                style={{ width: 150, height: 150 }}
                source={require("../assets/images/uttarpradeshLogo.png")}
              />
            </View>
            <View
              style={{
                width: "55%",
                backgroundColor: "white",
                borderWidth: 6,
                borderColor: "white",
                borderTopStartRadius: 80,
                borderBottomStartRadius: 80,
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <Image
                  style={{
                    width: 80,
                    height: 90,
                    resizeMode: "contain",
                    marginTop: 20,
                    marginStart: 10,
                  }}
                  source={require("../assets/images/modiji.png")}
                />
                <Text
                  style={{
                    marginTop: 30,
                    marginHorizontal: 20,
                    fontSize: 18,
                    color: "black",
                    textAlign: "center",
                    fontWeight: "bold",
                  }}
                >
                  Hon’ble Prime {"\n"}Minister
                </Text>
              </View>
              <Text
                style={{
                  marginStart: 45,
                  marginBottom: 20,
                  fontSize: 20,
                  color: "black",
                  fontWeight: "bold",
                }}
              >
                Sh. Narendra Modi
              </Text>
            </View>
          </View>
          <View style={styles.yogiji}>
            <View
              style={{
                flex: 1,
                borderWidth: 6,
                padding: 10,
                borderColor: "#67125D",
                margin: 10,
                backgroundColor: "white",
                alignItems: "center",
              }}
            >
              <Image
                source={require("../assets/images/yogiji.png")}
                resizeMode="contain"
              />
              <Text style={styles.textStyle}>Sh. Yogi Adityanath</Text>
              <Text style={styles.textStyle1}>
                Hon’ble Chief Minister {"\n"} Uttar Pradesh
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                borderWidth: 6,
                borderColor: "#67125D",
                margin: 6,
                padding: 10,
                backgroundColor: "white",
                paddingTop: 8,
                alignItems: "center",
              }}
            >
              <Image
                source={require("../assets/images/girishji.png")}
                resizeMode="contain"
              />
              <Text style={styles.textStyle}>Sh. Girish Chandra Yadav</Text>
              <Text style={styles.textStyle1}>
                Minister of State,{"\n"} Department of Sports &{"\n"} Youth
                Welfare, Uttar Pradesh
              </Text>
            </View>
          </View>
          <View style={{ marginTop: 30 }}>
            <TextInputContainer
              children="Email"
              icon="person"
              check="false"
              values={setValue}
              onClear={() => setisEmailValid(false)}
            />
            <TextInputContainer
              children="Password"
              icon="lock-closed-outline"
              check="true"
              values={setValuePass}
              onClear={() => setisPasswordValid(false)}
            />
            <View
              style={{
                flexDirection: "row",
                marginTop: "2%",
                justifyContent: "space-around",
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <Checkbox
                  value={isChecked}
                  onValueChange={setChecked}
                  color={isChecked ? "#4630EB" : "white"}
                />
                <Text
                  style={{ color: "white", fontSize: 16, marginStart: "2%" }}
                >
                  Remeber me
                </Text>
              </View>
              <Pressable
                style={{ marginStart: "2%" }}
                onPress={() => {
                  navigation.navigate("ForgotPassword");
                }}
              >
                <Text style={{ color: "white", fontSize: 16 }}>
                  Forgot Password?
                </Text>
              </Pressable>
            </View>
            <Button name="Login" validatonCheck={validatonCheck} />
            <View
              style={{
                flexDirection: "row",
                marginTop: 20,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ textAlign: "center", color: "white" }}>
                Don't have an Account?
              </Text>
              <Pressable onPress={signUpHandler}>
                <Text style={{ color: "#EA5502", fontWeight: "bold" }}>
                  {" "}
                  Sign up!
                </Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  halfCurcular: {
    flexDirection: "row",
    marginTop: 40,
    width: "100%",
    height: 165,
    justifyContent: "space-between",
  },
  yogiji: {
    flexDirection: "row",
    marginTop: 20,
    width: "100%",
    justifyContent: "space-around",
  },
  textStyle: {
    fontSize: 14,
    color: "black",
    marginHorizontal: 4,
    marginTop: 4,
    fontWeight: "bold",
    textAlign: "center",
  },
  textStyle1: {
    fontSize: 14,
    color: "black",
    marginHorizontal: 4,
    marginTop: 4,
    textAlign: "center",
  },
});

import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import axios from "axios";
import config from "../../../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../Redux/User/userSlice";
import { jwtDecode } from "jwt-decode";

const VerificationScreen = ({ route, navigation }) => {
  const { email, phoneNumber, verificationMethod, userName, password } =
    route.params;
  const [verificationCode, setVerificationCode] = useState("");
  const dispatch = useDispatch();
//   console.log("đây là userName và pass", userName, password);
  const handleVerification = async () => {
    try {
      const response = await axios.post(`${config.BASE_URL}/user/verify`, {
        email,
        phoneNumber,
        verificationMethod,
        verificationCode,
      });

      const data = response.data;

      if (data.success) {
        Alert.alert("Thành Công", "Đăng ký thành công!");

        // Gọi API đăng nhập
        const loginResponse = await axios.post(
          `${config.BASE_URL}/user/login`,
          {
            userName,
            password,
          }
        );
        const loginData = loginResponse.data;
        if (loginData.success) {
          const decodedUser = jwtDecode(loginData.accessToken);
          const userInfo = { ...decodedUser, token: loginData.accessToken };
          await AsyncStorage.setItem("user", JSON.stringify(userInfo));
          dispatch(setCredentials(userInfo));
          navigation.navigate("Main");
        } else {
          Alert.alert("Đăng nhập thất bại");
        }
      } else {
        Alert.alert("Thất Bại");
      }
    } catch (error) {
      Alert.alert(
        "Xác nhận thất bại",
        "Có lỗi xảy ra, vui lòng thử lại."
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Xác Nhận Đăng Ký</Text>
      <Text style={styles.instruction}>
        Nhập mã xác nhận được gửi qua{" "}
        {verificationMethod === "email"}.
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Nhập mã xác nhận"
        keyboardType="numeric"
        maxLength={6}
        value={verificationCode}
        onChangeText={(value) => setVerificationCode(value)}
      />
      <Button title="Xác Nhận" onPress={handleVerification} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  instruction: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    textAlign: "center",
  },
});

export default VerificationScreen;

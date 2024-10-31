import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  ScrollView,
} from "react-native";
import axios from "axios";
import config from "../../../config";
const Resgister = () => {
  const [formData, setFormData] = useState({
    email: "",
    userName: "",
    password: "",
    fullName: "",
    phoneNumber: "",
    address: "",
    birthDay: "",
  });

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = async () => {
    // console.log(`${config.BASE_URL}/user/register`);
    try {
      const response = await axios.post(`${config.BASE_URL}/user/register`,
        formData
      );
      const data = response.data;
      console.log(data);
      if (data.success) {
        Alert.alert("Success", data.msg);
      } else {
        Alert.alert("Error", data.msg);
      }
    } catch (error) {
      console.error("Error during registration:", error);
      Alert.alert(
        "Registration Failed",
        error.response?.data?.msg || error.message || "Có lỗi xảy ra"
      );
    }
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Đăng Ký Người Dùng</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={formData.email}
        onChangeText={(value) => handleInputChange("email", value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Tên Người Dùng"
        value={formData.userName}
        onChangeText={(value) => handleInputChange("userName", value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Mật Khẩu"
        secureTextEntry
        value={formData.password}
        onChangeText={(value) => handleInputChange("password", value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Họ và Tên"
        value={formData.fullName}
        onChangeText={(value) => handleInputChange("fullName", value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Số Điện Thoại"
        value={formData.phoneNumber}
        onChangeText={(value) => handleInputChange("phoneNumber", value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Địa Chỉ"
        value={formData.address}
        onChangeText={(value) => handleInputChange("address", value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Ngày Sinh (YYYY-MM-DD)"
        value={formData.birthDay}
        onChangeText={(value) => handleInputChange("birthDay", value)}
      />
      <Button title="Đăng Ký" onPress={handleRegister} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexGrow: 1,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
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
  },
});

export default Resgister;

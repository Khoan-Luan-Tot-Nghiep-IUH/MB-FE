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
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import config from "../../../config";

const Register = ({ navigation }) => {
  const [formData, setFormData] = useState({
    email: "",
    userName: "",
    password: "",
    fullName: "",
    phoneNumber: "",
    address: "",
    birthDay: "",
    verificationMethod: "email",
  });

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = async () => {
    try {
      const response = await axios.post(
        `${config.BASE_URL}/user/register`,
        formData
      );
      const data = response.data;

      if (data.success) {
        Alert.alert("Thành Công", data.msg);
        navigation.navigate("VerificationScreen", {
          email: formData.email,
          phoneNumber: formData.phoneNumber,
          verificationMethod: formData.verificationMethod,
          userName: formData.userName,
          password: formData.password,
        });
      } else {
        Alert.alert("Lỗi", data.msg);
      }
    } catch (error) {
      console.error("Đăng ký thất bại:", error);
      Alert.alert(
        "Đăng ký thất bại",
        error.response?.data?.msg || "Có lỗi xảy ra, vui lòng thử lại."
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
      <View style={styles.pickerContainer}>
        <Text>Phương Thức Xác Nhận:</Text>
        <Picker
          selectedValue={formData.verificationMethod}
          style={styles.picker}
          onValueChange={(value) =>
            handleInputChange("verificationMethod", value)
          }
        >
          <Picker.Item label="Email" value="email" />
          <Picker.Item label="Số Điện Thoại" value="phone" />
        </Picker>
      </View>
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
  pickerContainer: {
    marginBottom: 15,
  },
  picker: {
    height: 50,
    width: "100%",
  },
});

export default Register;

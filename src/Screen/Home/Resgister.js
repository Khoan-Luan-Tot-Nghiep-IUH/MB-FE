import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
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
      <View style={styles.card}>
        <Text style={styles.title}>Tạo Tài Khoản</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#aaa"
          value={formData.email}
          onChangeText={(value) => handleInputChange("email", value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Tên Người Dùng"
          placeholderTextColor="#aaa"
          value={formData.userName}
          onChangeText={(value) => handleInputChange("userName", value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Mật Khẩu"
          placeholderTextColor="#aaa"
          secureTextEntry
          value={formData.password}
          onChangeText={(value) => handleInputChange("password", value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Họ và Tên"
          placeholderTextColor="#aaa"
          value={formData.fullName}
          onChangeText={(value) => handleInputChange("fullName", value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Số Điện Thoại"
          placeholderTextColor="#aaa"
          value={formData.phoneNumber}
          onChangeText={(value) => handleInputChange("phoneNumber", value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Địa Chỉ"
          placeholderTextColor="#aaa"
          value={formData.address}
          onChangeText={(value) => handleInputChange("address", value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Ngày Sinh (YYYY-MM-DD)"
          placeholderTextColor="#aaa"
          value={formData.birthDay}
          onChangeText={(value) => handleInputChange("birthDay", value)}
        />
        <View style={styles.pickerContainer}>
          <Text style={styles.label}>Phương Thức Xác Nhận:</Text>
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
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Đăng Ký</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f0f4f8",
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  input: {
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: "#f9f9f9",
    fontSize: 16,
    color: "#333",
  },
  pickerContainer: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
    padding: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: "#555",
  },
  picker: {
    height: 50,
    width: "100%",
  },
  button: {
    backgroundColor: "#3498db",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Register;

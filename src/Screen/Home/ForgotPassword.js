import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import axios from "axios";
import config from "../../../config";

const ForgotPasswordScreen = ({ navigation }) => {
  const [identifier, setIdentifier] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendCode = async () => {
    if (!identifier) {
      Alert.alert("Lỗi", "Vui lòng nhập email hoặc số điện thoại.");
      return;
    }
    setLoading(true);
    console.log("Sending identifier:", identifier);
    try {
      const response = await axios.post(
        `${config.BASE_URL}/user/forgot-password`,
        { identifier }
      );
      if (response.data.success) {
        Alert.alert("Thành công", response.data.msg);
        navigation.navigate("VerifyResetCodeScreen", { identifier });
      } else {
        Alert.alert("Lỗi", response.data.msg || "Không thể gửi mã.");
      }
    } catch (error) {
      console.error("Gửi mã xác minh thất bại:", error.message);
      Alert.alert("Lỗi", "Có lỗi xảy ra. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đặt Lại Mật Khẩu</Text>
      <TextInput
        style={styles.input}
        placeholder="Email hoặc số điện thoại"
        placeholderTextColor="#666"
        value={identifier}
        onChangeText={setIdentifier}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handleSendCode}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Đang gửi..." : "Gửi Mã Xác Minh"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f0f4f8",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: "#fff",
    fontSize: 16,
    color: "#333",
  },
  button: {
    backgroundColor: "#3498db",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    width: "100%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ForgotPasswordScreen;

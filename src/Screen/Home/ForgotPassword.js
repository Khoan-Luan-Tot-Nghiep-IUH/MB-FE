import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import axios from "axios";
import styles from "../../theme/Home/ForgotPasswordStyle"; // Thêm file style cho màn hình này
import config from "../../../config";

const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async () => {
    if (!email) {
      Alert.alert("Lỗi", "Vui lòng nhập email của bạn.");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(`${config.BASE_URL}/user/forgot-password`, {
        email,
      });
      if (response.data.success) {
        Alert.alert(
          "Thành công",
          "Email đặt lại mật khẩu đã được gửi. Vui lòng kiểm tra hộp thư của bạn."
        );
        navigation.navigate("Login"); // Quay lại màn hình đăng nhập
      } else {
        Alert.alert("Lỗi", response.data.msg || "Không thể gửi email.");
      }
    } catch (error) {
      console.error("Forgot Password Error:", error.message);
      Alert.alert("Lỗi", "Có lỗi xảy ra. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quên Mật Khẩu</Text>
      <TextInput
        style={styles.input}
        placeholder="Nhập email của bạn"
        placeholderTextColor="#666"
        value={email}
        onChangeText={setEmail}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handleForgotPassword}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Đang gửi..." : "Gửi Email"}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>Quay lại</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ForgotPassword;

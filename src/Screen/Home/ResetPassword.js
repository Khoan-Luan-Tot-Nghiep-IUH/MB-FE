import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import axios from "axios";
import styles from "../../theme/Home/ForgotPasswordStyle"; // Thêm file style cho màn hình này
import config from "../../../config";

const ResetPassword = ({ route, navigation }) => {
  const { token } = route.params; // Nhận token từ navigation
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async () => {
    if (!newPassword) {
      Alert.alert("Lỗi", "Vui lòng nhập mật khẩu mới.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        `${config.BASE_URL}/user/reset-password/${token}`,
        { newPassword }
      );

      if (response.data.success) {
        Alert.alert(
          "Thành công",
          "Mật khẩu của bạn đã được cập nhật. Vui lòng đăng nhập."
        );
        navigation.navigate("Login");
      } else {
        Alert.alert("Lỗi", response.data.msg || "Không thể đặt lại mật khẩu.");
      }
    } catch (error) {
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
        placeholder="Nhập mật khẩu mới"
        secureTextEntry={true}
        placeholderTextColor="#666"
        value={newPassword}
        onChangeText={setNewPassword}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handleResetPassword}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Đang cập nhật..." : "Cập nhật mật khẩu"}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.backButtonText}>Quay lại đăng nhập</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ResetPassword;

import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import axios from "axios"; // Import Axios
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import styles from "../../theme/Home/LoginStyle"; // Cập nhật đường dẫn
import config from "../../../config";

WebBrowser.maybeCompleteAuthSession();

const Login = ({ navigation }) => {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Google login
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId:
      "12478692708-8kfnc8jelmtht963r0fukmul21tsgf6m.apps.googleusercontent.com", // Thay thế bằng client ID của bạn
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params; // Lấy id_token từ response
      handleGoogleLogin(id_token);
    }
  }, [response]);

  const handleGoogleLogin = async (id_token) => {
    try {
      const res = await axios.post(`${config.BASE_URL}/user/google-login`, {
        id_token,
      });

      if (res.data.success) {
        navigation.navigate("Main");
      } else {
        Alert.alert("Đăng nhập thất bại", res.data.message);
      }
    } catch (error) {
      console.error("Error during Google login:", error.message);
      Alert.alert(
        "Lỗi",
        "Có lỗi xảy ra khi đăng nhập bằng Google. Vui lòng thử lại."
      );
    }
  };
  // Function to handle login with Axios
  const handleLogin = async () => {
    if (userName === "" || password === "") {
      Alert.alert("Lỗi", "Vui lòng nhập tên đăng nhập và mật khẩu!");
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post(`${config.BASE_URL}/user/login`, {
        userName,
        password,
      });

      if (response.data.success) {
        navigation.navigate("Main");
      } else {
        Alert.alert(
          "Đăng nhập thất bại",
          response.data.message ||
            "Tên đăng nhập hoặc mật khẩu không chính xác!"
        );
      }
    } catch (error) {
      console.error(error.message);
      Alert.alert("Lỗi", "Có lỗi xảy ra khi đăng nhập. Vui lòng thử lại.");
    } finally {
      setLoading(false); // Stop loading after request completes
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng Nhập</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="#666"
        value={userName}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        placeholderTextColor="#666"
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
        disabled={loading} // Disable button during login process
      >
        <Text style={styles.buttonText}>
          {loading ? "Đang đăng nhập..." : "Đăng Nhập"}
        </Text>
      </TouchableOpacity>
      <Text style={styles.or}>Hoặc đăng nhập bằng</Text>
      <View style={styles.socialContainer}>
        <TouchableOpacity
          style={styles.socialButton}
          onPress={() => promptAsync()}
        >
          <Image
            style={styles.socialIcon}
            source={{
              uri: "https://img.idesign.vn/2023/02/idesign_logogg_1.jpg",
            }}
          />
          <Text style={styles.socialButtonText}>Google</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <Image
            style={styles.socialIcon}
            source={{
              uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiXN9xSEe8unzPBEQOeAKXd9Q55efGHGB9BA&s",
            }}
          />
          <Text style={styles.socialButtonText}>Facebook</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.signup}>
        <Text style={styles.signupText}>Chưa có tài khoản? Đăng ký</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;

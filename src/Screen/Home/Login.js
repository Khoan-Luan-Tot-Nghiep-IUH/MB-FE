import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import axios from "axios";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import styles from "../../theme/Home/LoginStyle";
import config from "../../../config";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setCredentials } from "../../Redux/User/userSlice";
import { jwtDecode } from "jwt-decode"; // Đảm bảo bạn đã import jwtDecode

WebBrowser.maybeCompleteAuthSession();

const Login = ({ navigation }) => {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId:
      "12478692708-8kfnc8jelmtht963r0fukmul21tsgf6m.apps.googleusercontent.com",
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      handleGoogleLogin(id_token);
    }
  }, [response]);

  const handleGoogleLogin = async (id_token) => {
    try {
      const res = await axios.post(`${config.BASE_URL}/user/google-login`, {
        id_token,
      });
      if (res.data.success) {
        const userData = res.data.user;
        dispatch(setCredentials(userData));
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

  const handleLogin = async () => {
    if (userName === "" || password === "") {
      Alert.alert("Lỗi", "Vui lòng nhập tên đăng nhập và mật khẩu!");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post(`${config.BASE_URL}/user/login`, {
        userName,
        password,
      });

      if (res.data.success) {
        const decodedUser = jwtDecode(res.data.accessToken); // Giải mã accessToken nếu có
        const userInfo = { ...decodedUser, token: res.data.accessToken };
        await AsyncStorage.setItem("user", JSON.stringify(userInfo));
        dispatch(setCredentials(userInfo));
        navigation.navigate("Main");
      } else {
        Alert.alert("Đăng nhập thất bại", res.data.message);
      }
    } catch (err) {
      console.error("Error during login:", err.message);
      Alert.alert("Lỗi", "Có lỗi xảy ra khi đăng nhập. Vui lòng thử lại.");
    } finally {
      setLoading(false);
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
        disabled={loading}
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

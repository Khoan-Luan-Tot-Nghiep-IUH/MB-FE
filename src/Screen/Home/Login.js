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
import { makeRedirectUri } from "expo-auth-session";

WebBrowser.openAuthSessionAsync();

const Login = ({ navigation }) => {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  // Google OAuth
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId:
      "12478692708-8kfnc8jelmtht963r0fukmul21tsgf6m.apps.googleusercontent.com",
    redirectUri: makeRedirectUri({
      useProxy: true, // Sử dụng proxy của Expo
    }),
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      handleGoogleOAuthLogin(id_token);
    }
  }, [response]);

  const handleGoogleOAuthLogin = async (idToken) => {
    try {
      const redirectUrl = `${config.BASE_URL}/user/google`;
      const result = await WebBrowser.openAuthSessionAsync(redirectUrl);

      if (result.type === "success" && result.url) {
        const token = new URLSearchParams(result.url.split("?")[1]).get(
          "token"
        );
        if (token) {
          const userInfo = { token };
          await AsyncStorage.setItem("user", JSON.stringify(userInfo));
          dispatch(setCredentials(userInfo));
          navigation.navigate("Main");
        } else {
          Alert.alert("Lỗi", "Không thể lấy token từ server.");
        }
      } else {
        Alert.alert("Lỗi", "Quá trình đăng nhập bị hủy.");
      }
    } catch (error) {
      console.error("Google OAuth Login Error:", error.message);
      Alert.alert("Lỗi", "Đăng nhập Google thất bại. Vui lòng thử lại.");
    }
  };

  // Facebook OAuth
  const handleFacebookLogin = async () => {
    try {
      const redirectUrl = `${config.BASE_URL}/facebook`; // Gọi API Facebook login
      const result = await WebBrowser.openAuthSessionAsync(redirectUrl);

      if (result.type === "success" && result.url) {
        const token = new URLSearchParams(result.url.split("?")[1]).get(
          "token"
        );
        if (token) {
          const userInfo = { token };
          await AsyncStorage.setItem("user", JSON.stringify(userInfo));
          dispatch(setCredentials(userInfo));
          navigation.navigate("Main");
        } else {
          Alert.alert(
            "Thông báo",
            "Không thể lấy token từ server. Vui lòng thử lại!"
          );
        }
      } else {
        Alert.alert("Thông báo", "Đăng nhập bằng Facebook đã bị hủy.");
      }
    } catch (error) {
      console.error("Facebook OAuth Login Error:", error.message);
      Alert.alert("Lỗi", "Đăng nhập Facebook thất bại. Vui lòng thử lại sau.");
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
        const userInfo = { token: res.data.accessToken };
        await AsyncStorage.setItem("user", JSON.stringify(userInfo));
        dispatch(setCredentials(userInfo));
        navigation.navigate("Main");
      } else {
        Alert.alert("Đăng nhập thất bại", res.data.message);
      }
    } catch (err) {
      Alert.alert("Thông báo", "Thông tin đăng nhập không chính xác!");
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
        <TouchableOpacity
          style={styles.socialButton}
          onPress={handleFacebookLogin}
        >
          <Image
            style={styles.socialIcon}
            source={{
              uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiXN9xSEe8unzPBEQOeAKXd9Q55efGHGB9BA&s",
            }}
          />
          <Text style={styles.socialButtonText}>Facebook</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.signup}
        onPress={() => navigation.navigate("Resgister")}
      >
        <Text style={styles.signupText}>Chưa có tài khoản? Đăng ký</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.signup}
        onPress={() => navigation.navigate("ForgotPassword")}
      >
        <Text style={styles.signupText}>Quên Mật Khẩu</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;

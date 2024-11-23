import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
} from "react-native";
import styles from "../../../theme/HomePage/Tabottom/ProfileStyle";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../../Redux/User/userSlice";
import axios from "axios";
import { updateUserInfo } from "../../../Redux/User/userSlice";
import config from "../../../../config";

const Profile = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userInfo);
  const token = useSelector((state) => state.user.userInfo?.token);
  // console.log(token);
  const [modalVisible, setModalVisible] = useState(false); // Trạng thái hiển thị modal
  const [fullName, setFullName] = useState(user?.fullName || "");
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || "");

  // Hàm xử lý đăng xuất
  const handleLogout = () => {
    dispatch(logout());
    navigation.navigate("Login");
  };

  // Hàm cập nhật thông tin
  const handleUpdate = async () => {
    try {
      // console.log("Base URL:", `${config.BASE_URL}/user/profile/${user.id}`);
      // console.log("Token:", user?.token);

      const response = await axios.put(
        `${config.BASE_URL}/user/profile/${user.id}`,
        { fullName, phoneNumber },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      // console.log("Response from API:", response.data);
      Alert.alert("Thành công", "Cập nhật thông tin thành công");

      // Cập nhật Redux với dữ liệu mới từ API
      dispatch(updateUserInfo({ fullName, phoneNumber }));
      setModalVisible(false);
    } catch (error) {
      console.log("Error message:", error.message);
      Alert.alert("Lỗi", error.message || "Cập nhật thông tin thất bại");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ marginBottom: 28 }}></View>
      <View style={styles.header}>
        {/* Phần thông tin người dùng */}
        <View style={styles.userInfo}>
          {user ? (
            <>
              <Text style={styles.welcomeText}>
                Xin chào, {user.fullName || "Khách hàng"}
              </Text>
              <Text style={styles.subTextInfo}>
                Số điện thoại: {user.phoneNumber || "Không có"}
              </Text>
              <TouchableOpacity
                onPress={handleLogout}
                style={styles.logoutButton}
              >
                <Text style={styles.logoutText}>Đăng xuất</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text style={styles.welcomeText}>Bạn chưa đăng nhập</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("Login")}
                style={styles.loginButton}
              >
                <Text style={{ color: "white", fontSize: 16 }}>
                  Đăng nhập ngay
                </Text>
              </TouchableOpacity>
            </>
          )}
        </View>
        {/* Icon Profile */}
        <TouchableOpacity
          style={styles.profileIconContainer}
          onPress={() => setModalVisible(true)}
        >
          <View style={styles.profileIcon}>
            <FontAwesome name="user" size={25} color="white" />
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.menuContainer}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            onPress={() => navigation.navigate(item.screen)}
          >
            <FontAwesome
              name={item.icon}
              size={24}
              color="#FF9000"
              style={styles.icon}
            />
            <Text style={styles.menuText}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.footerText}>
        Công ty TNHH Du Lịch Vận Tải Thành và Toàn
      </Text>

      {/* Modal hiển thị và cập nhật thông tin người dùng */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Cập nhật thông tin</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Tên mới"
              value={fullName}
              onChangeText={setFullName}
            />
            <TextInput
              style={styles.modalInput}
              placeholder="Số điện thoại mới"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={handleUpdate}
                style={styles.updateButton}
              >
                <Text style={styles.updateButtonText}>Cập nhật</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={styles.closeButton}
              >
                <Text style={styles.closeButtonText}>Đóng</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const menuItems = [
  { title: "Giới thiệu nhà xe", icon: "info-circle", screen: "IntroCar" },
  { title: "Lộ trình phổ biến", icon: "line-chart", screen: "PopularCar" },
  { title: "Các loại xe", icon: "bus", screen: "TypeCar" },
  { title: "Ưu đãi của tôi", icon: "gift", screen: "SettingCar" },
  { title: "Hỗ trợ", icon: "question-circle", screen: "HelpCar" },
  // { title: "Góp ý", icon: "envelope", screen: "Complant" },
];

export default Profile;

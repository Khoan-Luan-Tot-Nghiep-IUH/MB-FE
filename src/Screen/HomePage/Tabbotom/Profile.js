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
  console.log(token);
  const [modalVisible, setModalVisible] = useState(false); // Trạng thái hiển thị modal
  const [fullName, setFullName] = useState(user?.fullName || "");
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || "");
  console.log(fullName);
  console.log(phoneNumber);
  // Hàm xử lý đăng xuất
  const handleLogout = () => {
    dispatch(logout());
    navigation.navigate("Login");
  };

  // Hàm cập nhật thông tin
  const handleUpdate = async () => {
    try {
      console.log("Base URL:", `${config.BASE_URL}/user/profile/${user.id}`);
      console.log("Token:", user?.token);

      const response = await axios.put(
        `${config.BASE_URL}/user/profile/${user.id}`,
        { fullName, phoneNumber },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      console.log("Response from API:", response.data);
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
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          {user ? (
            <View style={styles.userInfoContainer}>
              <Text style={styles.welcomeText}>Xin chào, {user.fullName}</Text>
              <Text style={styles.subTextInfo}>
                Số điện thoại: {user.phoneNumber}
              </Text>
              <TouchableOpacity
                onPress={handleLogout}
                style={styles.logoutButton}
              >
                <Text style={styles.logoutText}>Đăng xuất</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.loginContainer}>
              <Text style={styles.loginText}>Bạn chưa đăng nhập</Text>
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text style={styles.subText}>Đăng nhập ngay</Text>
              </TouchableOpacity>
            </View>
          )}
          <TouchableOpacity
            style={styles.profileIconContainer}
            onPress={() => setModalVisible(true)}
          >
            <View style={styles.profileIcon}>
              <FontAwesome name="user" size={35} color="white" />
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
      </ScrollView>
    </SafeAreaView>
  );
};

const menuItems = [
  { title: "Giới thiệu nhà xe", icon: "info-circle", screen: "IntroCar" },
  { title: "Lộ trình phổ biến", icon: "line-chart", screen: "PopularCar" },
  { title: "Quy chế hoạt động", icon: "book", screen: "SettingCar" },
  { title: "Các loại xe", icon: "bus", screen: "TypeCar" },
  { title: "Ưu đãi của tôi", icon: "gift", screen: "SettingCar" },
  { title: "Hỗ trợ", icon: "question-circle", screen: "HelpCar" },
  { title: "Góp ý", icon: "envelope", screen: "Complant" },
];

export default Profile;

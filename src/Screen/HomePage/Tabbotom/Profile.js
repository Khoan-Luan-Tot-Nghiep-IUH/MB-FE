import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import styles from "../../../theme/HomePage/Tabottom/ProfileStyle";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../../Redux/User/userSlice"; // Nhập action logout từ userSlice

const Profile = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch(); // Khởi tạo dispatch để gọi action
  const user = useSelector((state) => state.user.userInfo); // Get user data from Redux
  console.log("gà điên", user);

  // Hàm xử lý đăng xuất
  const handleLogout = () => {
    dispatch(logout());
    navigation.navigate("Main"); // Chuyển hướng về màn hình đăng nhập sau khi đăng xuất
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          {user ? (
            <View style={styles.userInfoContainer}>
              <Text style={styles.welcomeText}>Xin chào, {user.fullName}</Text>
              <Text style={styles.subTextInfo}>
                Số điện thoại: {user.phoneNumber}
              </Text>
              {/* Nút đăng xuất */}
              <TouchableOpacity
                onPress={handleLogout}
                style={styles.logoutButton}
              >
                <Text style={styles.logoutText}>Đăng xuất</Text>
              </TouchableOpacity>
            </View>
          ) : (
            // Nếu người dùng chưa đăng nhập, hiển thị thông báo đăng nhập
            <View style={styles.loginContainer}>
              <Text style={styles.loginText}>Bạn chưa đăng nhập</Text>
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text style={styles.subText}>Đăng nhập ngay</Text>
              </TouchableOpacity>
            </View>
          )}
          <TouchableOpacity style={styles.profileIconContainer}>
            <View style={styles.profileIcon}>
              <FontAwesome name="user" size={35} color="white" />
            </View>
          </TouchableOpacity>
        </View>
        {/* Menu Items */}
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
      </ScrollView>
    </SafeAreaView>
  );
};

const menuItems = [
  { title: "Giới thiệu nhà xe", icon: "info-circle", screen: "IntroCar" },
  { title: "Lộ trình phổ biến", icon: "line-chart", screen: "PopularCar" },
  { title: "Văn phòng nhà xe", icon: "building", screen: "TypeCar" },
  { title: "Quy chế hoạt động", icon: "book", screen: "SettingCar" },
  { title: "Các loại xe", icon: "bus", screen: "TypeCar" },
  { title: "Cài đặt", icon: "cog", screen: "SettingCar" },
  { title: "Hỗ trợ", icon: "question-circle", screen: "HelpCar" },
  { title: "Góp ý", icon: "envelope", screen: "Complant" },
];

export default Profile;

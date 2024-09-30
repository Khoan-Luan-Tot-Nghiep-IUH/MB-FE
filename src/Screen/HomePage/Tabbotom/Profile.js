import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import styles from "../../../theme/HomePage/Tabottom/ProfileStyle";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Profile = () => {
  const navigation = useNavigation(); 
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.loginText}>Bạn chưa đăng nhập</Text>
            <Text style={styles.subText}>Đăng nhập ngay</Text>
          </View>
          <TouchableOpacity>
            <View style={styles.profileIcon}>
              <FontAwesome name="user" size={24} color="white" />
            </View>
          </TouchableOpacity>
        </View>
        {/* Menu Items */}
        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              onPress={() => navigation.navigate(item.screen)} // Thêm navigation.navigate
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
          Công ty TNHH Du Lịch Vận Tải Tiến Oanh
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

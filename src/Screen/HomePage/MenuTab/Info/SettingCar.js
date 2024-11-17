import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Alert,
  TextInput,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { MaterialIcons } from "@expo/vector-icons"; // Sử dụng icon
import config from "../../../../../config";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import styles from "../../../../theme/HomePage/MenutabStyle/Info/SettingCarStyle";
const SettingCar = () => {
  const [points, setPoints] = useState(""); // Điểm người dùng nhập
  const [voucher, setVoucher] = useState(null); // Voucher sau khi đổi
  const [vouchers, setVouchers] = useState([]); // Danh sách voucher của user
  const [loading, setLoading] = useState(false); // Trạng thái tải dữ liệu
  const [userData, setUserData] = useState(null); // Thông tin người dùng
  const token = useSelector((state) => state.user.userInfo?.token); // Lấy token từ Redux
  const userInfo = useSelector((state) => state.user?.userInfo); // Lấy userId từ Redux
  console.log("userInfo", userInfo);
  const navigation = useNavigation();
  // Hàm đổi điểm thành voucher
  const redeemPointsForVoucher = async () => {
    try {
      const response = await axios.post(
        `${config.BASE_URL}/vouchers/redeem`,
        { points },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Gửi token trong header
          },
        }
      );

      const { voucher } = response.data;
      setVoucher(voucher); // Lưu voucher mới vào state
      Alert.alert(
        "Thành công",
        `Bạn đã đổi thành công. Mã voucher: ${voucher.code}`
      );

      fetchUserVouchers(); // Làm mới danh sách voucher
    } catch (error) {
      Alert.alert(
        "Lỗi",
        error.response?.data?.message || "Không thể đổi điểm thành voucher."
      );
    }
  };
  // Hàm lấy danh sách voucher của người dùng hiện tại
  const fetchUserVouchers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${config.BASE_URL}/vouchers/user-vouchers`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Gửi token xác thực
          },
        }
      );
      console.log(response.data);
      setVouchers(response.data); // Lưu danh sách voucher vào state
    } catch (error) {
      Alert.alert(
        "Lỗi",
        error.response?.data?.message || "Không thể lấy danh sách voucher."
      );
    } finally {
      setLoading(false);
    }
  };

  // Gọi API khi component được render lần đầu
  useEffect(() => {
    fetchUserVouchers();
  }, []);

  return (
    <View style={styles.container}>
      {/* Nút trở về */}
      <View style={{ marginBottom: 20 }}></View>
      
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <MaterialIcons name="arrow-back" size={28} color="#FFF" />
        <Text style={styles.backButtonText}>Trở về</Text>
      </TouchableOpacity>

      {userInfo && (
        <View style={styles.userInfoContainer}>
          <View style={styles.userAvatar}>
            <MaterialIcons name="person" size={50} color="#FFF" />
          </View>
          <View style={styles.userDetails}>
            <Text style={styles.userGreeting}>Chào mừng,</Text>
            <Text style={styles.userName}>{userInfo.fullName}</Text>
            <Text style={styles.userPoints}>
              Điểm thưởng:{" "}
              <Text style={styles.pointsValue}>
                {userInfo.loyaltyPoints || 0}
              </Text>
            </Text>
          </View>
        </View>
      )}
      {/* Đổi điểm thành voucher */}
      <View style={{ marginBottom: 20 }}></View>
      <View style={styles.redeemSection}>
        <Text style={styles.title}>Quy đổi điểm thưởng</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Nhập số điểm muốn quy đổi"
        keyboardType="numeric"
        value={points}
        onChangeText={setPoints}
      />
      <TouchableOpacity
        style={styles.redeemButton}
        onPress={redeemPointsForVoucher}
      >
        <Text style={styles.redeemButtonText}>Đổi điểm</Text>
      </TouchableOpacity>

      {/* Hiển thị kết quả voucher sau khi đổi */}
      {voucher && (
        <View style={styles.voucherContainer}>
          <Text style={styles.voucherTitle}>Thông tin Voucher</Text>
          <Text style={styles.voucherInfo}>Mã: {voucher.code}</Text>
          <Text style={styles.voucherInfo}>Giảm giá: {voucher.discount}%</Text>
          <Text style={styles.voucherInfo}>
            Ngày hết hạn: {new Date(voucher.expiryDate).toLocaleDateString()}
          </Text>
        </View>
      )}

      {/* Danh sách voucher */}
      <View style={styles.listHeader}>
        <MaterialIcons name="list" size={24} color="#4A90E2" />
        <Text style={styles.listTitle}>Danh Sách Voucher Cá Nhân</Text>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#4A90E2" />
      ) : (
        <FlatList
          data={vouchers}
          keyExtractor={(item) => item._id} // Đảm bảo key là duy nhất
          renderItem={({ item }) => (
            <View style={styles.voucherItem}>
              <Text style={styles.voucherCode}>Mã: {item.code}</Text>
              <Text style={styles.voucherInfo}>Giảm giá: {item.discount}%</Text>
              <Text style={styles.voucherInfo}>
                Ngày hết hạn:{" "}
                {new Date(item.expiryDate).toLocaleDateString("vi-VN")}
              </Text>
              <Text style={styles.voucherStatus}>
                Trạng thái: {item.isUsed ? "Đã sử dụng" : "Chưa sử dụng"}
              </Text>
            </View>
          )}
          ListEmptyComponent={
            <Text style={styles.emptyText}>
              Bạn chưa có voucher cá nhân nào.
            </Text>
          }
        />
      )}
    </View>
  );
};

export default SettingCar;

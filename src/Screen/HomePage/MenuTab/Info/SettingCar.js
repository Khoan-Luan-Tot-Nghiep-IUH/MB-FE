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
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import styles from "../../../../theme/HomePage/MenutabStyle/Info/SettingCarStyle";
import { updateUserInfo } from "../../../../Redux/User/userSlice";
const SettingCar = () => {
  const [points, setPoints] = useState(""); // Điểm người dùng nhập
  const [voucher, setVoucher] = useState(null); // Voucher sau khi đổi
  const [vouchers, setVouchers] = useState([]); // Danh sách voucher của user
  const [loading, setLoading] = useState(false); // Trạng thái tải dữ liệu
  const token = useSelector((state) => state.user.userInfo?.token); // Lấy token từ Redux
  const userInfo = useSelector((state) => state.user?.userInfo); // Lấy userId từ Redux
  const dispatch = useDispatch();
  // console.log("userInfo", userInfo);
  const navigation = useNavigation();
  // Hàm đổi điểm thành voucher
  const redeemPointsForVoucher = async () => {
    if (parseInt(points) <= 0 || isNaN(parseInt(points))) {
      Alert.alert("Lỗi", "Vui lòng nhập số điểm hợp lệ.");
      return;
    }
    try {
      const response = await axios.post(
        `${config.BASE_URL}/vouchers/redeem`,
        { points },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.data?.voucher) {
        throw new Error("Không thể đổi điểm thành voucher.");
      }

      const { voucher } = response.data;
      setVoucher(voucher); // Lưu voucher vào state
      Alert.alert(
        "Thành công",
        `Bạn đã đổi thành công. Mã voucher: ${voucher.code}`
      );

      const updatedUserInfo = {
        ...userInfo,
        loyaltyPoints: userInfo.loyaltyPoints - parseInt(points),
      };
      dispatch(updateUserInfo(updatedUserInfo)); // Dispatch action để cập nhật điểm

      setPoints(""); // Reset điểm
      setVoucher(null); // Reset voucher
      fetchUserVouchers(); // Làm mới danh sách voucher
    } catch (error) {
      Alert.alert(
        "Lỗi",
        error.response?.data?.message ||
          error.message ||
          "Không thể đổi điểm thành voucher."
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
      console.log("đây là dữ liệu của danh sách voucher", response.data);
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
        placeholder="Nhập số điểm muốn quy đổi: 100đ = 10%"
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
              <Text style={styles.voucherInfo}>Số lượng: {item.quantity}</Text>
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

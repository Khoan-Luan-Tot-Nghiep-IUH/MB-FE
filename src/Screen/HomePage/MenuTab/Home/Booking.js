import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Image,
  FlatList,
  Modal,
} from "react-native";
import axios from "axios";
import { useSelector } from "react-redux";
import QRCode from "react-native-qrcode-svg";
import * as MediaLibrary from "expo-media-library";
import * as FileSystem from "expo-file-system";
import Icon from "react-native-vector-icons/FontAwesome";
import config from "../../../../../config";
import styles from "../../../../theme/HomePage/MenutabStyle/Home/BookingStyle";
import { SafeAreaView } from "react-native-safe-area-context";

const Booking = ({ route, navigation }) => {
  const { tripId, bookingId, totalPrice } = route.params;
  const [paymentMethod, setPaymentMethod] = useState("OnBoard");
  const [loading, setLoading] = useState(false);
  const [qrCodeData, setQrCodeData] = useState(null);
  const [vouchers, setVouchers] = useState([]);
  const token = useSelector((state) => state.user?.userInfo?.token);
  const [isVoucherModalVisible, setIsVoucherModalVisible] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null); // Timeout reference
  const [timeLeft, setTimeLeft] = useState(600); // Time left in seconds (600s = 10 minutes)
  const [selectedVoucher, setSelectedVoucher] = useState(null); // State lưu phiếu giảm giá đã chọn
  const [finalPrice, setFinalPrice] = useState(totalPrice);
  const qrCodeRef = useRef(null); // UseRef for the QR code reference
  const [isVoucherAndTimeVisible, setIsVoucherAndTimeVisible] = useState(true); // Điều khiển việc hiển thị phiếu giảm giá và thời gian còn lại
  const [isBookingComplete, setIsBookingComplete] = useState(false); // To track if booking is confirmed

  useEffect(() => {
    if (selectedVoucher) {
      const discountAmount = (totalPrice * selectedVoucher.discount) / 100;
      const newPrice = totalPrice - discountAmount;
      setFinalPrice(newPrice);
    } else {
      setFinalPrice(totalPrice); // Nếu không có voucher, sử dụng giá gốc
    }
  }, [selectedVoucher, totalPrice]);
  // Cập nhật thời gian còn lại mỗi giây
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          Alert.alert(
            "Timeout",
            "You have been idle for too long. Returning to the home page."
          );
          navigation.navigate("Main"); // Điều hướng về trang chủ sau khi hết 10 phút
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000); // Cập nhật mỗi giây

    // Lưu timeout ID để có thể hủy sau khi booking xong
    setTimeoutId(timer);

    // Dọn dẹp timer khi component unmount hoặc booking hoàn tất
    return () => clearInterval(timer);
  }, [navigation]);
  const handleClearVoucher = () => {
    setSelectedVoucher(null); // Đặt lại selectedVoucher về null
  };
  const handleBooking = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${config.BASE_URL}/bookings`,
        {
          bookingId: bookingId,
          paymentMethod,
          voucherCode: selectedVoucher ? selectedVoucher.code : "",
          totalPrice: finalPrice,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { data } = response.data;
      Alert.alert("Success", "Booking confirmed!");

      if (paymentMethod === "Online") {
        setQrCodeData(data.qrCode);
        // Ẩn phần phiếu giảm giá và thời gian còn lại khi QR code được tạo
        setIsVoucherAndTimeVisible(false);
      } else {
        navigation.navigate("Main", { bookingId: data.bookingId });
      }

      setIsBookingComplete(true); // Đánh dấu booking đã hoàn tất và hiển thị QR code
      clearInterval(timeoutId);
    } catch (error) {
      Alert.alert("Error", error.response?.data?.message || "Booking failed.");
    } finally {
      setLoading(false);
    }
  };

  // Hàm định dạng thời gian (giây) thành định dạng mm:ss
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  // Lưu mã QR vào thư viện
  const handleDownloadQRCode = async () => {
    if (!qrCodeRef.current) {
      Alert.alert("Lỗi", "Không tìm thấy mã QR để tải.");
      return;
    }
    // Yêu cầu quyền truy cập thư viện ảnh
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Lỗi", "Cần cấp quyền truy cập vào thư viện ảnh.");
      return;
    }
    // Chuyển mã QR thành dữ liệu base64
    qrCodeRef.current.toDataURL(async (data) => {
      const uri = `${FileSystem.cacheDirectory}qr_code.png`;

      // Ghi dữ liệu base64 thành tệp hình ảnh PNG
      await FileSystem.writeAsStringAsync(uri, data, {
        encoding: FileSystem.EncodingType.Base64,
      });
      // Lưu hình ảnh vào thư viện ảnh
      const asset = await MediaLibrary.createAssetAsync(uri);
      // Tạo album nếu chưa có hoặc thêm hình vào album đã có
      await MediaLibrary.createAlbumAsync("QR Codes", asset, false);
      Alert.alert("Lưu mã QR", "Mã QR đã được lưu vào thư viện ảnh.");
    });
  };
  const fetchUserVouchers = async () => {
    setLoading(true);
    try {
      // Gửi yêu cầu GET tới API
      const response = await axios.get(
        `${config.BASE_URL}/vouchers/user-vouchers`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Gửi token xác thực
          },
        }
      );
      // Kiểm tra dữ liệu trả về từ API
      console.log("Dữ liệu voucher nhận được:", response.data);
      if (response.data && response.data.length > 0) {
        setVouchers(response.data);
      } else {
        Alert.alert("Thông báo", "Không có voucher nào.");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Không thể lấy danh sách voucher.";
      console.log("Lỗi API:", errorMessage);
      Alert.alert("Lỗi", errorMessage);
    } finally {
      setLoading(false);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainerBooking}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-left" size={20} color="#fff" />
          <Text style={styles.backButtonText}>Quay lại</Text>
        </TouchableOpacity>

        <Text style={styles.header}>Xác Nhận Thanh Toán</Text>
      </View>
      {/* Chỉ hiển thị "Áp Phiếu giảm giá" khi booking chưa hoàn tất */}
      {!isBookingComplete && (
        <TouchableOpacity
          style={styles.voucherButton}
          onPress={() => {
            fetchUserVouchers();
            setIsVoucherModalVisible(true);
          }}
        >
          <Text style={styles.voucherButtonText}>Áp Phiếu giảm giá</Text>
        </TouchableOpacity>
      )}

      <View style={styles.header1}>
        <View style={styles.paymentMethodContainer}>
          <Text style={styles.paymentMethodLabel}>
            Chọn Phương Thức Thanh Toán:
          </Text>
          <TouchableOpacity
            style={[
              styles.paymentOption,
              paymentMethod === "OnBoard" ? styles.selectedOption : {},
            ]}
            onPress={() => setPaymentMethod("OnBoard")}
          >
            <Icon name="money" size={20} color="#333" style={styles.icon} />
            <Text style={styles.paymentOptionText}>Thanh Toán Khi Lên Xe</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.paymentOption,
              paymentMethod === "Online" ? styles.selectedOption : {},
            ]}
            onPress={() => setPaymentMethod("Online")}
          >
            <Icon
              name="credit-card"
              size={20}
              color="#333"
              style={styles.icon}
            />
            <Text style={styles.paymentOptionText}>Thanh Toán Online</Text>
          </TouchableOpacity>
        </View>

        {qrCodeData && paymentMethod === "Online" && (
          <View style={styles.qrCodeContainer}>
            <QRCode
              value={qrCodeData}
              size={200}
              getRef={(c) => (qrCodeRef.current = c)}
            />
            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleDownloadQRCode}
            >
              <Text style={styles.saveButtonText}>Save QR Code</Text>
            </TouchableOpacity>
          </View>
        )}

        <Modal
          animationType="slide"
          transparent={true}
          visible={isVoucherModalVisible}
          onRequestClose={() => setIsVoucherModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalHeader}>Chọn Phiếu Giảm Giá</Text>
              {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
              ) : (
                <FlatList
                  data={vouchers}
                  keyExtractor={(item) => item.code}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={styles.voucherItem}
                      onPress={() => {
                        setSelectedVoucher(item);
                        setIsVoucherModalVisible(false);
                      }}
                    >
                      <Text style={styles.voucherCode}>
                        Mã phiếu: {item.code}
                      </Text>
                      <Text style={styles.voucherDiscount}>
                        Giảm giá: {item.discount}%
                      </Text>
                      <Text style={styles.voucherDiscount}>
                        Số lượng: {item.quantity}
                      </Text>
                    </TouchableOpacity>
                  )}
                />
              )}
              <TouchableOpacity
                style={styles.closeModalButton}
                onPress={() => setIsVoucherModalVisible(false)}
              >
                <Text style={styles.closeModalButtonText}>Đóng</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Hiển thị phần "Bỏ chọn phiếu giảm giá" chỉ khi chưa hoàn tất booking */}
        {!isBookingComplete && (
          <View style={styles.voucherContainer}>
            {selectedVoucher ? (
              <View style={styles.voucherInfo}>
                <Text>Voucher: {selectedVoucher.name}</Text>
                <Text>Giảm giá: {selectedVoucher.discount}%</Text>
                <TouchableOpacity
                  onPress={handleClearVoucher} // Khi bấm vào "Bỏ chọn"
                  style={styles.clearVoucherButton}
                >
                  <Text style={styles.clearVoucherText}>
                    Bỏ chọn phiếu giảm giá
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <Text>Chưa chọn phiếu giảm giá</Text>
            )}
          </View>
        )}
        <Text style={styles.priceText}>
          Tổng tiền:{" "}
          {new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(finalPrice)}
        </Text>
        {!isBookingComplete && (
          <View style={styles.countdownContainer}>
            <Text style={styles.countdownText}>
              Thời gian còn lại: {formatTime(timeLeft)}
            </Text>
          </View>
        )}
        <TouchableOpacity
          style={styles.confirmButton}
          onPress={handleBooking}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <View style={styles.confirmButtonContent}>
              <Icon name="check-circle" size={18} color="#fff" />
              <Text style={styles.confirmButtonText}>Xác Nhận Mua Vé</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
export default Booking;

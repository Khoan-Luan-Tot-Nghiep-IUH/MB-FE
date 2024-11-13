import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Image,
} from "react-native";
import axios from "axios";
import { useSelector } from "react-redux";
import QRCode from "react-native-qrcode-svg";
import * as MediaLibrary from "expo-media-library";
import * as FileSystem from "expo-file-system";
import Icon from "react-native-vector-icons/FontAwesome";
import config from "../../../../../config";
import styles from "../../../../theme/HomePage/MenutabStyle/Home/BookingStyle";
import payment from "../../../../../assets/payment.jpg";

const Booking = ({ route, navigation }) => {
  const { tripId, bookingId } = route.params;
  const [paymentMethod, setPaymentMethod] = useState("OnBoard");
  const [loading, setLoading] = useState(false);
  const [qrCodeData, setQrCodeData] = useState(null);
  const user = useSelector((state) => state.user.userInfo);
  const token = useSelector((state) => state.user.userInfo.token);

  const handleBooking = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${config.BASE_URL}/bookings`,
        {
          bookingId: bookingId,
          paymentMethod,
          voucherCode: "",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Đảm bảo token người dùng được truyền đúng.
          },
        }
      );

      const { data } = response.data;

      // Xử lý thành công
      Alert.alert("Success", "Booking confirmed!");
      if (paymentMethod === "Online") {
        setQrCodeData(data.qrCode);
      } else {
        navigation.navigate("Main", { bookingId: data.bookingId });
      }
    } catch (error) {
      // Xử lý lỗi
      Alert.alert("Error", error.response?.data?.message || "Booking failed.");
    } finally {
      setLoading(false);
    }
  };

  const saveQrCode = async () => {
    const uri = `${FileSystem.cacheDirectory}qr_code.png`;
    qrCodeRef.toDataURL(async (data) => {
      await FileSystem.writeAsStringAsync(uri, data, {
        encoding: FileSystem.EncodingType.Base64,
      });
      const asset = await MediaLibrary.createAssetAsync(uri);
      await MediaLibrary.createAlbumAsync("QR Codes", asset, false);
      Alert.alert("QR Code Saved", "QR code has been saved to your gallery.");
    });
  };
  const navigate = () => {
    navigation.navigate("Main");
  };
  return (
    <View style={styles.container}>
      <View style={styles.angiang}></View>
      <View style={styles.headerContainerBooking}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-left" size={20} color="#333" />
          <Text style={styles.backButtonText}>Quay lại</Text>
        </TouchableOpacity>

        <Text style={styles.header}>Booking Confirmation</Text>
      </View>
      <View style={styles.header1}>
        {/* Placeholder Image */}
        <Image source={payment} style={styles.imagePlaceholder} />

        <View style={styles.paymentMethodContainer}>
          <Text style={styles.paymentMethodLabel}>Select Payment Method:</Text>
          <TouchableOpacity
            style={[
              styles.paymentOption,
              paymentMethod === "OnBoard" ? styles.selectedOption : {},
            ]}
            onPress={() => setPaymentMethod("OnBoard")}
          >
            <Icon name="money" size={20} color="#333" style={styles.icon} />
            <Text style={styles.paymentOptionText}>OnBoard</Text>
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
            <Text style={styles.paymentOptionText}>Online</Text>
          </TouchableOpacity>
        </View>

        {qrCodeData && paymentMethod === "Online" && (
          <View style={styles.qrCodeContainer}>
            <QRCode
              value={qrCodeData}
              size={200}
              getRef={(c) => (qrCodeRef = c)}
            />
            <TouchableOpacity style={styles.saveButton} onPress={saveQrCode}>
              <Text style={styles.saveButtonText}>Save QR Code</Text>
            </TouchableOpacity>
          </View>
        )}

        <TouchableOpacity
          style={styles.confirmButton}
          onPress={handleBooking}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#ffffff" />
          ) : (
            <View style={styles.confirmButtonContent}>
              <Icon name="check-circle" size={18} color="#fff" />
              <Text style={styles.confirmButtonText} onPress={navigate}>
                Confirm Booking
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Booking;

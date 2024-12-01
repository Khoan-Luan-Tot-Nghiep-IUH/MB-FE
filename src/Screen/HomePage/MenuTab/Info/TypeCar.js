import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons"; // Import icon
import axios from "axios";
import config from "../../../../../config";
import styles from "../../../../theme/HomePage/MenutabStyle/Info/TypecardStyle";
const TypeCar = ({ navigation }) => {
  const [busTypes, setBusTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBusTypes = async () => {
      try {
        const response = await axios.get(
          `${config.BASE_URL}/bus-types/get-all`
        );
        setBusTypes(response.data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBusTypes();
  }, []);
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#3498db" />
        <Text style={styles.loadingText}>Đang tải dữ liệu...</Text>
      </View>
    );
  }
  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Lỗi: {error}</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <View style={{ marginBottom: 30 }}></View>
      {/* Header với nút Back */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Loại Xe</Text>
      </View>

      {/* Danh sách các loại xe */}
      <FlatList
        data={busTypes}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image
              source={{
                uri: item.images?.[0] || "https://via.placeholder.com/150",
              }}
              style={styles.image}
            />
            <View style={styles.infoContainer}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.description}>
                📋 {item.description || "Không có mô tả"}
              </Text>
              <Text style={styles.detailText}>🪑 Số ghế: {item.seats}</Text>
              <Text style={styles.detailText}>
                🛗 Số tầng: {item.floorCount || "1"}
              </Text>
              <Text style={styles.company}>
                🏢 Công ty: {item.companyName || "Chưa rõ"}
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default TypeCar;

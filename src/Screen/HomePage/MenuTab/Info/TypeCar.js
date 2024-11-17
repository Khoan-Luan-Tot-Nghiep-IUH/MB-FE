import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import config from "../../../../../config";

const TypeCar = () => {
  const [busTypes, setBusTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBusTypes = async () => {
      try {
        const response = await axios.get(
          `${config.BASE_URL}/bus-types/get-all`
        );
        console.log(response.data.data);
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
      <View style={{ marginBottom: 10 }}></View>
      <FlatList
        data={busTypes}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            {item.images && item.images.length > 0 && (
              <Image source={{ uri: item.images[0] }} style={styles.image} />
            )}
            <View style={styles.infoContainer}>
              <Text style={styles.name}>🚍 {item.name}</Text>
              <Text style={styles.description}>
                📋 Mô tả: {item.description}
              </Text>
              <Text style={styles.seats}>🪑 Số ghế: {item.seats}</Text>
              <Text style={styles.floorCount}>
                🛗 Số tầng: {item.floorCount}
              </Text>
              <Text style={styles.companyId}>
                🏢 Công ty: {item.companies?.name || "Chưa rõ"}
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default TypeCar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#3498db",
    fontWeight: "500",
  },
  errorText: {
    fontSize: 16,
    color: "#e74c3c",
    fontWeight: "500",
  },
  card: {
    backgroundColor: "#ffffff",
    marginBottom: 16,
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  image: {
    width: "100%",
    height: 180,
    resizeMode: "cover",
  },
  infoContainer: {
    padding: 16,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 6,
  },
  description: {
    fontSize: 16,
    fontWeight: "400",
    color: "#7f8c8d",
    marginBottom: 6,
  },
  seats: {
    fontSize: 16,
    color: "#7f8c8d",
    marginBottom: 6,
  },
  floorCount: {
    fontSize: 16,
    fontWeight: "400",
    color: "#34495e",
    marginBottom: 6,
  },
  companyId: {
    fontSize: 16,
    fontWeight: "500",
    color: "#8e44ad",
  },
});

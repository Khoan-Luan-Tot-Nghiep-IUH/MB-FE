import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#3498db", // Màu header
    paddingVertical: 12,
    paddingHorizontal: 16,
    elevation: 4, // Hiệu ứng đổ bóng
  },
  backButton: {
    padding: 8, // Tăng vùng nhấn
    marginRight: 12, // Khoảng cách giữa nút và tiêu đề
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
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
    flexDirection: "row",
    backgroundColor: "#ffffff",
    marginBottom: 16,
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
    padding: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 12,
  },
  infoContainer: {
    flex: 1,
    justifyContent: "center",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 6,
  },
  description: {
    fontSize: 14,
    color: "#7f8c8d",
    marginBottom: 4,
  },
  detailText: {
    fontSize: 14,
    color: "#34495e",
    marginBottom: 4,
  },
  company: {
    fontSize: 14,
    fontWeight: "500",
    color: "#8e44ad",
  },
});
export default styles;

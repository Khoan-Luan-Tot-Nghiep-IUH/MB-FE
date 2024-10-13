import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#4CAF50", // Màu nền cho tiêu đề
    paddingHorizontal: 16, // Padding ngang
    paddingVertical: 16, // Padding dọc
    width: "100%", // Đảm bảo headerContainer chiếm toàn bộ chiều rộng
  },
  backButton: {
    marginRight: 16, // Khoảng cách giữa biểu tượng và tiêu đề
  },
  titleContainer: {
    flex: 1, // Để tiêu đề chiếm không gian còn lại
    alignItems: "center", // Căn giữa các thành phần bên trong
  },
  header: {
    fontSize: 20,
    color: "#ffffff", // Màu chữ tiêu đề
    fontWeight: "bold", // Đậm chữ tiêu đề
  },
  date: {
    fontSize: 16,
    color: "#ffffff", // Màu chữ ngày
    marginTop: 4, // Khoảng cách giữa tiêu đề và ngày
  },
  row: {
    padding: 15,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  seat: {
    width: 50,
    height: 50,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
  },
  size: {
    marginBottom: 27,
  },
  sold: {
    backgroundColor: "#dc3545", // Màu đỏ cho ghế đã bán
  },
  available: {
    backgroundColor: "#28a745", // Màu xanh lá cho ghế còn trống
  },
  selected: {
    backgroundColor: "#ffa500", // Màu vàng cam cho ghế đang chọn
  },
  seatText: {
    color: "#ffffff",
    fontWeight: "bold",
  },
  footer: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  status: {
    fontSize: 16,
  },
  buttonFooter: {
    paddingLeft: 20,
  },
  button: {
    backgroundColor: "#ff6347",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 10,
    width: 350,
  },
  buttonText: {
    color: "#ffffff",
    textAlign: "center",
    fontSize: 18,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    fontSize: 18,
  },
  selectedSeatsContainer: {
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    marginTop: 20,
  },
  selectedSeatsHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  selectedSeatItem: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#ffffff",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
});

export default styles;

import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f9",
    padding: 0,
  },
  header: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    backgroundColor: "#f4f4f9", // Màu nền xám nhẹ
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 20,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4, // Cho Android
  },
  angiang: {
    marginBottom: 27,
  },
  header1: {
    padding: 10,
  },
  imagePlaceholder: {
    width: "100%",
    height: 150,
    marginBottom: 20,
    borderRadius: 8,
    resizeMode: "cover",
  },
  paymentMethodContainer: {
    marginTop: 20,
  },
  paymentMethodLabel: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
    textAlign: "center",
  },
  paymentOption: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: "#ccc",
  },
  selectedOption: {
    borderColor: "#ff6347",
    backgroundColor: "#ffefd5",
  },
  paymentOptionText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginLeft: 10,
  },
  icon: {
    marginRight: 10,
  },
  confirmButton: {
    backgroundColor: "#ff6347",
    paddingVertical: 15,
    borderRadius: 8,
    marginTop: 20,
    alignItems: "center",
  },
  confirmButtonContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  confirmButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginLeft: 8,
  },
  qrCodeContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  saveButton: {
    marginTop: 10,
    backgroundColor: "#28a745",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  backButton: {
    flexDirection: "row",
  },
  backButtonText: {
    marginLeft: 5,
    color: "#fff",
    fontSize: 16,
  },
  headerContainerBooking: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    backgroundColor: "#22ba3b",
  },
  countdownContainer: {
    backgroundColor: "#fff", // Nền trắng để tạo sự tương phản
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 12, // Bo góc mượt mà hơn
    borderWidth: 1,
    borderColor: "#ddd", // Để tạo đường viền nhẹ nhàng
    marginVertical: 20,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 3, // Tạo bóng đổ nhẹ cho cả Android và iOS
  },
  countdownText: {
    fontSize: 30, // Kích thước lớn để dễ nhìn
    fontWeight: "bold", // Chữ đậm để nổi bật
    color: "#ff5733", // Màu đỏ cam nổi bật, dễ thấy
    textAlign: "center", // Căn giữa để chữ đẹp hơn
  },
});

export default styles;

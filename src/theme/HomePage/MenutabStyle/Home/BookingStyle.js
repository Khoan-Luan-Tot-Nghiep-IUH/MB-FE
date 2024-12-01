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
    backgroundColor: "#008080",
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
  selectedVoucher: {
    backgroundColor: "#FFEFDB", // Màu nền cho voucher đã chọn
    borderColor: "#FF6347", // Đổi màu viền khi chọn
  },

  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
  },
  modalContent: {
    width: "90%", // Width of the modal
    maxHeight: "80%", // Max height for responsiveness
    backgroundColor: "#fff", // White background for the modal content
    borderRadius: 12, // Rounded corners for the modal
    padding: 20, // Padding inside the modal
    shadowColor: "#000", // Shadow color
    shadowOpacity: 0.25, // Shadow opacity
    shadowRadius: 8, // Shadow blur radius
    elevation: 5, // Elevation for Android
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333", // Dark text color for the header
    marginBottom: 15,
    textAlign: "center", // Centered text
  },
  voucherItem: {
    backgroundColor: "#f9f9f9", // Light gray background for each item
    borderRadius: 8, // Rounded corners for each item
    padding: 15, // Padding inside each item
    marginVertical: 8, // Vertical margin between items
    borderWidth: 1, // Light border around the item
    borderColor: "#ddd", // Light gray border color
    shadowColor: "#000", // Shadow color for each item
    shadowOpacity: 0.1, // Shadow opacity
    shadowRadius: 4, // Shadow blur radius
    elevation: 3, // Elevation for Android
  },
  voucherCode: {
    fontSize: 16,
    fontWeight: "600",
    color: "#007BFF", // Blue color for voucher code
    marginBottom: 5, // Space between code and discount
  },
  voucherDiscount: {
    fontSize: 14,
    color: "#333", // Dark text for discount info
    marginBottom: 5, // Space between discount and next item
  },
  closeModalButton: {
    backgroundColor: "#FF6347", // Tomato red color
    paddingVertical: 12,
    borderRadius: 8, // Rounded button
    marginTop: 15, // Margin from the list
    alignItems: "center", // Center the text inside the button
  },
  closeModalButtonText: {
    color: "#fff", // White text color for the close button
    fontSize: 16,
    fontWeight: "bold", // Bold text for emphasis
  },
  confirmButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },

  // Close button for modal
  closeModalButton: {
    marginTop: 20,
    paddingVertical: 12,
    backgroundColor: "#FF6347", // Tomato color for the button
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  // Close button text styling
  closeModalText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  voucherButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: "#888", // Blue background to stand out
    borderRadius: 25, // Rounded corners for a sleek look
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10, // Space around the button
    elevation: 5, // Shadow for Android to give it depth
    shadowColor: "#000", // Shadow for iOS
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  voucherButtonText: {
    color: "#fff", // White text for contrast
    fontSize: 16,
    fontWeight: "bold", // Bold for emphasis
    textTransform: "uppercase", // Uppercase for the button text to look neat
  },
  voucherContainer: {
    padding: 15,
    marginBottom: 20,
    backgroundColor: "#f9f9f9", // Màu nền nhạt cho container
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd", // Viền mỏng màu xám
  },
  voucherInfo: {
    flexDirection: "column", // Xếp các phần tử theo cột
    alignItems: "flex-start", // Căn chỉnh văn bản về phía bên trái
  },
  clearVoucherButton: {
    marginTop: 10,
    paddingVertical: 8,
    paddingHorizontal: 20,
    backgroundColor: "#FF6347", // Màu nền đỏ tươi cho nút bỏ chọn
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#FF6347", // Viền cùng màu với nền
  },
  clearVoucherText: {
    color: "#fff", // Màu chữ trắng
    fontWeight: "bold", // Chữ đậm
    textAlign: "center", // Căn giữa chữ
  },
  voucherText: {
    fontSize: 16,
    color: "#333", // Màu chữ tối cho thông tin voucher
    marginBottom: 5, // Khoảng cách giữa các phần tử
  },
  emptyVoucherText: {
    fontSize: 16,
    color: "#888", // Màu chữ xám khi không có voucher
    textAlign: "center", // Căn giữa chữ
  },
  priceText: {
    fontSize: 18, // Kích thước font chữ
    fontWeight: "bold", // Đậm
    color: "#d9534f", // Màu chữ đỏ
    textAlign: "center", // Canh giữa
    marginVertical: 10, // Khoảng cách trên và dưới
    paddingHorizontal: 15, // Khoảng cách bên trái và phải
  },
});

export default styles;

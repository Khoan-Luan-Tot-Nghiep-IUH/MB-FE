import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2D2A37", // Dark background
  },
  scrollView: {
    flexGrow: 1,
  },
  header: {
    flexDirection: "row", // Bố cục ngang
    alignItems: "center", // Căn giữa theo trục dọc
    justifyContent: "space-between", // Khoảng cách giữa thông tin và icon
    backgroundColor: "#FF9000", // Màu nền cam
    paddingHorizontal: 16, // Padding hai bên
    paddingVertical: 12, // Padding trên dưới
    elevation: 4, // Hiệu ứng bóng
    paddingLeft: 25, // Khoảng cách với biên trái
  },
  userInfo: {
    flex: 1, // Chiếm toàn bộ không gian còn lại
    marginRight: 16, // Khoảng cách với icon
  },
  loginText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
  subText: {
    color: "#FFF",
    fontSize: 14,
    textAlign: "center",
  },
  profileIconContainer: {
    paddingTop: 10, // Padding cho icon
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.2)", // Nền trong suốt
    borderRadius: 50, // Bo tròn
    width: 50, // Kích thước cố định
    height: 50, // Kích thước cố định
  },
  profileIcon: {
    width: 65,
    height: 65,
    backgroundColor: "#6C6767",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  userInfoContainer: {
    padding: 10, // Add more padding for a spacious look
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,

    width: "90%", // Limit the width for better centering and spacing
  },
  welcomeText: {
    fontSize: 16, // Kích thước chữ lớn hơn
    fontWeight: "bold",
    color: "#FFF",
  },
  subTextInfo: {
    fontSize: 14,
    color: "#FFF",
    marginTop: 4, // Khoảng cách với welcomeText
  },
  logoutButton: {
    marginTop: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: "#FFF",
    borderRadius: 8, // Bo góc
    alignItems: "center",
    alignSelf: "flex-start", // Căn nút về bên trái
  },
  logoutText: {
    fontSize: 14,
    color: "#FF9000",
    fontWeight: "bold",
  },
  menuContainer: {
    padding: 20,
    alignItems: "center", // Center align the menu items for balance
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#3D384A",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    width: "100%", // Ensure items span full width
  },
  icon: {
    marginRight: 15,
  },
  menuText: {
    color: "#FFF",
    fontSize: 16,
  },
  footerText: {
    textAlign: "center",
    color: "#FFF",
    paddingVertical: 20,
    fontSize: 12,
  },
  // Thêm style mới cho container khi người dùng đăng nhập
  userLoginContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#343a40",
  },
  modalInput: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#d1d1d1",
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  updateButton: {
    backgroundColor: "#FF9000",
    padding: 10,
    borderRadius: 5,
    width: "45%",
    alignItems: "center",
  },
  updateButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  closeButton: {
    backgroundColor: "#d1d1d1",
    padding: 10,
    borderRadius: 5,
    width: "45%",
    alignItems: "center",
  },
  closeButtonText: {
    color: "#343a40",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default styles;

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
    flexDirection: "row", // Adjust header to row layout
    padding: 20, // Adjust padding to give more space around content
    backgroundColor: "#FF9000", // Orange header
    alignItems: "center",
    justifyContent: "space-around",
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
    paddingTop: 13,
  },
  profileIcon: {
    width: 65,
    height: 65,
    backgroundColor: "#6C6767",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  userInfoContainer: {
    padding: 20, // Add more padding for a spacious look
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,

    width: "90%", // Limit the width for better centering and spacing
  },
  welcomeText: {
    fontSize: 12, // Increase the font size slightly for emphasis
    fontWeight: "bold",
    color: "#fff",
  },
  subTextInfo: {
    fontSize: 12,
    color: "#fff",
    marginVertical: 5, // Add consistent spacing between the text
  },
  logoutButton: {
    marginTop: 15,
    paddingVertical: 5,
    backgroundColor: "#fff",
    borderRadius: 5,
    alignItems: "center",
    width: "60%", // Adjust button width for better proportion
  },
  logoutText: {
    fontSize: 16,
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
    justifyContent: "space-around",
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

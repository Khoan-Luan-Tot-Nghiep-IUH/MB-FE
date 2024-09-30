import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2D2A37", // Dark background
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 30,
    backgroundColor: "#FF9000", // Orange header
    alignItems: "center",
  },
  loginText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  subText: {
    color: "#FFF",
    fontSize: 14,
  },
  profileIcon: {
    width: 40,
    height: 40,
    backgroundColor: "#6C6767",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  menuContainer: {
    padding: 20,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#3D384A",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
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
});

export default styles;

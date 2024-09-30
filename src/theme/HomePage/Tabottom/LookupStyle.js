import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1C1B2E", // Màu nền tối
  },
  header: {
    backgroundColor: "#FF9000", // Màu cam cho header
    padding: 16,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    paddingTop: 15,
  },
  menuContainer: {
    marginTop: 16,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2D2C3E",
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginVertical: 8,
    margin:20,
  },
  icon: {
    marginRight: 16,
  },
  menuText: {
    fontSize: 16,
    color: "white",
  },
});

export default styles;

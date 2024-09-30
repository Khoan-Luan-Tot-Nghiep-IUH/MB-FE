import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1C1C2E",
    padding: 20,
  },
  view: {
    backgroundColor: "#1C1C2E",
    padding: 20,
    minHeight: 800,
    opacity: 0.9,
  },
  headerContainer: {
    padding: 20,
    resizeMode: "cover",
  },
  greeting: {
    fontSize: 24,
    color: "#FFFFFF",
    marginBottom: 10,
  },
  subGreeting: {
    fontSize: 16,
    color: "#FFFFFF",
    marginBottom: 20,
  },
  inputContainer: {
    marginVertical: 20,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#FFFFFF", // Nền của ô nhập
  },
  input: {
    flex: 1,
    height: 50, // Chiều cao của ô nhập
    paddingHorizontal: 15,
    color: "#000", // Màu chữ trong ô nhập
  },
  icon: {
    marginLeft: 10, // Khoảng cách giữa icon và ô nhập
  },
  button: {
    backgroundColor: "#FF6F20",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  newsContainer: {
    marginTop: 20,
  },
  newsTitle: {
    color: "#FFFFFF",
    fontSize: 20,
    marginBottom: 10,
  },
  newsItem: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  newsImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 10,
  },
  newsText: {
    color: "#000",
    fontSize: 16,
  },
});

export default styles;

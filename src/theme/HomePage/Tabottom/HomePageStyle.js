import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1C1C2E",
    padding: 20,
  },
  header: {
    marginBottom: 27,
  },
  view: {
    backgroundColor: "#1C1C2E",
    padding: 20,
    minHeight: 800,
  },
  headerContainer: {
    padding: 20,
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
    backgroundColor: "#FFFFFF",
  },
  input: {
    flex: 1,
    height: 35,
    paddingHorizontal: 15,
    color: "#000",
    paddingTop:8,
  },
  icon: {
    marginLeft: 10,
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
  //modal
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  modalOption: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  modalOptionText: {
    fontSize: 16,
    textAlign: "center",
  },
  closeButton: {
    marginTop: 15,
    padding: 10,
    backgroundColor: "red",
    borderRadius: 5,
    alignItems: "center",
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default styles;

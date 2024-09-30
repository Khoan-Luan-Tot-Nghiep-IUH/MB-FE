import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1F2230",
  },
  header: {
    backgroundColor: "#FF9000",
    paddingVertical: 15,
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  headerText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  tabsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#FFE0B2",
    paddingVertical: 10,
  },
  tabItem: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  tabText: {
    fontSize: 14,
    color: "#A0A0A0",
  },
  activeTab: {
    backgroundColor: "#FFFFFF",
  },
  activeTabText: {
    color: "#FF9000",
    fontWeight: "bold",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  messageText: {
    marginTop: 15,
    fontSize: 16,
    color: "#FFFFFF",
    textAlign: "center",
  },
});

export default styles;
